---
title: Deploying a Quartz site to Netlify
---

I replaced my previous Jekyll static website with [Quartz](https://quartz.jzhao.xyz/) (you are looking at the end result!).
I didn't want to give up my existing [Netlify](https://netlify.com) setup deploying the site, but Quartz is not just a static site (even though it's based on [Hugo](https://gohugo.io/)), so Netlify can't just automatically build it.
Quartz's [original deploy instructions](https://quartz.jzhao.xyz/notes/hosting/) build the Hugo site with GitHub Actions and deploy it to GitHub Pages. This guide is an extension of the upstream instructions, **but deploy the final result on Netlify**.

### Why it doesn't work out of the box
Netlify recognizes popular static site generators (such as Hugo) to build the static site in its own CI system.
Quartz is a bit special, requiring one extra build step compared to a regular Hugo site. Quartz has a CLI tool that scans the notes and precomputes the graph representation. This extra build step is obviously not supported by Netlify, and there are no Netlify plugins doing this step as of today.

### The deploy workflow
Instead of creating a plugin, I decided to embrace the existing GitHub Actions workflow and just replace the last step (deploy to GitHub pages) with a Netlify equivalent. Netlify has a CLI tool that lets me skip its CI build system and directly deploy a pre-built folder on Netlify.
This means that the build happens in GitHub's CI environment and Netlify just receives the final static site to deploy.
You can see [my full workflow here](https://github.com/ofalvai/oliverfalvai.com/blob/2659d9c77a3bb81c0a4d923b13870bd513295dec/.github/workflows/deploy.yaml), but the only difference is the last step of the Quartz deploy workflow:

```yml
- name: Netlify deploy
  uses: netlify/actions/cli@master
  id: netlify-deploy
  with:
    args: deploy --dir=public --prod
    env:
      NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
      NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
```

This is [the official Netlify GitHub Action](https://github.com/netlify/actions) and we tell it to create a prod deployment of the `public` folder (Hugo's build folder).
Don't forget to define the two secret values as GitHub Actions secrets! Both values are available under your Netlify settings.

### Pull request deployments
We can also recreate Netlify's PR deploy preview feature using a plain GitHub Actions workflow. This workflow is not much different from the above deploy workflow, the main difference is in handling Netlify's special deploy preview URL (such as `https://deploy-preview-17--oliverfalvai.netlify.app/`).
Again, [the whole workflow is available in my repo](https://github.com/ofalvai/oliverfalvai.com/blob/2659d9c77a3bb81c0a4d923b13870bd513295dec/.github/workflows/pr.yaml).
We need to tell Hugo to use this URL instead of the hard-coded base URL, which is a bit of a chicken-and-egg situation: the Hugo build happens *before* Netlify's process starts and assigns a temporary URL. Fortunately, we can override the dynamic part of this URL (called *alias*), so let's create a unique alias as an env var from the PR number and the commit SHA:

```yaml
env:
  NETLIFY_SITENAME: oliverfalvai.netlify.app
  NETLIFY_ALIAS: pr-${{github.event.pull_request.number}}-${{github.sha}}
```

Next, we tell Hugo to override the base URL (normally defined in `config.toml`):

```sh
hugo --minify --baseURL="https://${{env.NETLIFY_ALIAS}}--${{env.NETLIFY_SITENAME}}/"
```

Finally, we tell Netlify to use our custom alias:

```yaml
- name: Netlify deploy
  uses: netlify/actions/cli@master
  id: netlify-deploy
  with:
    args: deploy --dir=public --alias=${{env.NETLIFY_ALIAS}}
```

As a cherry on top, we can also automatically comment the deploy URL on the pull request:

```yaml
- name: Comment PR
  uses: thollander/actions-comment-pull-request@v2
  with:
    message: |
      [Netlify draft deploy](${{steps.netlify-deploy.outputs.NETLIFY_URL}})
    comment_tag: netlify-url
```
