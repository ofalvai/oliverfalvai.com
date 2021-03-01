---
layout: post
title:  To improve video call voice quality, forget Bluetooth
date:   2021-02-24 21:30:00 +0100
categories: workflow
description: Zoom fatigue is real, and while we are all trying to get better at calls and buy better hardware, most people miss a huge quality improvement.
---

[Zoom fatigue][zoom] is real, and while we are all trying to get better at calls and buy better hardware, most people miss a huge quality improvement. I'll show you that voice quality's biggest enemy is a technology that most of us use every day: Bluetooth. It only needs a few tweaks to drastically improve sound quality in both directions, yet most people don't know about them.

## Bluetooth profiles

![Bluetooth profiles](profiles.jpg)

Bluetooth devices must implement one or more profiles from the [Bluetooth specification][bt-specs] to be compatible with each other. The specification contains many profiles, but an audio device usually implements two:

- Advanced Audio Distribution Profile (A2DP)
- Hands-Free Profile (HFP) or Handset Profile (HSP)

A2DP is a one-way profile to stream audio from your computer to your headphones. Its audio quality depends on the codec the two devices agree on, but even the [SBC][bt-sbc] codec (which all devices must support) offers pretty good quality. Hands-Free Profile, however, is designed for two-way communication. When this profile is active, your headphones can stream microphone input to the computer while that is sending audio to the headphones. __Unfortunately, sound quality is horrible in both directions using this profile.__ Your voice will sound compressed to the other party, and the quality of what you hear will also be poor, no matter what you listen to (music or human voice).

__It's important to note that only one profile can be active at the same time.__ Modern operating systems are smart enough to switch between the two: A2DP is used by default, switching to HFP only while the microphone is in use. If you are curious about the quality difference between the two Bluetooth profiles, try playing some music while the microphone is used by an app.

## Input sources

__Based on the above, we should avoid using a Bluetooth headset's microphone for calls.__ Fortunately, every computer and mobile device has a built-in microphone, and—while it's usually a cheap one—its voice quality is always better in my experience than a wireless device that activates the Hands-Free Bluetooth profile.

Sometimes you also have extra microphones lying around:

- Desktop webcams usually come with built-in mics
- A pair of cheap wired earbuds with a mic

Most people don't fiddle with input and output audio settings unless there is a problem, but it's worth setting up your devices properly. You should configure the video call app, or the OS itself to use the other mic as an input source, while the output can be your favorite Bluetooth headphones. This way Hands-Free profile never gets activated, you'll hear others the best possible way, and your voice will sound anything from okay to incredible on the other end, depending on your mic quality. (Of course, if everyone else in the call is using Bluetooth microphones, you won't hear any improvement)

I personally use a wired headset with a 3.5mm connector solely for video calls. I came to this conclusion after recording a voice memo with every device I could find at home. It only takes a few minutes to do this comparison, and you can objectively find the best-sounding microphone, once and for all.

![Voice memos](recordings.jpg)

[zoom]: https://news.stanford.edu/2021/02/23/four-causes-zoom-fatigue-solutions/
[bt-specs]: https://en.m.wikipedia.org/wiki/List_of_Bluetooth_profiles
[bt-sbc]: https://en.m.wikipedia.org/wiki/SBC_(codec)
