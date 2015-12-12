---
layout: post
title: Hosting a blog on GitHub Pages with Jekyll
comments: true
---

If you want to host a simple blog for free, [GitHub Pages](https://pages.github.com/) is a good choice. It can host any static content, but hosting a [Jekyll site](http://jekyllrb.com/) (like this blog) is even better.

It's not too hard to set everything up, but the relevant information is scattered around different parts of documentations, and outdated instructions are everywhere. So this guide will focus on how to:

- Install Ruby and Jekyll on Windows for local development (you can skip reading this part)
- Instead of creating the default Jekyll site, setting up the [Lanyon](https://github.com/poole/lanyon) theme
- Publish to GitHub Pages as a personal blog (not a project page)
- Small tweaks and tips

# Installing on Windows
Ruby is very unstable on Windows, but fortunately there's [this guide](http://jekyll-windows.juthilo.com/) about installing Ruby and Jekyll, which can be set up on Windows quite well.
The guide is a bit outdated about version numbers, but I didn't have problems with the current versions (Ruby 2.2.3, Jekyll 3.0.1) at the time of writing this.

So go ahead, and install Ruby, Ruby DevKit (I was skeptical about the x64 version, but it does work!), and Jekyll as shown in the tutorial.

The next step in the guide is to install a syntax highlighter engine, either Pygments or Rouge. The guide is a bit outdated about this, because starting with Jekyll 3.0, the default highlighter is Rouge (instead of Pygments.rb), and it's a dependency of Jekyll, so there's no need to install anything here. But keep in mind that GitHub Pages still use Pygments for highlighting when building your site on their servers.

You can continue the Windows installing guide after your Jekyll site is set up and  running. 

# Your Jekyll blog 

First, you have to create a repository on GitHub with the naming convention `username.github.io`. After cloning this repo locally, you need to install the `github-pages` gem (`gem install github-pages`). This package makes sure you have the exact packages (and version numbers) locally that GitHub uses to build your site (you can achieve this with Bundler and a Gemfile too, more info [here](https://help.github.com/articles/using-jekyll-with-pages/)). 

Now download the [Lanyon](https://github.com/poole/lanyon) theme, and extract the contents to the folder. This theme is based on [Poole](http://getpoole.com/), which is a complete Jekyll install with a few improvements. Currently, this theme has a few bugs with Jekyll 3.0, but there are pull requests waiting to be merged. You can manually update two lines in your code based on [this pull request](https://github.com/poole/lanyon/pull/149/files), and everything will work.

You can build and test your site by running `jekyll serve` from the command line. _Note for Windows users: Ruby commands, such as `jekyll`, `gem`, or `bundle` don't work with Cygwin's `cygdrive` symlinks, use Windows' command line instead._

Now you can commit and push the code to GitHub, and the result should appear at `http://username.github.io`. In case of a warning or error, you will receive an email from GitHub.

# Small tweaks

The blog's name, description, and the sidebar can be modified in `_config.yaml`. There are other modifications mentioned in the [theme's readme](https://github.com/poole/lanyon).

I added Disqus commenting ([guide](https://help.disqus.com/customer/portal/articles/472138-jekyll-installation-instructions)), and Google Analytics tracking code. I didn't like the default URL pattern, so I changed the permalink attribute in `_config.yml` to `/:categories/:title` to hide the date part (maybe I'll start using categories in the future).

# Further reading

- [Jekyll documentation](http://jekyllrb.com/docs/home/)
- [GitHub Pages and Jekyll](https://help.github.com/articles/using-jekyll-with-pages/)

