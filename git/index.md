---
layout: clean
title: Git

---



### Configure multiple remotes

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

{% endhighlight %}



### Navigation - use these any time you want to see where in .git you are!
{% highlight shell %}
#Where am I? Do I have uncommitted changes? Where should I go?
> git status
> git log --pretty=oneline --graph --decorate --all

#Lists all the branches, including remote branches. Without -a it only lists branches on your computer
> git branch -a



{% endhighlight %}




{% highlight shell %}
#Get remote changes to the branch you currently have checked out. --ff-only provides a 'safe' option that will error out if there is a more complicated history.
git fetch 

git pull <external-repo-name> --ff-only       #<external-repo> will usually be 'origin' in a team repo workflow, or something like 'upstream' in a triangular workflow




{% endhighlight %}
