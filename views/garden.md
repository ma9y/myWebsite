---
title: Digital Garden
layout: base
permalink: "/{{ page.fileSlug }}/"
eleventyNavigation:
  key: Digital Garden                   
---
{% set navPages = collections.note | eleventyNavigation("Digital Garden") %}
<ul>
{%- for entry in navPages %}
  <li{% if entry.url == page.url %} class="my-active-class"{% endif %}>
    <a href="{{ entry.url }}">{{ entry.title }}</a>
  </li>
{%- endfor %}
</ul>