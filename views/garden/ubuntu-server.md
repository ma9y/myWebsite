---
title: Ubuntu Server
eleventyNavigation:
  key: Ubuntu Server   
  parent: Digital Garden 
---
{% set navPages = collections.note | eleventyNavigation("Ubuntu Server") %}
<ul>
{%- for entry in navPages %}
  <li{% if entry.url == page.url %} class="my-active-class"{% endif %}>
    <a href="{{ entry.url }}">{{ entry.title }}</a>
  </li>
{%- endfor %}
</ul>