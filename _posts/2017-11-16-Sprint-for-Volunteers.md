---
layout: blog_post
author: Neal Humphrey
title:  "'Sprint' for Volunteers: A Software Design Process for Volunteer Civic Tech"
date:   2017-11-16
categories: web-development project-management
permalink: /blog/:year/:title/
excerpt: User input is critical to designing a good tech product - I outlined some of the key considerations in the User Input in Civic Tech blog post previously. Software development has been grappling with this issue for a long time, and there are a lot of techniques out there to help - design thinking, user experience design, human centered design, and the Lean Startup movement are all methods created to solve this problem. These are all powerful techniques, but it can sometimes be hard to turn these concepts into a clear action plan, and especially to manage the delicate balance of how much time to spend learning vs. doing.
---

*This post is part of a series documenting lessons learned while I was the project manager of Housing Insights, a website that provides data about subsidized affordable housing for policy makers in DC. I was hired to work on the project for 20-30 hours per week, primarily managing the group of 40+ volunteers that contributed to the project. Read [part 1]({{site.baseurl}}{% link _posts/2017-11-15-User-Input-in-Civic-Tech.md %}) and [part 3]({{site.baseurl}}{% link _posts/2017-11-17-Reducing-Time-to-Hello-World.md %}).*

User input is critical to designing a good tech product - I outlined some of the key considerations in the '[User Input in Civic Tech]({{site.baseurl}}{% link _posts/2017-11-15-User-Input-in-Civic-Tech.md %})' blog post previously. Software development has been grappling with this issue for a long time, and there are a lot of techniques out there to help - design thinking, user experience design, human centered design, and the Lean Startup movement are all methods created to solve this problem. These are all powerful techniques, but it can sometimes be hard to turn these concepts into a clear action plan, and especially to manage the delicate balance of how much time to spend learning vs. doing.

This difficult tradeoff, learning vs. doing, is especially compounded when the project is done by volunteers, as all our Code for DC projects and indeed most Code for America brigades are run. In addition to our ongoing series of user interviews, this post describes some lessons learned about the design sprint we used to kick off our project.

