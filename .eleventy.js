module.exports = function(eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("admin");

  // Posts collection (newest first)
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").reverse();
  });

  // Products collection
  eleventyConfig.addCollection("products", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/products-items/*.md");
  });

  // Date filter: "January 15, 2026"
  eleventyConfig.addFilter("readableDate", function(date) {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric"
    });
  });

  // Truncate filter for post excerpts
  eleventyConfig.addFilter("truncate", function(str, length) {
    if (!str) return "";
    return str.length > length ? str.slice(0, length) + "…" : str;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
