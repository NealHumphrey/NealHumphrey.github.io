---
layout: blog_post
author: Neal Humphrey
title:  "Reducing Time To Hello World"
date:   2017-11-17
categories: web-development project-management
permalink: /blog/:year/:title/
excerpt: One of the unique elements of the Housing Insights project is that the software developers, data analysts and designers working on the project are volunteers. This is true of all projects at Code for DC and many Code for America brigades, but it’s not a common setup for a tech project. Most successful volunteers end up committing 5+ hours per week for a month or more. In software development, though, even 20 hours is a small amount and it can easily evaporate. When your most committed volunteers only have 4-5 hours/week to give to the project, reducing overhead time of configuration, learning the code base, and deciding what to do really pays off.
---
Cross-posted [on Medium](https://medium.com/@neal_humphrey/reducing-time-to-hello-world-d204b6f8326d)

*This post is part of a series documenting lessons learned while I was the project manager of Housing Insights, a website that provides data about subsidized affordable housing for policy makers in DC. I was hired to work on the project for 20-30 hours per week, primarily managing the group of 40+ volunteers that contributed to the project. Read [part 1]({{site.baseurl}}{% link _posts/2017-11-15-User-Input-in-Civic-Tech.md %}) and [part 2]({{site.baseurl}}{% link _posts/2017-11-16-Sprint-for-Volunteers.md %}).*


One of the unique elements of the [Housing Insights](http://housinginsights.org) project is that the software developers, data analysts and designers working on the project are volunteers. This is true of all projects at Code for DC and many Code for America brigades, but it’s not a common setup for a tech project. Most successful volunteers end up committing 5+ hours per week for a month or more. In software development, though, even 20 hours is a small amount and it can easily evaporate. When your most committed volunteers only have 4-5 hours/week to give to the project, reducing overhead time of configuration, learning the code base, and deciding what to do really pays off. 

## Reducing time to Hello World
When learning a new programming language, the first task is often a simple program that prints ‘Hello World’ to the screen. If we apply this concept to working on a new project, I would define this as getting someone to the point where they can run the existing code on their computer and make the first minor alteration to its behavior. 

While software configuration and setup is an important part of this, reducing time to Hello World goes beyond the technical and includes things like how much background information people need to know to be productive and how much time it takes to figure out where their changes need to occur in the code. We’ve had over 100 people join the project; about 40 of them submitted code that was merged into our codebase. After going through this process, these are the 4 recommendations I would make to someone leading a similar volunteer-developed project in the future:

**1) Keep your project background focused on mission and vision.** Everyone needs to know they’re working on a worthy project; beyond that, just give people as much background as they need to do their first task until they ask for more. 

**2) Make the installation process as plug-and-play as possible.** The faster they can run the code locally the better. 

**3) Optimize for developer efficiency over product performance.** What this means will vary widely based on the project needs.

**4) Make sure Hello World is Hello World.** Start people off on something easy. 

### 1) Keep background to a minimum

Early in the Housing Insights project, I provided a lot of background to people that joined the project - about the goals of the project, about how affordable housing works, about why housing subsidies are complicated. As time went on and the project developed, the context I gave got shorter and shorter - and people were able to start working quicker. 

There’s a tension here, though - understanding the problem and the users is necessary for building a good software product. Especially as developers start making design decisions in creating your product, they need this context to make the right choices. The message here is not to avoid giving context, but rather to space it out and scale it based on the role they’ll play in the project. Involve developers in deliberate user research projects like interviews and testing, and as these are conducted turn them into project documentation that new contributors can refer to. But to start, just give them the elevator pitch and the context and let them get the rest as they continue to work on the project. 

## 2) Make installation easy
Most coding requires some sort of specialized installation, whether it’s the programming language itself (Python, Ruby, etc.) or database client. Installing and configuring them on different operating systems and computers inevitably leads to problems - troubleshooting those problems inevitably consumes a lot of time. 

