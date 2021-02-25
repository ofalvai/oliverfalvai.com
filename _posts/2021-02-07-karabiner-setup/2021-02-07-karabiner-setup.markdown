---
layout: post
title:  "My keyboard setup"
date:   2021-02-07 18:46:06 +0100
categories: keyboard karabiner workflow
description: My keyboard customizations, shortcuts and tricks
image: karabiner-setup/keyboard.jpg
---

![Keyboard](keyboard.jpg)
<span>Photo by <a href="https://unsplash.com/@athulca?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Athul Cyriac Ajay</a> on <a href="https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>

## This is not about mechanical keyboards

...although I can only recommend getting one. I started improving my home office setup thanks to COVID and the permanent work from home setup, and my first improvement was getting a nice and comfortable mechanical keyboard. This post is not going to be about mechanical keyboards in general. But after immersing myself in the science of keyboard layouts and [/r/mechanicalkeyboards][reddit-mechanicalkeyboards], I realized people use all sorts of crazy layouts and key remappings to make their keyboard more ergonomic and do more with fewer keystrokes. Many keyboard enthusiasts use tiny keyboards without arrow keys or a number row, thanks to clever key combinations that output a character without a dedicated key. Think of inventing your own Fn key combos, or multiple new modifier keys for different tasks.

While my keyboard of choice—a [Keychron K1][keychron]—does have arrow keys and a number row, I started experimenting with ideas from other people's shortcuts and tricks, and immediately got addicted to a few tweaks. I will list my current config below, but my setup is always evolving as I experiment with new ideas.

## Karabiner

Karabiner is a macOS app that remaps keys on the OS level. Unlike custom keyboards, my Keychron can't be tweaked on the firmware level, so the second-best option is to remap keys on the OS level. I don't mind this at all, because this allows me to apply the same tweaks to both the Keychron and my MacBook's built-in keyboard (I don't use the MacBook docked all the time). If you'd like to use the keyboard with multiple machines, you can set up a git repo to sync Karabiner's config file between devices (like I do with my work and personal MacBook).

Karabiner allows you to set up simple key mappings from the GUI (mapping Caps Lock to ESC, for example), but you need to learn its bare [JSON config format][karabiner-json] to make full use of it. The best way to learn the format in my opinion is to copy rules from others and start tweaking. There are many sample configs over the internet, and I'll post my full config at the end of this post as well.

## My customizations

### Single ⌘ press switches to previous app

This might sound pointless, but don't underestimate the time you can save in a day with this! How often do you press `⌘` + `Tab`? How often do you switch between only the frontmost and the previous app? Switching between two apps becomes a single keypress with this tweak, and I cannot stress enough how much comfort it adds to my workflow. Holding `⌘` as a modifier key while pressing other keys still works as before, so you can `⌘` + `Tab` to switch to every other app and use shortcuts like `⌘` + `T`.

### Caps Lock as an app-specific hotkey

More and more apps start to adopt some kind of command palette or goto anything search field. I hate inconsistent shortcuts between apps. The shortcut for this feature is `⌘` + `K` in Slack, `⌘` + `P` in Notion, `⌘` + `O` in IntelliJ IDEs, `⌘` + `L` in Spotify. I can't keep these in mind (and in muscle memory), so I decided to have a dedicated key for these frequently used shortcuts on my keyboard. This key has become `Caps Lock` for me: I never use its original function anyway, and I can reach this key with my pinky finger easily.

The trick that enables app-dependent shortcuts is that Karabiner can keep track of the frontmost application. This allows assigning different actions to the Caps Lock key depending on the current frontmost app. Here is my current list of what Caps Lock triggers for me in each app:

- VSCode: `⌘ + P` (Go to file)
- IntelliJ IDEs: `⌘ + O` (Go to class)
- Notion: `⌘ + P` (Search anything)
- Slack: `⌘ + K` (Jump to anything)
- Spotify: `⌘ + L` (Focus search bar)
- Firefox: `⌘ + T` (New tab)
- Mail: `⌘ + Ctrl + A` (Archive message)

