# Quartz Walkthrough

This vault now has a Quartz website bundled inside `site/`.

This guide explains:

- what is installed
- how to run the site locally
- how editing the vault affects the website
- how to build and publish it
- what to change if the repo name or domain changes
- how to troubleshoot the most common issues

## What You Have

The setup is split into two parts:

1. Your Obsidian vault content stays in the root of this repository.
2. Quartz lives in the `site/` folder and turns that content into a website.

Important folders and files:

- `site/`
  Quartz app and config
- `site/quartz.config.ts`
  main Quartz site settings
- `site/quartz.layout.ts`
  page layout and footer links
- `site/package.json`
  local commands like `dev` and `build`
- `site/content/`
  entry point Quartz reads from
- `.github/workflows/deploy-quartz.yml`
  GitHub Pages deployment workflow

## How Content Is Connected

Quartz is not using a copied snapshot of your notes.

Instead, `site/content/` contains symlinks that point back to the real vault folders:

- `site/content/Articles -> ../../Articles`
- `site/content/Concepts -> ../../Concepts`
- `site/content/Keywords -> ../../Keywords`
- `site/content/Maps -> ../../Maps`
- `site/content/Start Here.md -> ../../Start Here.md`

There is also a Quartz homepage file:

- `site/content/index.md`

That means:

- edit a note in the vault, and Quartz will read the updated version
- you do not need to duplicate notes into `site/content/`
- if you delete those symlinks, Quartz will stop seeing that content

## Requirements

This Quartz install currently declares:

- Node.js `>=22`
- npm `>=10.9.2`

On this machine, the environment already worked with:

- Node `v22.22.1`
- npm `11.12.0`

## First Local Run

All Quartz commands should be run from `site/`, not from the repository root.

### 1. Open a terminal in the repo

```bash
cd /Users/blake/Desktop/github/noble-research-obsidian-vault
```

### 2. Move into the Quartz app

```bash
cd site
```

### 3. Install dependencies

You only need to do this the first time, or after Quartz dependencies change.

```bash
npm install
```

### 4. Start the local preview server

```bash
npm run dev
```

Quartz should print a local address similar to:

```text
Started a Quartz server listening at http://localhost:8080
```

Open that URL in your browser.

### 5. Stop the server

Press `Ctrl+C` in the terminal window that is running Quartz.

## What `npm run dev` Does

`npm run dev` runs Quartz in watch mode with a local web server.

While it is running:

- Quartz watches your notes and config files
- when you save a markdown file, Quartz rebuilds the site
- you can refresh the browser to see updates

This is the command currently configured in `site/package.json`:

```bash
./quartz/bootstrap-cli.mjs build --serve
```

## What `npm run build` Does

If you want a one-time production-style build without running a dev server:

```bash
cd /Users/blake/Desktop/github/noble-research-obsidian-vault/site
npm run build
```

That command:

- reads the vault content from `site/content/`
- converts markdown into static HTML
- writes the finished site into `site/public/`

The output folder is:

- `site/public/`

If the build succeeds, that is the exact static site GitHub Pages will publish.

## Typical Editing Workflow

The normal day-to-day flow is:

1. start Quartz with `npm run dev`
2. edit notes in Obsidian or your editor
3. save changes
4. refresh the browser preview

You can edit:

- `Start Here.md`
- notes in `Articles/`
- notes in `Concepts/`
- notes in `Keywords/`
- notes in `Maps/`

Quartz will pick those up because of the symlinks in `site/content/`.

## Editing The Homepage

The website homepage is:

- `site/content/index.md`

This is separate from `Start Here.md`.

Current intent:

- `index.md` is the website landing page
- `Start Here.md` is the vault's main browse note

If you want the site homepage to feel more like a public-facing landing page, edit `site/content/index.md`.

If you want to change the note structure of the vault itself, edit `Start Here.md`.

## Site Branding And Settings

The main Quartz settings are in:

- `site/quartz.config.ts`

Important settings there:

- `pageTitle`
  site title shown across the website
- `baseUrl`
  used for RSS, sitemap, and deployed site URLs
- `theme`
  fonts and colors
- plugin list
  controls features like backlinks, search, tags, and markdown parsing

The page layout is in:

- `site/quartz.layout.ts`

That file controls pieces like:

- left sidebar
- graph view
- backlinks
- footer links

## Running On A Different Port

If port `8080` is busy, use a different one:

```bash
cd /Users/blake/Desktop/github/noble-research-obsidian-vault/site
npm run dev -- --port 8081
```

The extra `-- --port 8081` passes the port through to Quartz.

## Publishing To GitHub Pages

This repository now includes a GitHub Actions workflow:

- `.github/workflows/deploy-quartz.yml`

That workflow runs whenever you push to `main`.

What it does:

1. checks out the repository
2. installs Node 22
3. runs `npm ci` inside `site/`
4. runs `npm run build`
5. uploads `site/public/`
6. deploys the result to GitHub Pages

### GitHub setup you still need

In the GitHub repository settings:

1. open `Settings`
2. open `Pages`
3. set the source to `GitHub Actions`

After that, pushes to `main` should publish the site automatically.

## If The Repo Name Or Domain Changes

Quartz currently assumes this deployed path:

```text
mktcowboy.github.io/noble-research-obsidian-vault
```

That value lives in:

- `site/quartz.config.ts`

If you rename the repo or use a custom domain, update `baseUrl`.

Examples:

- GitHub Pages project site:
  `myusername.github.io/my-repo`
- custom domain:
  `notes.example.com`

Do not include `https://` in `baseUrl`.

Good:

```ts
baseUrl: "notes.example.com"
```

Good:

```ts
baseUrl: "myusername.github.io/my-repo"
```

Bad:

```ts
baseUrl: "https://notes.example.com"
```

## If You Add More Top-Level Vault Folders

Right now Quartz sees these top-level content areas:

- `Articles`
- `Concepts`
- `Keywords`
- `Maps`
- `Start Here.md`

If you later add a new top-level folder that should appear on the website, create a matching symlink inside `site/content/`.

Example for a new folder called `Projects`:

```bash
cd /Users/blake/Desktop/github/noble-research-obsidian-vault/site/content
ln -s ../../Projects Projects
```

After that, rebuild Quartz:

```bash
cd /Users/blake/Desktop/github/noble-research-obsidian-vault/site
npm run build
```

## Common Commands

Start local preview:

```bash
cd /Users/blake/Desktop/github/noble-research-obsidian-vault/site
npm run dev
```

Build once:

```bash
cd /Users/blake/Desktop/github/noble-research-obsidian-vault/site
npm run build
```

Format Quartz files:

```bash
cd /Users/blake/Desktop/github/noble-research-obsidian-vault/site
npm run format
```

Check TypeScript and formatting:

```bash
cd /Users/blake/Desktop/github/noble-research-obsidian-vault/site
npm run check
```

## Troubleshooting

### `npm run dev` says the port is already in use

Use another port:

```bash
npm run dev -- --port 8081
```

### Quartz builds, but a page is missing

Check whether the note lives inside one of the folders Quartz is currently linked to:

- `Articles/`
- `Concepts/`
- `Keywords/`
- `Maps/`

If not, Quartz will not see it until you add a symlink in `site/content/`.

### The website opens, but links look wrong after deployment

Usually this means `baseUrl` is wrong in:

- `site/quartz.config.ts`

For a GitHub Pages project site, the repo name must be part of the path.

### `npm install` or `npm run build` fails because of Node version

Check your versions:

```bash
node -v
npm -v
```

Quartz in this repo expects Node 22 or newer.

### I changed notes, but the site did not update

Try:

1. confirm Quartz is still running
2. refresh the browser
3. stop and restart `npm run dev`
4. run `npm run build` to confirm the site still compiles

### I accidentally deleted something inside `site/content/`

The most important items there are the symlinks and `index.md`.

If a symlink is missing, recreate it with `ln -s`.

## Suggested Safe Workflow

If you want a low-stress routine, use this:

1. keep writing and organizing notes in the vault as usual
2. use `npm run dev` when you want to preview the public website
3. edit `site/content/index.md` when you want to improve the landing page
4. edit `site/quartz.config.ts` only when you want to change site-level behavior
5. push to `main` when you want GitHub Pages to republish

## Official Quartz Docs

Useful official references:

- <https://quartz.jzhao.xyz/>
- <https://quartz.jzhao.xyz/configuration>
- <https://quartz.jzhao.xyz/build>
- <https://quartz.jzhao.xyz/hosting>

## Quick Start Summary

If you only want the minimum:

```bash
cd /Users/blake/Desktop/github/noble-research-obsidian-vault/site
npm install
npm run dev
```

Then open:

```text
http://localhost:8080
```