Housing Insights used a lot of different tools - a Postgres database (and a client to view it), Python for data ingestion and API, and Jekyll for to build our static website (which in turn needs Ruby). We started out using virtual environments in Python and instructions on configuring the Postgres installation to talk to Python, but eventually switched to [Docker](https://www.docker.com/what-docker) to manage this for us. Docker lets you install software into a virtual container that will run the same no matter where it’s installed. While Docker did help, it wasn’t a cure-all - we still had installation issues about half the time, and Docker requires significant work for one of the team members to get it set up and working properly. 

There’s unfortunately no one answer on how to handle the installation problem. But time spent making your installation process smoother will pay off in the long term every time you add a new person to the project. My biggest recommendations are:

* Make Docker your ‘default’ option for anything that requires more than one installation. 

* Have instructions for a from-scratch installation written up, and have people try that next if anything goes wrong with Docker installation, before trying to debug Docker. 

* Use a dependency management system (`requirements.txt` or `environment.yml` in Python or Anaconda, `package.json` with npm, etc.). Make sure you have instructions on what individual contributors will need to do if new dependencies are added (update their virtual environment, rebuild their Docker container, etc.).

* Assume that your users have never used the software system you’re using before. This means writing explicit step-by-step commands including where and how to install any needed software. It’s not enough to say ‘clone the repository’ - include specific instructions about opening a command prompt / terminal and the specific commands to enter in what order. For the users that don’t need that much detail it means they don’t need to think as much. Every part of your system will have at least one person who hasn’t used it before. 

I also found it’s useful to have every new user start by filling out a survey that includes their Github username, fork of the repository, email address, etc. immediately on starting the project. It was much easier to keep track of who was working on what when I added this to our onboarding workflow. 

Finally, if you’re not familiar with tools like Docker or dependency management systems, get some help from someone who is in setting up your project to be robust and well structured as early in the process as you can. 

## 3) Optimize for developer efficiency over product performance.
When we first started working on Housing Insights, we weren’t sure how complicated a system we would need for providing the data to our front end graphs. If we were lucky, we would be able to get away with simply loading data from static CSV files. We also investigated using the Code for DC’s data portal, which provides some simple API tools, and a serverless API through Amazon’s Lambda service. If our needs ended up being more complex, we’d go with using a server. 

At the beginning, I was 50% sure we’d need to end up going with a server. We spent time investigating each of these other alternatives, and in the meantime the front end developers went forward with a temporary approach using the static csv files. Several months in we did break down and go for the server option. In retrospect, the uncertainty of this decision meant we needed to rewrite some code and we spent a lot of time investigating options. However, the real time cost was in developers familiarity with the code - every time there is a big structural change in how the code is set up, it takes a lot of time to communicate this to everyone on the project and for them to get familiar with how this new system is set up. 

In a conventional team with full-time team members, I’d go the incremental route again - picking the ‘best’ option would be worth the learning time when everyone has a lot of time to devote to the project. However faced with this type of tradeoff for a volunteer team with a few hours a week per person, I’d recommend choosing a ‘more than enough’ solution early rather than incrementally increasing complexity. 

Optimizing for developer efficiency comes up in a few different places as well. When you’re using libraries or packages, the well known widely used systems are always preferable to the cutting edge. Even though no matter what you pick there won’t be many contributors that already know the library you’re using, having lots of tutorials and Stackoverflow questions available helps them learn faster. Lowering the amount of time learning new systems adds a lot to their output - if they were working full-time on a project, the same amount of time spent learning would be a smaller portion of their total work and so the tradeoff would be different. 

## 4) Make sure Hello World is Hello World.

The point of writing a Hello World application is not to make a useful contribution to the software world - it’s to prove you have your system properly set up, can run the simplest piece of code, and have a broad understanding of what the language looks like. As soon as you’re done writing it, you move on to bigger and better things. 

The first task that a contributor to a new project works on should be the same - proof that they have their system set up properly and have a broad understanding of how the code for that project is structured. DCAF again has a [great example of this](https://github.com/DCAFEngineering/dcaf_case_management/blob/master/docs/YOUR_FIRST_CONTRIBUTION.md) - the recommend that the first task is to add a message to the users of their tool by editing a ‘messages’ section of the code and make a pull request of that. 

If this first task is truly a proof of concept, the second task should still be small. When working with volunteers, it’s hard to know the level of experience people have, and whether or not they’ll stay interested in the project. The ideal second task is:

* Easy enough that a beginner can accomplish it in 1-2 hours, and an experienced developer in 15 minutes. 

* Clearly defined in a task description (Github issue) that states exactly which files and sections of the code the user should look in to find what they need, and what sequence of commands are needed to run it. 

* Useful for the project, but at least second tier in priority - this way if a new beginner contributor gets unexpectedly stuck, or if a new contributor ends up not returning to the project, development isn’t derailed. 

# Conclusion

I know these are just the tip of the iceberg - any project managers out there that have led a civic tech project know it’s a fine balancing act to keep a team like this productive. Do you have any further suggestions for making projects like these run more effectively? Discuss it in [the comments on Medium](https://medium.com/@neal_humphrey/reducing-time-to-hello-world-d204b6f8326d), or come to a [Code for DC Hacknight](https://codefordc.org/) to talk about it!

Finally - A big thank you to [all the people](https://github.com/codefordc/housing-insights/network/members) that have contributed to [Housing Insights](http://housinginsights.org)!

# Resources

* You can view our [onboarding documentation here](https://github.com/codefordc/housing-insights/blob/64f820b1592b85d6cdac43f85a4fc1987ec05ec3/docs/resources/onboarding/index.md). 
* Another good example of onboarding documentation is [the DCAF project](https://github.com/DCAFEngineering/dcaf_case_management) at Code for DC. 
* If you’re trying to get set up with Docker for the first time, Code for DC also has a [‘Project Management’ project](https://github.com/codefordc/project-management) that provides some copy-paste Docker images for common setups. 
* DCAF’s [example of a first simple proof of setup task for new contributors](https://github.com/DCAFEngineering/dcaf_case_management/blob/master/docs/YOUR_FIRST_CONTRIBUTION.md) - adding a message to the users of their tool by editing a ‘messages’ section of the code and make a pull request of that. 


*The Civic Tech and Data Collaborative is a partnership of Code for America, Living Cities, and the National Neighborhood Indicators Partnership and is supported by the John D. and Catherine T. MacArthur Foundation. The national organizations are working with seven communities around the country to understand how to harness the power of data and technology to increase efficiency, equity, and effectiveness in order to benefit the most vulnerable residents in our urban communities.*