As you can see, the list has some actions that are not typical command palette shortcuts. While I initially only assigned command palette shortcuts to Caps Lock, later I added other apps and their most commonly used shortcut.

### Arrow keys with Tab + IJKL

If you do text editing or coding on a daily basis, you frequently reach for the arrow keys, then move your hand back to the main letter keys. Like with the previous shortcut, this tiny inconvenience can add up and slow you down. It would be better not moving the right hand at all, so that's what this modification does: While I keep `Tab` pressed, the keys `I`, `J`, `K`, and `L` become arrow keys (you can use `WASD` instead if you prefer that).

This modification took me the longest to master and I still fall back to the regular arrow keys sometimes (when I need to use `⇧`, `⌥`, or `⌘` for navigation and text selection), but this is a nice improvement for heavy text editing and programming.

Bonus trick: Map `Tab` + `O` to `⌫`, and now you have every text editing action within reach.

### Dedicated mute call key

Everyone learned in 2020 that muting yourself by default in a large video call is necessary. Finding the button to unmute yourself with your mouse is not only mentally taxing, but adds unnecessary latency to the communication as well. I came up with the idea to map a rarely used keyboard key to mute/unmute as a global shortcut.

Zoom allows changing its shortcuts in settings, and you can enable each shortcut to work even if the Zoom window is not in focus. To avoid shortcut conflicts, I assigned `Mute` and `Toggle camera` to two keys that don't exist on my keyboard: `F16` and `F17`. Then I created a rule in Karabiner that maps `Insert` to `F16` and `Delete` to `F17`.

## Beyond Karabiner: Goku

The only problem with Karabiner's JSON config file is its verbose nature. After creating a more than few simple rules, the file becomes hundreds or thousands of lines long.

Let me introduce [Goku][goku]: a program that hides this complexity and generates `karabiner.json` from a declarative file format called [EDN][edn]. Here is one of my earlier rule in Karabiner's JSON format:

{% highlight json %}
{
    "description": "left_command alone -> ⌘ + tab to last app",
    "manipulators": [
        {
            "from": {
                "key_code": "left_command"
            },
            "to": [
                {
                    "key_code": "left_command"
                }
            ],
            "to_if_alone": [
                {
                    "key_code": "tab",
                    "modifiers": [
                        "left_command"
                    ]
                }
            ],
            "type": "basic"
        }
    ]
}
{% endhighlight %}

and the same rule with Goku's EDN notation:

{% highlight clojure %}
{:des "left_command alone -> ⌘ + tab to last app"
 :rules [[:left_command :left_command nil {:alone :!Ctab}]]}
{% endhighlight %}

Reading and writing this syntax is absolutely no easy feat, but I encourage spending a few hours with it. After the steep initial learning curve, your config will be much easier to comprehend and edit. The format is not very well documented unfortunately, but whenever I got stuck on the syntax, I use GitHub's search on the project to find examples and mentions in [various][goku-example-1] [text][goku-example-2] [files][goku-example-3].

## My Karabiner config

So here is my Karabiner config in Goku's EDN notation. If you are not ready for Goku yet and only want the JSON config, install Goku and run the `goku` command once. It will generate the `karabiner.json` that you can tweak to your liking. Just make sure to make a backup of your custom JSON file first because Goku will overwrite whatever is in `karabiner.json`.

