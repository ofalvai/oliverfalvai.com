---
layout: post
title: SQLite current time in UTC format
comments: true
---

The other day I wanted to store the current datetime in a SQLite database (in UTC, as a best practice), so I quickly read what the [docs say about `datetime()`](https://www.sqlite.org/lang_datefunc.html), and ended up with the following expression:

{% highlight sql %}
datetime('now', 'utc')
{% endhighlight %}

Then I noticed that the result *is not in UTC*, even though I set the second parameter (modifier) to `utc`.

Turns out if the first parameter (timestring) is `now`, **its result will be in UTC format**, but if the second parameter (modifier) is `utc`, it **assumes the timestring is in local time**:

> The 'now' argument to date and time functions always returns exactly the same value for multiple invocations within the same sqlite3_step() call. Universal Coordinated Time (UTC) is used.

> "utc" assumes that the string to its left is in the local timezone and adjusts that string to be in UTC.

So what I needed was as simple as `datetime('now')`.