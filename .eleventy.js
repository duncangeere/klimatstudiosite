const sortByDisplayOrder = require('./src/utils/sort-by-display-order.js');

module.exports = config => {
    // Set directories to pass through to the dist folder
    config.addPassthroughCopy('./src/images/');
    config.addPassthroughCopy("./src/fonts/");

    // Returns work items, sorted by display order
    config.addCollection('work', collection => {
        return sortByDisplayOrder(collection.getFilteredByGlob('./src/work/*.md'));
    });

    // Returns work items, sorted by display order then filtered by featured
    config.addCollection('featuredWork', collection => {
        return sortByDisplayOrder(collection.getFilteredByGlob('./src/work/*.md')).filter(
            x => x.data.featured
        );
    });

    // Returns testimonial items, sorted by display order
    config.addCollection('testimonials', collection => {
        return sortByDisplayOrder(collection.getFilteredByGlob('./src/testimonials/*.md'));
    });

    // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
    config.setUseGitIgnore(false);

    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dir: {
            input: 'src',
            output: 'dist'
        }
    };
};