{% highlight clojure %}
{:devices {:keychron-k1 [{:vendor_id 1452 :product_id 591}]
           :macbook [{:vendor_id 1452 :product_id 632},
                     {:vendor_id 1452 :product_id 638}]}

 :applications {:slack ["com.tinyspeck.slackmacgap"]
                :vscode ["com.microsoft.VSCode"]
                :notion ["notion.id"]
                :spotify ["com.spotify.client"]
                :intellij ["com.google.android.studio", "^com\\.jetbrains\\..*$"]
                :firefox ["org.mozilla.firefox"]
                :chrome ["com.google.Chrome"]
                :mail ["com.apple.mail"]}
 :templates {}

 :layers {:tab-mode {:key :tab}}

 :simlayers {:space-mode {:key :spacebar}}
 :simlayer-threshold 250

 :main [{:des "Tab mode arrow keys"
         :rules [:tab-mode
                 [:##i :up_arrow]
                 [:##j :left_arrow]
                 [:##k :down_arrow]
                 [:##l :right_arrow]
                 [:##o :delete_or_backspace]]}

        {:des "Tab mode app shortcuts"
         :rules [:tab-mode
                 [:1 "open /Applications/Firefox.app"]
                 [:2 "open /Applications/Notion.app"]
                 [:3 "open /Applications/Slack.app"]
                 [:4 "open /Applications/iTerm.app"]
                 [:5 "open /Applications/Visual\\ Studio\\ Code.app"]
                 [:6 "open /System/Library/CoreServices/Finder.app"]]}

        {:des "Caps lock as app-specific goto key"
         :rules [[:caps_lock :!Ck :slack]
                 [:caps_lock :!CSp :vscode]
                 [:caps_lock :!Cp :notion]
                 [:caps_lock :!Cl :spotify]
                 [:caps_lock :!CSa :intellij]
                 [:caps_lock :!Ct :firefox]
                 [:caps_lock :!CTa :mail]]}

        {:des "Navigation keys as macropad"
         :rules [[:insert :!Cd :chrome] ;; Google Meet toggle microphone
                 [:delete_forward :!Ce :chrome] ;; Google Meet toggle camera
                 [:insert :f16] ;; Zoom toggle microphone (global hotkey)
                 [:delete_forward :f17] ;; Zoom toggle camera (global hotkey)
                 [:home :!CSv] ;; Clipy clipboard history
                 [:end :!CSb] ;; Clipy snippet list
                 [[:page_up :page_down] :!Cw :firefox] ;; Close tab in Firefox
                 [:page_up :!Tpage_up :firefox] ;; Previous tab in Firefox
                 [:page_down :!Tpage_down :firefox] ;; Next tab in Firefox
                 [:page_up :!TStab :vscode] ;; Previous tab in VSCode
                 [:page_down :!Ttab :vscode] ;; Next tab in VSCode
                 [:!Fspacebar "osascript -e 'tell app \"System Events\" to sleep'" :keychron-k1]]} ; Siri button on Keychron produces Fn + Space 

        {:des "left_command alone -> ⌘ + tab to last app"
         :rules [[:left_command :left_command nil {:alone :!Ctab}]]}

        {:des "Quit application by command + Q only when pressing twice"
         :rules [[:!Cq
                  [:!Cq ["command-q" 0]]
                  ["command-q" 1]]
                 [:!Cq
                  ["command-q" 1]
                  nil
                  {:delayed {:invoked ["command-q" 0] :canceled ["command-q" 0]}}]]}
        ]}
{% endhighlight %}

[reddit-mechanicalkeyboards]: https://reddit.com/r/mechanicalkeyboards
[keychron]: https://www.keychron.com/products/keychron-k1-wireless-mechanical-keyboard
[edn]: https://github.com/edn-format/edn
[karabiner-json]: https://karabiner-elements.pqrs.org/docs/json/typical-complex-modifications-examples/
[goku]: https://github.com/yqrashawn/GokuRakuJoudo
[goku-example-1]: https://github.com/yqrashawn/GokuRakuJoudo/blob/master/examples.org
[goku-example-2]: https://github.com/yqrashawn/GokuRakuJoudo/blob/master/tutorial.md
[goku-example-3]: https://github.com/yqrashawn/GokuRakuJoudo/blob/master/in-the-wild.md
