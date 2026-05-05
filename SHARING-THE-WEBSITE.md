# Sharing The Website

This note explains how to share the Quartz version of this vault later.

## Local Preview Is Not Public

When you run Quartz locally, it opens at:

```text
http://localhost:8080
```

That address only works on your own machine.

You cannot send a `localhost` link to someone else and expect it to work.

## Recommended Way To Share It

The cleanest option is to publish the site with GitHub Pages.

This repository is already prepared for that with:

- `.github/workflows/deploy-quartz.yml`

That workflow builds the Quartz site from `site/` and publishes the generated output.

## What To Do Later

### 1. Commit and push your changes

From the repo root:

```bash
cd /Users/blake/Desktop/github/noble-research-obsidian-vault
git add .
git commit -m "Set up Quartz website"
git push origin main
```

### 2. Turn on GitHub Pages

In GitHub:

1. open the repository
2. go to `Settings`
3. open `Pages`
4. set the source to `GitHub Actions`

Once that is enabled, pushes to `main` should trigger the deploy workflow.

### 3. Wait for the deploy to finish

Check the repository `Actions` tab.

Look for the workflow named:

- `Deploy Quartz site to GitHub Pages`

When it finishes successfully, the site should be live.

## Expected Public URL

The current Quartz config assumes this published URL:

```text
https://mktcowboy.github.io/noble-research-obsidian-vault/
```

That comes from:

- `site/quartz.config.ts`

Current setting:

```ts
baseUrl: "mktcowboy.github.io/noble-research-obsidian-vault"
```

## If The Repo Name Changes

If you rename the GitHub repository, the public URL will also change.

If that happens, update `baseUrl` in:

- `site/quartz.config.ts`

Example:

```ts
baseUrl: "yourusername.github.io/new-repo-name"
```

Do not include `https://` in `baseUrl`.

Good:

```ts
baseUrl: "yourusername.github.io/my-site"
```

Bad:

```ts
baseUrl: "https://yourusername.github.io/my-site"
```

## If You Want A Custom Domain Later

If you eventually want something like:

```text
https://notes.yourdomain.com
```

you would update `baseUrl` to:

```ts
baseUrl: "notes.yourdomain.com"
```

and then configure that domain in GitHub Pages and your DNS provider.

That is optional. GitHub Pages works fine without a custom domain.

## Quick Summary

If you only want the short version:

1. push the repo to GitHub
2. enable `GitHub Actions` in GitHub Pages settings
3. wait for the deploy workflow
4. share the public GitHub Pages URL

## Related Files

- [site/quartz.config.ts](/Users/blake/Desktop/github/noble-research-obsidian-vault/site/quartz.config.ts:18)
- [.github/workflows/deploy-quartz.yml](/Users/blake/Desktop/github/noble-research-obsidian-vault/.github/workflows/deploy-quartz.yml:1)
- [QUARTZ-WALKTHROUGH.md](/Users/blake/Desktop/github/noble-research-obsidian-vault/QUARTZ-WALKTHROUGH.md)
