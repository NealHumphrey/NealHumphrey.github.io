---
layout: home
title: Code Samples
---

# Code Samples

I have lots of examples of code I've written in the real world available as open source on my [Github profile](https://github.com/NealHumphrey). Lots of these contributions, though, are to external repositories where it might not be apparent which parts of the code were written by me versus others. Below I've pulled out a few representative examples in various categories.

<hr>

### Front-end / Javascript

<hr>

**[Creating reusable charts in D3](https://github.com/NealHumphrey/d3-boilerplate):** A charting library I spun out of my work on the Housing Insights website. Creates reusable chart objects that follow a consistent design pattern and provides boilerplate functionality for creating new reusable D3/SVG charts. I also [wrote a blog post]({{ site.baseurl }}{% post_url 2017-08-16-Reusable-D3-Charts %}) describing some of my design decisions. 

*Javascript, D3, object-oriented programming, data visualization*

<hr>

**[Adding UI elements for each data type in Housing Insights](https://github.com/codefordc/housing-insights/blob/4fe0d453fbfb56358c233e8c4b6cf0784c9905a7/docs/tool/js/views/filter-view.js)**: For most of our front-end Housing Insights code it is hard to separate code wholly created by myself versus others, as we went through a few refactors and added small feature upgrades that are spread throughout the codebase as we went. One area I had primary later stage responsibility for was refactoring the code that added user interface components (drop downs, sliders, etc.) for each data source in our main browse page. This includes the [buildFilterComponents](https://github.com/codefordc/housing-insights/blob/4fe0d453fbfb56358c233e8c4b6cf0784c9905a7/docs/tool/js/views/filter-view.js#L1145) function (line 1145), which for example creates a [categoricalFilterControl](https://github.com/codefordc/housing-insights/blob/4fe0d453fbfb56358c233e8c4b6cf0784c9905a7/docs/tool/js/views/filter-view.js#L1000)(line1000) or a [continuousFilterControl](https://github.com/codefordc/housing-insights/blob/4fe0d453fbfb56358c233e8c4b6cf0784c9905a7/docs/tool/js/views/filter-view.js#L296)(line 296), both of which utilize the [setupFilter](https://github.com/codefordc/housing-insights/blob/4fe0d453fbfb56358c233e8c4b6cf0784c9905a7/docs/tool/js/views/filter-view.js#L896)(line 896) function to take care needs shared by both filterControl types. 

For a more 'real time' view of the code I wrote for the project, check out these pull requests:

* Adding a search bar: **[pull request](https://github.com/codefordc/housing-insights/pull/473)**
* Straw man code of merging two menus into one: **[pull request](https://github.com/codefordc/housing-insights/pull/375)**
* All my Housing Insights pull requests: **[pull request](https://github.com/codefordc/housing-insights/pulls?utf8=%E2%9C%93&q=is%3Apr+author%3ANealHumphrey+)**

*Javascript, object-oriented programming, closures, interface design, D3*

<hr>

**[Add a page-load modal and feature tour](https://github.com/codefordc/housing-insights/pull/549):** This is a relatively simple feature add of integrating a feature tour library that starts on first page load via a welcome modal. Includes features like a spinner-background if the user closes the modal too soon (before page is loaded) and changing the user options if loading the site with settings saved.

*Javascript, HTML*

<hr> 

### Backend / Python

<hr>

**Housing Insights Backend Code**: In addition to front end work listed above, I wrote a lot of the Python code for doing data ingestion. Here's a few of the more substantial pull requests:

- Refactor the objects that connect with APIs for downloading our data sources: **[pull request](https://github.com/codefordc/housing-insights/pull/286)**
- Using Blueprints in a Flask-based API server: **[pull request](https://github.com/codefordc/housing-insights/pull/412/files)**
- Adding ability to calculate fields while updating database: **[pull request](https://github.com/codefordc/housing-insights/pull/435)**
- Remove table during update: **[pull request](https://github.com/codefordc/housing-insights/pull/462)**
- Update project table: **[pull request](https://github.com/codefordc/housing-insights/pull/466)**
- Split out addresses into a new address table: **[pull request](https://github.com/codefordc/housing-insights/pull/497)**

*Python, Flask, data ingestion, object-oriented programming*

<hr>

**[Yellowbrick Confusion Matrix](https://github.com/DistrictDataLabs/yellowbrick/pull/144/commits/ceee7f8481669c351241834698b2813a84f498b0):** Yellowbrick is a visualization library for use in the machine learning process. It's designed to be used in conjunction with scikit-learn, and is built in Python using matplotlib. This commit is a visualizer that I created which creates a heatmap of the confusion matrix report provided by scikit-learn, for use in evaluating the quality of classification algorithms. `classifier.py` is where the main code is found, and the `.png` image shows an example of what is produced. 

*Python, scikit-learn, matplotlib, object-oriented programming*

<hr>

**[Data Science Certificate Capstone](https://github.com/georgetown-analytics/housing-risk):** I wrote nearly all the code for my data science certificate program capstone program. Some key files to look at are the main [ingestion](https://github.com/georgetown-analytics/housing-risk/blob/dev/code/ingestion/update_database.py), [wrangling](https://github.com/georgetown-analytics/housing-risk/blob/dev/code/wrangling/wrangle_data.py), and [run_models](https://github.com/georgetown-analytics/housing-risk/blob/dev/code/prediction/run_models.py) files. Note that while the code in this project is relatively well structured into reusable functions and modules, it does have a fair amount of temporary and working files, insufficient tests and only moderate code documentation. This was a one-off project and not intended for production. In addition, see the [final report](https://github.com/georgetown-analytics/housing-risk/blob/dev/presentation/HousingRisk-CapstoneFinalReport.pdf) for some more guidance on the coding process and findings.

*Python, scikit-learn, machine learning, functional programming*

