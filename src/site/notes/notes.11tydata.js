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
    // Vault YAML gate: notes without dg-publish: true are not rendered.
    // permalink: false tells Eleventy to skip writing the file entirely.
    permalink: (data) => {
      // gardenEntry (index) is always public
      if (data.tags.indexOf("gardenEntry") != -1) {
        return "/";
      }
      // Unpublished notes: skip build output entirely
      if (data["dg-publish"] !== true) {
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
