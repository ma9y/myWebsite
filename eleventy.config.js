import { DateTime } from "luxon";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

export default function (eleventyConfig) {

    eleventyConfig.addPassthroughCopy("views/assets/img");
    eleventyConfig.addPassthroughCopy("views/assets/js");
    eleventyConfig.addPassthroughCopy("views/assets/css/code.css");

    // SHORTCODES
    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    // PLUGINS
    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    // FILTERS
    eleventyConfig.addFilter("date", (dateObj, format = "LLL d", locale = "en-GB") => {
        return DateTime.fromJSDate(dateObj).setLocale(locale).toFormat(format);
    });

    eleventyConfig.addFilter("dateFromString", (dateObj, format = "DDD", locale = "en-GB") => {
        return DateTime.fromISO(dateObj).setLocale(locale).toFormat(format);
    });

    eleventyConfig.addFilter("isBetween", function (date, start, end) {
        const toDateOnly = d => {
            const dt = new Date(d);
            return new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
        };

        const d = toDateOnly(date);
        const startDate = toDateOnly(start);
        const endDate = toDateOnly(end);

        return d >= startDate && d <= endDate;
    });
};

export const config = {

    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",

    dir: {
        input: "views",
        layouts: "_layouts",
        output: "dist"
    }
};