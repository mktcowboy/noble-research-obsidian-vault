import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Noble Research Vault",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    // Update this if you deploy to a custom domain or a different repository.
    baseUrl: "mktcowboy.github.io/noble-research-obsidian-vault",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Bitter",
        body: "Source Sans 3",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f6f1e7",
          lightgray: "#d8cfbf",
          gray: "#a3947f",
          darkgray: "#544739",
          dark: "#2e241c",
          secondary: "#49634f",
          tertiary: "#b17c3a",
          highlight: "rgba(177, 124, 58, 0.14)",
          textHighlight: "#f5d06d88",
        },
        darkMode: {
          light: "#1d1a18",
          lightgray: "#3f3934",
          gray: "#74695c",
          darkgray: "#ddd2c3",
          dark: "#f3ece2",
          secondary: "#8eb18f",
          tertiary: "#d2a466",
          highlight: "rgba(210, 164, 102, 0.16)",
          textHighlight: "#9a7a1888",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
