---
layout: clean
title: Git Workflow
---


# Practical Git Checklist for First Time Git Team Members
If you're just getting into Git, it  can be confusing. This is a step-by-step checklist that can be used by a new person to know exactly what commands they need to type to use Git during a normal coding session. Follow this from when you sit down to code and just want to start on some new work, using your team mates most recent code as your starting point. This assumes you are using a branching model where every person works only on their own branches (i.e. 2 people never edit the same branch), and then merge their changes into a single central branch via pull requests.

**Triangular Workflow Note**: If you are using a triangular workflow (you pull from one Github repository to get the latest changes, but you push to a different copy i.e. your fork) note the slightly different command in the step for getting the latest changes. 

**Central Branch Note**: This workflow assumes 'dev' is the main branch to work off of. If your team uses a different central branch (e.g. master) substitute that branch name.  

--------------------------------------------------------------------


1. **Are you in your project folder?**
   a. Yes (e.g. `C:\Users\Documents\MyCoolRepo>`) --> go to 2.
   b. No (e.g. `C:\Users\Documents>`) --> use `cd ..`or `cd my\path` until your command line shows you are in the main project folder.
2. Always start by making sure you know about the latest changes: `git fetch --all`
3. Make sure you're starting from a clean slate on your local repository: <br/>Type `git status`<br/>
    **Do you have any modified files?**
    
    1. Yes (your command line output will have files listed under the section "Changes not staged for commit:")
        1. **Do you want to keep them?**
            * Yes --> What branch are you on? (your command line output will say "On branch my-branch-name" on the first line)
                1. A branch I own (e.g. my-feature-branch, a branch that you created in the past and you know no one else is working on directly) -->
                    * type `git add -A` to stage all your files
                    * `git commit` to make a new commit on your current branch
                2. A shared branch (e.g. dev) --> make a new branch to save your changes.
                    * Type `git branch useful-branch-name`
                    * `git checkout useful-branch-name`
                    * Proceed with your commit on the new branch using `git add -A` to stage files
                    * `git commit` to make a commit on your new branch.
                    * `git checkout dev`
            * No -->
                * `git reset --hard` **Warning** this deletes the changes you've made to the current files. Only do it if you actually want to throw away your changes (i.e. if you broke something).  Everything that's been committed is still accessible.
                * `git clean` **Warning** This one deletes any new files that have been created. Reset only deals with files that were edited/removed, clean only deals with files that were added. 
    
    2. No (your command line output will say "nothing to commit, working tree clean")
        * What branch are you on? (your command line output will say "On branch my-branch-name" on the first line)
            * The shared branch (e.g. `dev`) --> all good!
            * My feature branch (e.g. `cool-branch`) --> `git checkout dev`

4. Double check your work -> `git status` should return the result "On branch dev", and "nothing to commit, working tree clean". If not, try above steps again.
5. Add the latest changes from the remote repository (i.e. Github) into the copy of the `dev` branch on your computer. 

    a. Triangular workflow: `git pull nameoftheremote dev`

    b. Single-repo workflow: `git pull origin dev`

6. Get ready to do your work: make a new branch starting from the most recent copy
    * Type `git branch my-branch-name`
    * `git checkout my-branch-name`
7. Double check your work -> `git status` should reveal "On branch my-branch-name" and "nothing to commit, working tree clean". You're ready to start working!
8. -----Do some coding-----
9. Save you work -->
    * Double check - `git status` should reveal "On branch my-branch-name" and a list of all the files you've edited.
    * `git add -A`
    * `git commit -m "very descriptive text that tells what changes I made to the code"` (if you forget the commit message and get stuck in the weird VIM editor a) [here's how to get out](http://stackoverflow.com/questions/9171356/how-do-i-exit-from-the-text-window-in-git) and better yet b) [configure your git](https://help.github.com/articles/associating-text-editors-with-git/) to use a better text editor.
    * `git push -u origin my-branch-name` ([read about -u](http://stackoverflow.com/questions/6089294/why-do-i-need-to-do-set-upstream-all-the-time))

10. Go to Github.com, go to the repository's main page and go to the Pull Requests tab (in a triangular workflow this should be the main copy, not your fork). To ask your team mates to add your new changes to the central branch (e.g. `dev`), you can make a new pull request to do so.
