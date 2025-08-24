---
title: Eleventy
eleventyNavigation:
  key: Eleventy   
  parent: Digital Garden 
---
{% set navPages = collections.note | eleventyNavigation("Eleventy") %}
<ul>
{%- for entry in navPages %}
  <li{% if entry.url == page.url %} class="my-active-class"{% endif %}>
    <a href="{{ entry.url }}">{{ entry.title }}</a>
  </li>
{%- endfor %}
</ul>