## The Design Sprint
To create the process we would use for our Housing Insights design process, I relied almost exclusively on the [Google Ventures Design Sprint](http://www.gv.com/sprint/) process. As they describe it:

> The sprint is a five-day process for answering critical business questions through design, prototyping, and testing ideas with customers. Developed at GV, it’s a “greatest hits” of business strategy, innovation, behavior science, design thinking, and more—packaged into a battle-tested process that any team can use.

Everything about their sprint process is consistent with the techniques I've seen and learned elsewhere; but, they package it up into an action-oriented plan, which makes it so pleasantly useable. I found that it wasn't necessary to go searching elsewhere for other tools or activities to mash up with this one. I recommend using their guide if you have any sort of software design to develop.

But for our purpose, the GV Sprint has some problems. Most notably, they assume a team of 5-6 people working full time for a week. For civic tech projects, we have anywhere from 3 to 12 people who can contribute a few hours a week. When you're drawing the team from within your own company or organization, everyone at least has some fundamental understanding of the domain (affordable housing, in our case) - but our tech volunteers don't share that domain knowledge. Time for some modifications.

For this more limited time restriction, I modified the 'Sprint Week' into a 'Sprint Month.' We set up one group meeting per week, which focused on the facilitated group discussion and design activities. This isn't enough time to get everything done, though, so whatever could be done by a subset of the group or independently I moved into interim work (much of it done by me as the project leader). Despite this rearranging, our process looked pretty similar to the one laid out by GV.

## Lessons Learned

+ **Domain learning takes a long time.**
For Housing Insights this was especially true - the world of affordable housing is a convoluted mix of decades of federal and local policies, overlapping programs, and competing concerns. Just learning the landscape took a long time. I tried to go a little too fast in our design sprint, hoping that my couple of months of pre-sprint learning and interviewing could fill in the gaps in our volunteer coders' knowledge, but we quickly hit some walls of just not having sufficient information about our users. It's worth taking your time, as well as bringing as many project contributors on the learning journey as you can. In retrospect, I would have had all our volunteers conduct or listen in on at least one independent user interview before even starting the design sprint. Unlike the GV model, most people were brand new to the problem space so needed to have more context before doing design. 

+ **Project leader domain knowledge is necessary, but not a sufficient replacement for volunteer domain knowledge**
The project leader(s) need to learn a lot about their subject, so they can effectively facilitate discussions between users and coders. Knowing the subject can make sure that coders don't overlook 
important topics (because they didn't know to ask) and can speed the learning process of a large group that's hearing from a potential user (by intervening with key definitions and explanations).

In Housing Insights, some of the most valuable sessions for getting our volunteers to understand affordable housing and feel confident enough to begin working on design were when we had volunteers interview potential users directly. You should always spend more time talking to users than you think you should. From my time working in startups and using Lean Startup techniques, the guidance was to keep doing interviews until you stopped learning something new - with the rule of thumb being to plan on at least 50 interviews. Having a majority of the volunteers do interviews before the design sprint will make sure you add enough domain expertise to your design team.

+ **Find the smallest possible scope for round 1 - even starting with a throwaway example**
Besides the interviews, our other biggest struggle was with our scope. We started with a rather vague project description and a long list of potential users - making scoping of our project a big challenge. In the Housing Insights sprint, I tried to limit our scope by focusing on just designing one page, the home page. While this limited our canvas, it didn't confine our problem - so we spent a lot of time grappling with the competing needs. Much better would have been to define an arbitrarily smaller scope for our first design sprint - for instance pick just one user, and just one 'scenario' of why that user might come to our tool. Then, focus the whole design sprint on designing and testing a prototype for just that one scenario.

The fact that we'd ultimately want to include competing scenarios and other users in our final website scope might mean that the design that came out of this process wouldn't work at all. But, we would have been able to learn and implement much faster, and could have followed on with a second design sprint focused on the bigger question - this would have helped our team move faster in the early part of the process.

Not all projects will have this problem - many have the luxury of starting with a more clearly defined project objective, at least from the perspective of the typical workflow of a user interacting with the tool. Regardless, pay attention to your design scope and realize you don't have to tackle it all in one go.

+ **Don't bring in new people midway.**
At Code for DC, new people can arrive and join groups at any point. We held the first two of our design sessions during the Code for DC hacknights, so we got new people each time. In the second session we ended up spending about half of the time getting people up to speed. You still want to kick off the session with reminders of what you learned last week, big picture mission, etc. - it's been a week since the previous session, and it gives everyone focus. But things would have gone smoother if we hadn't had new people in the later sessions. 

+ **Carefully moderate whole-group discussions.**
Our interviews of guest experts / potential users during the design sessions were useful context, but having an open floor for questions meant it was easy to veer off topic with one or two people latching on to questions that were not core issues. This is ok in a small group, but with 12 people in the room it's important to keep those tangents to a minimum. Off-load as much learning about the problem and domain to pre-work reading and interviews - the more productive way to use guest experts is when you have people discuss how their pre-work learning applies to a specific problem, and they can ask the potential users for advice to fill in their gaps in knowledge.
Spending a month or more just planning the design of a product seems slow and even counterproductive (let's just build it already!), but the difference between a useless and an indispensable website or tech tool are often the small, surprising details that improve usability and make sure that your tech solution is really solving the right problem. It's a lot easier to throw away a draft idea when it turns out it's not what users want than it is to throw away code that you spent a few months writing - and nearly every project benefits from doing something different than their first idea. Involving users is the only way to find out before you start writing code.

## Resources
- [Google Ventures Design Sprint](http://www.gv.com/sprint/)
- [The meeting canoe](http://axelrodgroup.com/meeting-canoe/) is a great reminder of what every meeting (or design session!) should include.
- The [previous post]({{site.baseurl}}{% link _posts/2017-11-15-User-Input-in-Civic-Tech.md %}) talked about conducting user interviews and user involvement generally. 
- The [final post]({{site.baseurl}}{% link _posts/2017-11-17-Reducing-Time-to-Hello-World.md %}) in this series talks about getting volunteers up and working quickly by reducing the time to hello world.


*The Civic Tech and Data Collaborative is a partnership of Code for America, Living Cities, and the National Neighborhood Indicators Partnership and is supported by the John D. and Catherine T. MacArthur Foundation. The national organizations are working with seven communities around the country to understand how to harness the power of data and technology to increase efficiency, equity, and effectiveness in order to benefit the most vulnerable residents in our urban communities.*
