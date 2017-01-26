---
layout: home
title: Git
---



# Configure multiple remotes

{% highlight shell %}
#Clone the repo from your fork, and then navigate to it
C:\> git clone https://github.com/YOUR-USER-NAME/git-playground.git
C:\> cd git-playground

# Add the original repo
C:\git-playground> git remote add custom-name https://github.com/NealHumphrey/git-playground.git

# View your remotes:
> git remote
  custom-name-for-fork
  custom-name-for-source-repo

# assuming you cloned from your fork (instead of cloning from the original)
> git remote rename origin custom-name-for-fork-repo
> git remote
  custom-name-for-fork-repo
  custom-name-for-source-repo

# Someone else's fork you also want to keep track of?
> git remote add bobs-remote https://github.com/bobs/repo/path
> git remote
  custom-name-for-fork-repo
  custom-name-for-source-repo
  bobs-remote

{% endhighlight %}




{% highlight shell %}
#How to know where you are and what's available
> git status
> git log --pretty=oneline --graph --decorate --all

#Lists all the branches, including remote branches. Without -a it only lists branches on your computer
> git branch -a


{% endhighlight %}




{% highlight shell %}
#Get remote changes to the branch you currently have checked out. --ff-only provides a 'safe' option that will error out if there is a more complicated history.
git pull --ff-only




{% endhighlight %}
