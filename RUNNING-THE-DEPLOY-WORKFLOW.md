# Running The Deploy Workflow

This note explains what `.github/workflows/deploy-quartz.yml` is and how to run it later.

## Important: You Do Not Run This File Locally

The file:

- `.github/workflows/deploy-quartz.yml`

is a GitHub Actions workflow definition.

It is not a shell script and it is not something you run with `node`, `bash`, or `npm`.

GitHub reads that file and runs it on GitHub's servers.

## What The Workflow Is For

This workflow builds the Quartz site and publishes it to GitHub Pages.

If the workflow succeeds, the intended public website URL is:

```text
https://mktcowboy.github.io/noble-research-obsidian-vault/
```

## Two Ways To Trigger It

The workflow can run in two ways.

### 1. Push to `main`

The workflow file contains:

```yml
on:
  push:
    branches:
      - main
```

That means any push to the `main` branch should trigger it automatically.

### 2. Run it manually in GitHub

The workflow file also contains:

```yml
workflow_dispatch:
```

That line enables the `Run workflow` button in GitHub.

## How To Run It Manually

In GitHub:

1. open the repository
2. click `Actions`
3. click `Deploy Quartz site to GitHub Pages`
4. click `Run workflow`
5. choose branch `main`
6. click `Run workflow`

GitHub will then run the workflow on its own infrastructure.

## What The Workflow Does

The workflow file is:

- `.github/workflows/deploy-quartz.yml`

It has two jobs:

- `build`
- `deploy`

### Build job

The `build` job does the following:

1. checks out the repository
2. installs Node.js 22
3. runs `npm ci` inside `site/`
4. runs `npm run build` inside `site/`
5. uploads the generated `site/public/` folder as a Pages artifact

### Deploy job

The `deploy` job does the following:

1. waits for the build job to finish
2. takes the uploaded Pages artifact
3. publishes it to GitHub Pages

## Relevant Lines In The Workflow

If you want to revisit the key parts of the file:

- workflow name: [.github/workflows/deploy-quartz.yml](/Users/blake/Desktop/github/noble-research-obsidian-vault/.github/workflows/deploy-quartz.yml:1)
- triggers: [.github/workflows/deploy-quartz.yml](/Users/blake/Desktop/github/noble-research-obsidian-vault/.github/workflows/deploy-quartz.yml:3)
- build job starts: [.github/workflows/deploy-quartz.yml](/Users/blake/Desktop/github/noble-research-obsidian-vault/.github/workflows/deploy-quartz.yml:18)
- `npm ci`: [.github/workflows/deploy-quartz.yml](/Users/blake/Desktop/github/noble-research-obsidian-vault/.github/workflows/deploy-quartz.yml:32)
- `npm run build`: [.github/workflows/deploy-quartz.yml](/Users/blake/Desktop/github/noble-research-obsidian-vault/.github/workflows/deploy-quartz.yml:36)
- artifact upload: [.github/workflows/deploy-quartz.yml](/Users/blake/Desktop/github/noble-research-obsidian-vault/.github/workflows/deploy-quartz.yml:40)
- deploy job starts: [.github/workflows/deploy-quartz.yml](/Users/blake/Desktop/github/noble-research-obsidian-vault/.github/workflows/deploy-quartz.yml:45)

## If You Want To Test The Build Locally

You can test the same Quartz build locally, but that does not publish the site.

Run:

```bash
cd /Users/blake/Desktop/github/noble-research-obsidian-vault/site
npm ci
npm run build
```

That only verifies that Quartz can generate the static site into `site/public/`.

It does not run GitHub Pages.

## Why The Site Might Still Show 404

If the public Pages URL returns `404`, usually one of these is true:

1. the workflow has not run yet
2. the workflow is still running
3. the workflow failed
4. GitHub Pages is not fully enabled yet

## Where To Check Status

The best place to check is:

1. open the repo on GitHub
2. click `Actions`
3. open `Deploy Quartz site to GitHub Pages`

Look at the latest run.

If it is:

- `in progress`
  wait a few minutes
- `failed`
  open the failed step and read the error
- `successful`
  refresh the published URL

## What Success Looks Like

When everything is working:

1. the workflow run is green in `Actions`
2. the site opens at the GitHub Pages URL

Expected URL:

```text
https://mktcowboy.github.io/noble-research-obsidian-vault/
```

## Related Notes

- [SHARING-THE-WEBSITE.md](/Users/blake/Desktop/github/noble-research-obsidian-vault/SHARING-THE-WEBSITE.md)
- [QUARTZ-WALKTHROUGH.md](/Users/blake/Desktop/github/noble-research-obsidian-vault/QUARTZ-WALKTHROUGH.md)
- [.github/workflows/deploy-quartz.yml](/Users/blake/Desktop/github/noble-research-obsidian-vault/.github/workflows/deploy-quartz.yml:1)
