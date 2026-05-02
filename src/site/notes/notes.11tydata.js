require("dotenv").config();
const settings = require("../../helpers/constants");

const allSettings = settings.ALL_NOTE_SETTINGS;

module.exports = {
  eleventyComputed: {
    layout: (data) => {
      if (data.tags.indexOf("gardenEntry") != -1) {
        return "layouts/index.njk";
      }
      return "layouts/note.njk";
    },
    // Vault YAML gate. A note is public iff frontmatter `publish` is the string
    // "publish" or "published". Anything else → permalink: false → Eleventy skips
    // the file. This rule is locked in docs/design-log.md.
    permalink: (data) => {
      // gardenEntry (index) is always public
      if (data.tags.indexOf("gardenEntry") != -1) {
        return "/";
      }
      // Unpublished notes: skip build output entirely
      const publishValue = data.publish;
      if (publishValue !== "publish" && publishValue !== "published") {
        return false;
      }
      if (data.permalink) {
        const p = data.permalink;
        // Ensure /notes/ prefix — DG plugin generates this natively.
        // Pages without it (hand-set in frontmatter) get it added here.
        if (p === '/' || p.startsWith('/notes/')) return p;
        return '/notes' + p;
      }
      return undefined;
    },
    basesNotes: (data) => {
      if (!data.collections || !data.collections.note) return [];
      return data.collections.note.map((item) => ({
        path: item.filePathStem.replace("/notes/", ""),
        url: item.url,
        metadata: item.data,
        fileSlug: item.fileSlug,
      }));
    },
    settings: (data) => {
      const noteSettings = {};
      allSettings.forEach((setting) => {
        let noteSetting = data[setting];
        let globalSetting = process.env[setting];

        let settingValue =
          noteSetting || (globalSetting === "true" && noteSetting !== false);
        noteSettings[setting] = settingValue;
      });
      return noteSettings;
    },
  },
};
