---
title: Initial Setup
eleventyNavigation:
  key: Initial Setup   
  parent: Eleventy 
---
### Create package.json
```bash
npm init -y
```

### Use ESM and not commonJS (optional)
```js
npm pkg set type="module" 
```

### Eleventy installation
```bash
npm install @11ty/eleventy
```

### Create index file
```bash
echo '# My Eleventy Project' > index.md
```

### Create .gitignore
`/.gitignore`

```txt
# Dependencies       
node_modules

# VS Code
.history
.vscode

# Environment Variables
.env

# Eleventy output
dist  

# Other
.DS_Store

# Obsidian
.obsidian
```

### Create eleventy.config.js
`/eleventy.config.js`

```js
export default function(eleventyConfig) {
	// Configure Eleventy
};
```

### Modify scripts in package.json
`/package.json`

```json
"scripts": {
     "start": "eleventy --serve",
     "build": "eleventy"
}
```

### Change default directories in eleventy.config.js
`/eleventy.config.js`

```js
export default function(eleventyConfig) {
	// Configure Eleventy
};

export const config = {
    dir: {
      input: "views",  
      layouts: "_layouts",
      output: "dist"
    }
  };
```

### Define default template engine in eleventy.config.js
`/eleventy.config.js`

```js
export default function(eleventyConfig) {
	// Configure Eleventy
};

export const config = {
  markdownTemplateEngine: "njk",
  htmlTemplateEngine: "njk",
};
```

### Create directories
```txt
├── views                   // custom override of default folder 
│    ├── _data              // global data folder
│    │     └── site.js      
│    ├── _includes
│    │     └── partials   
│    ├── _layouts           // custom override of default folder 
│    │     └── base.njk     // base layout
│    ├── assets             // custom folder
│    │     ├── css          
│    │     ├── img          
│    │     └── js           
│    ├── note               // custom folder
│    │     └── note.json    // default Front Matter Data 
│    ├── post               // custom folder
│    │     └── post.json    // default Front Matter Data 
│    └── index.md           
├── .eleventy.config.js            
├── .gitignore              
├── package.json            
└── package-lock.json       
```

### Define addPassthroughCopy in eleventy.config.js
`/eleventy.config.js`

```js
export default function(eleventyConfig) {

    // method creates a file/folder copy in the output directory
    eleventyConfig.addPassthroughCopy("views/assets/css");
    eleventyConfig.addPassthroughCopy("views/assets/img");
    eleventyConfig.addPassthroughCopy("views/assets/js");
};
```

### Create basic layout base.njk
`/views/_layouts/base.njk`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{ title }}</title> 
  </head>
  <body>
    <main>
      {% block content %}
      {{ content | safe }}
      {% endblock %}    
    </main>
  </body>
</html>
```

### Define default Front Matter Data, i.e. create folder specific json files
`/views/notes/notes.json`

```json
{
    "layout": "base" 
  }
```

### Create and reference CSS stylesheet
```html
<head>
   <link href="/assets/css/style.css" rel="stylesheet"> 
</head>
```

### Define permalink
```yaml
---
permalink: "/index.html"
---
```

```yaml
---
permalink: "/{{ page.fileSlug }}/"
---
```

### Sources
- [11ty Recipes](https://11ty.recipes)
- [Get Started (11ty Documentation)](https://www.11ty.dev/docs/)
- [11ty tips I wish I knew from the start](https://davidea.st/articles/11ty-tips-i-wish-i-knew-from-the-start/)
