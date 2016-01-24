---
layout: post
title: Twitter notifications stopped working on Android
comments: true
---


One day I stopped receiving Twitter notifications anymore on my Android device. If I opened the Twitter app, the notifications were there, I just didn't get Android-level push notifications. I tried everything to fix this, from disabling 2 factor auth to looking for ADB logcat error messages, without any luck. Then I decided to contact Twitter support, and write down the exact problem and symptoms.

While I was looking for a contact form in Twitter's Help Center, I found an article mentioning something that looked relevant:

>We are currently aware of the following issues:
Some users are experiencing issues with notifications. For help with this issue, please read this article.

The linked article had a section titled **if you’ve reached the device limit for push notifications**

Wait, what? There is a device limit that nobody knows about? And there's not a single error message when one reaches that limit? I couldn't believe what I read, but I hoped this is the root cause of my problem, so I tried what the article suggested, and it worked!

>1. Sign in to twitter.com on a desktop or laptop computer.
2. Navigate to your Application settings.
3. Revoke access to the Twitter for Android app.
4. Next, visit your Apps settings on your Android mobile device.
5. Select the Twitter app and tap Uninstall. Note: your account is not deleted if you uninstall the app from your device.
6. Next, from your Android mobile device, visit the Google Play store and search for Twitter.
7. Install the Twitter for Android app.
8. Once you’ve opened the app and signed in to your account, visit your Settings to reset your push notifications.

I think step 3 is the most important here, I guess I've reached my device limit because of Android reinstalls over the years.
