---
title: Blog
layout: base
---
{% set navPages = collections.post | reverse %}

{% for item in navPages %}

<article class="flex gap-2">
<div class="w-28 shrink-0 text-gray-500 font-semibold">{{ item.data.date | date("DD") }}</div>
<div class=""><a href="{{ item.url }}">{{ item.data.title }}</a></div>
</article>
{% endfor %}
