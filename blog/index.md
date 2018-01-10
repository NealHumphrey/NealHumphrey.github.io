---
layout: blog_index
title:  "Blog"
---


# Blog

{% for post in site.posts %}
<article>
    <h2>
        <a href="{{ post.url }}">{{ post.title }}</a>
    </h2>
    <p class="subtitle"><strong>{{ post.author }} | {{ post.date | date: '%B %d, %Y' }} </strong></p>
    <p>{{ post.excerpt }}</p>
</article>
{% endfor %}