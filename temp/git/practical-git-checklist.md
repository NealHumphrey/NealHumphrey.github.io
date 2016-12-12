---
layout: home
title: Git Workflow
---


# Practical Git Checklist for First Time Git Team Members
If you're just getting into Git, it  can be confusing. This is a step-by-step checklist that can be used by a new person to know exactly what commands they need to type to use Git during a normal coding session. Follow this from when you sit down to code and just want to start on some new work, using your team mates most recent code as your starting point. This assumes you are using a branching model where every person works only on their own branches (i.e. 2 people never edit the same branch), and then merge their changes into a single central branch via pull requests.

1. **Are you in your project folder?**
   a. Yes (e.g. `C:\Users\Documents\MyCoolRepo>`) --> go to 2.
   b. No (e.g. `C:\Users\Documents>`) --> use `cd ..`or `cd my\path` until your command line shows you are in the main project folder.
2. Type `git status`<br/>
    **Do you have any modified files?**
    1. Yes (your command line output will have files listed under the section "Changes not staged for commit:")
        1. **Do you want to keep them?**
            * Yes --> What branch are you on? (your command line output will say "On branch my-branch-name" on the first line)
                1. A branch I own (e.g. my-feature-branch, a branch that you created in the past and you know no one else is working on directly) -->
                    * type `git add -A` to stage all your files
                    * `git commit` to make a new commit on your current branch
                2. A shared branch (e.g. dev or master) --> make a new branch to save your changes.
                    * Type `git branch useful-branch-name`
                    * `git checkout useful-branch-name`
                    * Proceed with your commit on the new branch using `git add -A` to stage files
                    * `git commit` to make a commit on your new branch.
                    * `git checkout master` (or `git checkout dev`, depending on your team)
            * No -->
                * `git reset --hard` **Warning** this deletes the changes you've made to the files. Only do it if you actually want to throw away your changes (i.e. if you broke something).  Everything that's been committed is still accessible.
    2. No (your command line output will say "nothing to commit, working tree clean")
        * What branch are you on? (your command line output will say "On branch my-branch-name" on the first line)
            * The shared branch (e.g. `master`) --> all good!
            * My feature branch (e.g. `cool-branch`) --> `git checkout master` (or `git checkout dev`, depending on your team)
3. Double check your work -> `git status` should reveal "On branch master" or "On branch dev", and "nothing to commit, working tree clean". If not, try above steps again.
4. `git fetch origin master` or `git fetch origin dev` to get the latest changes from Github.
5. `git merge origin\master` or `git merge origin\dev` - make your local copy of master match Github's copy
6. Get ready to do your work: make a new branch starting from the most recent copy
    * Type `git branch my-branch-name`
    * `git checkout my-branch-name`
7. Double check your work -> `git status` should reveal "On branch my-branch-name" and "nothing to commit, working tree clean". You're ready to start working!
8. -----Do some coding-----
9. Save you work -->
    * Double check - `git status` should reveal "On branch my-branch-name" and a list of all the files you've edited.
    * `git add -A`
    * `git commit`
    * `git push -u origin my-branch-name`

10. Go to Github.com and go to Pull Requests. To ask your team mates to add your new changes to the central branch (`dev` or `master`), you can make a new pull request to do so.
