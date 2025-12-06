// @ts-check
const { themes: prismThemes } = require("prism-react-renderer");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Physical AI & Humanoid Robotics",
  tagline: "Your complete guide to building robots that think and move",
  favicon: "img/favicon.ico",

  future: {
    v4: true,
  },

  url: "https://fizza-shareef.github.io",
  baseUrl: "/physical-ai-humanoid-guide/",

  organizationName: "fizza-shareef",
  projectName: "physical-ai-humanoid-guide",

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          editUrl:
            "https://github.com/fizza-shareef/physical-ai-humanoid-guide/tree/main/",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/docusaurus-social-card.jpg",
      colorMode: {
        defaultMode: "dark",
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: "Physical AI & Robotics",
        logo: {
          alt: "Physical AI Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "📚 Textbook",
          },
          {
            href: "https://github.com/fizza-shareef/physical-ai-humanoid-guide",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Textbook",
            items: [
              {
                label: "Introduction",
                to: "/docs/01-intro",
              },
              {
                label: "Core Concepts",
                to: "/docs/02-core",
              },
              {
                label: "Examples",
                to: "/docs/04-examples",
              },
            ],
          },
          {
            title: "Resources",
            items: [
              {
                label: "ROS 2 Docs",
                href: "https://docs.ros.org/en/humble/",
              },
              {
                label: "NVIDIA Isaac",
                href: "https://developer.nvidia.com/isaac",
              },
              {
                label: "Panaversity",
                href: "https://ai-native.panaversity.org/",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/fizza-shareef/physical-ai-humanoid-guide",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Physical AI Textbook. Built for GIAIC Hackathon.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ["bash", "python"],
      },
    }),
};

module.exports = config;
