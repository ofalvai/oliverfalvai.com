---
title: ESPHome IR remote tips and tricks
enableToc: true
date: "2021-04-26 11:00:00 +0200"
tags:
  - blog
  - smarthome
description: Cool tips and tricks about using ESPHome as an IR remote
image: esphome-ir-remote-tips-tricks/ir_states.png
---

[My previous post](How%20to%20make%20infrared%20devices%20smarter%20using%20ESPHome.md) demonstrated how to make IR-controlled devices smart using a microcontroller and the [ESPHome project](https://esphome.io/). Besides the basic setup described there, there is no limit to what you can do with the system once you can control your devices with software. Here are three cool tricks I'm using in my smart home setup that might be useful for others as well.

## Fake device states

The problem with infrared communication is that it is one-way only. Unlike two-way communication protocols (like Zigbee or Z-Wave), there is no way to know the current state of the controlled device. When you reach for the remote to turn on the TV, you see with your own eyes that it is off, so you press the power button on the remote. But you can't create an automation to turn it on by pressing the power button. It would work in some cases, but what happens if the device is already on? Pressing the power button without knowing the current state would turn off the TV.

While it is not a perfect solution, **we can work around this by keeping track of the device state in our smart home system. We assume the real device state has indeed changed by our actions.** Let's create a binary sensor in ESPHome to track the device power and update its state every time we fire the power button action:

````yml
binary_sensor:
  - platform: template
    name: Living Room Speaker Power
    id: ir_template_speaker_power
    device_class: power
````

This is a templated sensor that we will manually update later. In order to do that, we have to define a unique ID. This sensor shows up in Home Assistant like this:

![IR state sensor](notes/images/ir_states.png)

Now that we have a sensor, let's create the automation that updates its state every time we trigger the IR command over MQTT. Thanks to ESPHome's powerful [automation rules](https://esphome.io/guides/automations.html), everything happens on the device without extra delays and errors caused by any network communication:

````yml
mqtt:
  on_message:
    - topic: livingroom/ir_transmitter/preset/speaker
      payload: power
      then:
        - remote_transmitter.transmit_nec:
            address: 0x08E7
            command: 0x807F
        - if:
            condition:
              binary_sensor.is_on: ir_template_speaker_power
            then:
              - binary_sensor.template.publish:
                  id: ir_template_speaker_power
                  state: OFF
            else:
              - binary_sensor.template.publish:
                  id: ir_template_speaker_power
                  state: ON
````

Based on this setup, we can finally create an automation to turn on the device:

* Trigger: some event
* **Condition: if device state is OFF**
* Action: press power

This trick is not perfect, though, because there are two scenarios when our fake state can get out of sync with reality:

1. Someone uses the physical remote to control the device: the real state changes, but our fake state is not updated
1. A transmission error occurs: ESPHome sends the signal and updates the fake state, but the signal doesn't reach the receiver. This occasionally happens when someone blocks the signal by standing in front of the remote.

## Send any command remotely

[In the previous post](How%20to%20make%20infrared%20devices%20smarter%20using%20ESPHome.md), I briefly mentioned that I prefer an abstraction on IR remote actions:

 > 
 > As you can see in the config above, my MQTT topics define logical commands (`volume_up`) instead of protocol-specific data (`address 0, command 16`). I think it’s a good practice to have this abstraction on the device itself and expose only logical commands to the outside world.

For debugging purposes, however, it's useful to have an interface for sending protocol-specific codes. The following automation rule grabs a JSON object from an MQTT topic, extracts the `address` and `command` fields, then calls the transmit action with those values:

````yml
mqtt:
  on_message:
    - topic: livingroom/ir_transmitter/nec
      then:
        - remote_transmitter.transmit_nec:
            address: !lambda |-
              int address = 0;
              if (x.containsKey("address")) {
                address = x["address"];
              }
              ESP_LOGD("mqtt-ir-trigger", "NEC address: %d", address);
              return address;
            command: !lambda |-
              int command = 0;
              if (x.containsKey("command")) {
                command = x["command"];
              }
              ESP_LOGD("mqtt-ir-trigger", "NEC command: %d", command);
              return command;
````

## Action sequences

My TV has an energy-saving feature to turn off the display (while keeping everything else running). This is ideal for music listening because the Spotify player on the TV can be controlled with any other device.

The only problem: it takes four button presses on the remote to activate this power-saving mode. So I created a sequence of actions that sends `GREEN` → `DOWN` → `DOWN` → `OK` to activate this mode from the menu (with a delay between each action):

````yml
mqtt:
  on_message:
    - topic: livingroom/ir_transmitter/preset/tv
      payload: screen_off
      then:
        - remote_transmitter.transmit_rc5:
            address: 0
            command: 108
        - delay: 1s
        - remote_transmitter.transmit_rc5:
            address: 0
            command: 81
        - delay: 1s
        - remote_transmitter.transmit_rc5:
            address: 0
            command: 87
        - delay: 1s
        - remote_transmitter.transmit_rc5:
            address: 0
            command: 87
````
