---
title: "Why Git Exists: From Source Code Chaos to the Git Mental Model"
description: "Understand why Git was created, how developers managed code before Git, the limitations of centralized version control, and the mental model behind Git repositories, staging, commits, branches, and remotes."
publishedDate: 2026-08-23
updatedDate: 2026-08-23
category: "tech"
tags:
  - "Git"
  - "Version Control"
  - "Software Development"
  - "Developer Tools"
  - "Git Internals"
  - "Source Control"
  - "Programming"
coverImage: "./cover.svg"
featured: true
draft: false
githubUrl: ""
demoUrl: ""
technologies:
  - "Git"
  - "GitHub"
---

# Why Git Exists: From Source Code Chaos to the Git Mental Model

Most developers first learn Git through commands:

```bash
git add .
git commit -m "changes"
git push
```

This works, but it creates a problem.

You can use Git every day without actually understanding what Git is doing.

Then, the moment something goes wrong, Git suddenly feels confusing:

- Why is my push rejected?
- What does HEAD mean?
- Did reset delete my code?
- Why do I need staging?
- Why does rebase change commit hashes?
- What exactly is origin/main?
- Why does Git say my branches have diverged?

The problem is not that Git is inherently complicated.

The problem is that Git is often taught backward.

Instead of starting with commands, we should start with the problem Git was designed to solve.

This article builds that foundation.

---

## The Problem Before Git

Imagine five developers working on the same application.

Developer A → Authentication
Developer B → Payments
Developer C → Dashboard
Developer D → Database
Developer E → Bug fixes

The project might look like this:

```
shopping-app/
├── frontend/
├── backend/
├── database/
└── config/
```

Now imagine there is no Git and no version-control system.

How do these developers share code?

One possible approach is copying the project.

```
shopping-app-v1.zip
shopping-app-v2.zip
shopping-app-final.zip
shopping-app-final-fixed.zip
shopping-app-final-fixed-new.zip
```

You can immediately see the problem.

Which one is actually the latest version?

And even if the team somehow agrees on the latest ZIP file, several bigger problems remain.

---

## Problem 1: Which Version Is Correct?

Suppose the team has these folders:

```
project-v1/
project-v2/
project-final/
project-final2/
project-final-working/
project-final-working-latest/
```

At some point nobody is completely sure which folder represents the real application.

This is fundamentally a history problem.

Developers need to know:

- What changed?
- Who changed it?
- When was it changed?
- Why was it changed?
- What did the application look like yesterday?
- Can we restore that version?

Copying folders does not solve this reliably.

---

## Problem 2: Multiple Developers Change the Same File

Suppose Developer A and Developer B both start with this code:

```python
def calculate_price():
    return 100
```

Developer A adds tax:

```python
def calculate_price():
    return 100 * 1.18
```

Developer B adds a discount:

```python
def calculate_price():
    return 90
```

Now both developers send their version of the file.

Which one should be used?

If Developer A’s file replaces Developer B’s file, the discount disappears.

If Developer B’s file replaces Developer A’s file, the tax disappears.

The actual result may need to be:

```python
def calculate_price():
    price = 90
    return price * 1.18
```

The team needs a way to combine independent changes.

This is one of the central problems version-control systems solve.

---

## Problem 3: Someone Breaks the Application

Imagine the application works perfectly on Monday.

On Tuesday someone changes twenty files.

Now production crashes.

Without version control, the team starts asking questions like:

Which file changed?
Who changed it?
What was the old code?
Which change caused the bug?
Can we restore yesterday's application?

Maybe someone remembered to create:

```
backup-monday.zip
```

Maybe they did not.

A proper version-control system records the development history so changes can be inspected and previous states can be recovered.

Conceptually:

```
Working Version
      |
      v
Change A
      |
      v
Change B
      |
      v
Broken Version
```

Instead of guessing, developers can investigate exactly what changed.

---

## Problem 4: Developers Need to Experiment

Imagine the current authentication system works.

A developer wants to replace it with a completely new approach.

That work may require changing:

- login.py
- auth.py
- users.py
- database.py
- config.py

The experiment could take several days.

You do not want incomplete authentication changes mixed with stable production work.

You need something conceptually like:

```
Stable Application
       |
       +----------------------+
       |                      |
       |                New Authentication
       |                      |
       |                More Development
       |                      |
       +------ combine when ready
```

This eventually leads us to one of Git’s most important concepts:

branches.

Branches allow separate lines of development to exist at the same time.

---

## What Is Version Control?

A Version Control System, commonly called a VCS, records changes to files over time.

Instead of manually creating:

```
project-v1
project-v2
project-v3
```

a version-control system maintains structured history.

Conceptually:

```
Version A
   |
   v
Version B
   |
   v
Version C
   |
   v
Version D
```

Each version can contain information such as:

- who made the change
- when the change happened
- what changed
- why the change was made

This gives developers important abilities:

- inspect previous versions
- compare changes
- recover old code
- collaborate with other developers
- experiment safely
- combine independent work
- understand how a project evolved

Version control is therefore much more than a backup system.

---

## Version Control vs Backup

A backup system may store:

- Monday backup
- Tuesday backup
- Wednesday backup

A version-control system stores something closer to:

- Initial application
- Add login feature
- Add user validation
- Fix authentication bug
- Add payment API
- Fix payment calculation

A backup answers:

What did my files look like before?

Version control answers:

How did this project evolve, who changed it, and why?

That difference becomes extremely important in team development.

---

## Before Git: Centralized Version Control

Before Git became dominant, systems such as CVS and Subversion (SVN) were widely used.

They used a centralized model.

The architecture looked roughly like this:

```
                   Central Server
                        |
              Full Project History
                        |
          +-------------+-------------+
          |             |             |
          v             v             v
      Developer A   Developer B   Developer C
```

The central server contained the authoritative repository.

Developers connected to it to retrieve code and submit changes.

---

## How Centralized Version Control Worked

Imagine the central repository contains:

```
Application Revision 100
```

Developer A gets a working copy.

Developer B gets another working copy.

                Central Repository
                  Revision 100
                   /       \
                  /         \
                 v           v
           Developer A   Developer B

Developer A modifies authentication.

Developer B modifies payments.

Eventually both developers send changes back to the central repository.

This was a huge improvement over passing ZIP files around.

It provided:

- shared history
- revision tracking
- collaboration
- change tracking
- recovery

But centralized systems introduced another architectural dependency.

---

## The Central Server Problem

In a centralized system, the server is extremely important.

                   CENTRAL SERVER
                         |
          +--------------+--------------+
          |              |              |
          v              v              v
        Dev A          Dev B          Dev C

If the server becomes unavailable, several operations may become unavailable as well.

There is also a strong dependency on network connectivity.

And historically, some centralized systems made branching and merging more cumbersome than modern Git workflows.

This becomes especially important for large distributed projects.

---

## The Linux Kernel Problem

The Linux kernel is one of the largest collaborative software projects in the world.

Its development involves:

- many developers
- many patches
- parallel development
- large amounts of history
- distributed contributors
- complex merging

For some time, Linux kernel development used a proprietary distributed version-control system called BitKeeper.

In 2005, that arrangement changed and the Linux community needed another solution.

Existing systems did not satisfy the requirements well enough.

Linus Torvalds, the creator of Linux, began creating Git.

---

## Why Git Was Created

Git was designed around several important goals.

It needed to be:

- fast
- distributed
- reliable
- good at merging
- good at branching
- capable of handling very large projects

One of its most important architectural choices was:

Every developer can have a complete repository.

This is the foundation of Git’s distributed architecture.

---

## Centralized vs Distributed Version Control

In a traditional centralized system:

                   Server
                Full History
                     |
          +----------+----------+
          |          |          |
          v          v          v
       Dev A      Dev B      Dev C
     Working     Working     Working
      Copy        Copy        Copy

With Git:

                     Remote
                 Full Repository
                  /     |     \
                 /      |      \
                v       v       v
             Dev A    Dev B    Dev C
              |        |        |
          Full Repo Full Repo Full Repo

A Git clone normally contains much more than the latest files.
It contains repository history and metadata required for many operations.

That is why Git can perform many tasks without contacting GitHub or another server.

---

## Git Does Not Need GitHub

This is one of the most important things beginners should understand.

Git and GitHub are not the same thing.

Git = Version-control system
GitHub = A platform built around Git

You can create a Git repository on your laptop and never connect it to GitHub.

You can still have:

- commits
- branches
- tags
- history
- merges

GitHub adds collaboration features such as:

- remote repository hosting
- pull requests
- code reviews
- issues
- CI/CD
- branch protection
- team permissions

Git works without GitHub.

GitHub uses Git.

---

## How Git Thinks About History

A common beginner mental model is:

```
file.py version 1
file.py version 2
file.py version 3
```

Git is better understood as storing project snapshots.

Imagine this project:

```
my-app/
├── app.py
├── auth.py
└── config.py
```

At one moment the project looks like:

Snapshot A
app.py
auth.py
config.py

Later auth.py changes:

Snapshot B
app.py
auth.py changed
config.py

Later app.py changes:

Snapshot C
app.py changed
auth.py
config.py

Conceptually:

Snapshot A
|
v
Snapshot B
|
v
Snapshot C

In Git, these snapshots are represented through commits and Git objects.

We will go deeper into blobs, trees, commits, refs, and hashes later.

---

## Git History Is a Graph

A very simple Git history may look like:

A---B---C---D

Each letter represents a commit.

But real development often contains multiple lines of work.

For example:

A---B---C main
\
 D---E feature

Here the feature branch started from commit B.

Later the histories may be combined:

A---B---C------F
\ /
D---E---

Git is therefore better understood as managing a graph of commits.

That mental model will eventually make commands such as merge, rebase, reset, and cherry-pick much easier to understand.

---

## Why Git Branches Are Lightweight

Imagine this history:

A---B---C

And main currently points to C.

Conceptually:

A---B---C
↑
main

A branch in Git is not another complete copy of the project.

At a high level, it is essentially a name that points to a commit.

If you create a feature branch:

A---B---C
↑
main
↑
feature/login

Both names initially point to the same commit.

Now you create a new commit on the feature branch:

A---B---C---D
↑ ↑
main feature/login

Only the branch reference moved.

This is why Git branches are extremely lightweight.
We will examine this internally later.

---

## Git’s Core Mental Model

Now we can move toward the most useful beginner mental model.

When working with Git, think about four major areas:

Working Directory
↓
Staging Area
↓
Local Repository
↓
Remote Repository

Let’s understand each one.

---

### 1. Working Directory

The working directory is the project you are actively editing.

Example:

my-app/
├── app.py
├── auth.py
└── config.py

You open auth.py in VS Code and modify it.

That change currently exists in your working directory.

Git can detect that the file differs from the previously recorded version.

Think:

Working Directory = What I am currently editing

---

### 2. Staging Area

The staging area is also called the index.

It sits between your working files and the next commit.

Conceptually:

Working Directory
app.py modified
auth.py modified
config.py modified
↓
Staging Area
app.py
auth.py

Here you are saying:

My next commit should contain the changes from app.py and auth.py, but not config.py.

This is why Git has a staging area.
It lets you construct the next commit intentionally.

Think:

Working Directory = Everything I changed
Staging Area = What I want in the next commit

---

### 3. Local Repository

When a commit is created, Git records the staged snapshot in your local repository.

This repository lives inside the hidden:

.git/

Conceptually:

Working Directory
↓
staging
↓
Local Repository

Your local repository contains things such as:

- objects
- commits
- branches
- references
- tags
- configuration
- HEAD

This is why creating a commit does not require GitHub.
The commit is first stored locally.

---

### 4. Remote Repository

A remote repository is another Git repository located somewhere else.

It might live on:

- GitHub
- GitLab
- Bitbucket
- your company's Git server
- another machine

Conceptually:

Your Computer
Working Directory
↓
Staging Area
↓
Local Repository
|
|
v
Remote Repository

Your local repository and remote repository are separate.

This distinction explains an extremely important fact:

Creating a commit and uploading a commit are two different operations.

A commit exists locally first.
Later it can be transferred to another repository.

---

## The Complete Mental Model

Here is the model you should keep in your head:

+----------------------+
| Working Directory |
| |
| Files you edit |
+----------+-----------+
|
| select changes
v
+----------------------+
| Staging Area |
| / Index |
| |
| Next commit content |
+----------+-----------+
|
| create snapshot
v
+----------------------+
| Local Repository |
| |
| commits / branches |
| history / objects |
+----------+-----------+
|
| exchange commits
v
+----------------------+
| Remote Repository |
| |
| GitHub / GitLab etc. |
+----------------------+

Most everyday Git commands can eventually be understood as moving information between, or manipulating state inside, these areas.

---

## What Is .git?

When a folder becomes a Git repository, Git creates a hidden directory:

.git/

Your application may look like:

my-app/
├── .git/
├── app.py
├── auth.py
└── config.py

The .git directory is the repository database.

A simplified view looks like:

.git/
├── HEAD
├── config
├── index
├── objects/
└── refs/

These pieces have different jobs.

For example:

objects/ stores Git objects.

refs/ stores references such as branches and tags.

HEAD tracks what you currently have checked out.

index represents the staging area.

If you delete .git, your files may remain, but Git history and repository metadata are gone from that folder.

---

## What Is a Commit?

A commit is often described as:

> A saved version of your project.

That is useful, but we can be more precise.

A Git commit conceptually contains information about:

- project snapshot
- parent commit
- author
- timestamp
- commit message

Imagine:

Commit C
Snapshot → current project state
Parent → Commit B
Author → Developer
Message → "Add authentication"

And Commit B points to Commit A.

A ← B ← C

This relationship forms the history.

---

## What Is HEAD?

HEAD answers a simple question:

Where am I currently positioned in Git?

Usually HEAD refers to the currently checked-out branch.

For example:

A---B---C
↑
main
↑
HEAD

Conceptually:

HEAD → main → C

If you switch to a feature branch:

A---B---C main
\
 D---E feature
↑
HEAD

Now:

HEAD → feature → E

Understanding HEAD later becomes essential for understanding:

- reset
- checkout
- switch
- rebase
- detached HEAD

---

## What Is a Commit Hash?

Each Git object is identified using a cryptographic hash.

A commit identifier may look like:

6dcb09b5b57875f334f61aebed695e4e4a64d338

You usually see a shortened form:

6dcb09b

This identifier allows Git to refer precisely to a particular commit.

Instead of saying:

The version from around Tuesday afternoon.

Git can identify:

6dcb09b

exactly.

Hashes also contribute to Git’s integrity model because objects are identified based on their content.

---

## Branches, Commits, and HEAD Together

Consider:

A---B---C
↑
main
↑
HEAD

Now a new commit D is created.

Git creates:

A---B---C---D
↑
main
↑
HEAD

The important observation is:

The branch moved.

The older commits did not move.

A branch is essentially a movable reference through the commit graph.

This is one of the most useful Git mental models you can learn.

---

## Local and Remote Are Separate Histories

Imagine your computer has:

A---B---C---D
↑
main

But the remote repository only has:

A---B---C
↑
origin/main

Your local Git can represent both facts.

Conceptually:

A---B---C---D
↑ ↑
origin/main main

This means:

`main` points to your local branch.

While:

`origin/main` represents Git’s locally stored knowledge of the remote main branch.

That distinction will become extremely important when we later study fetch, pull, and push.

---

## What Is origin?

`origin` is not a special Git server.

It is simply the conventional default name Git gives to the remote repository you cloned from.

Conceptually:

origin
|
v
https://some-git-server/my-project.git

You could technically rename it:

- company-server
- github
- production

But `origin` is the standard convention.

So:

`origin/main` roughly means:

My local record of the main branch from the remote named origin.

---

## The Most Important Mental Shift

Do not think of Git as a list of commands.

Think of Git as a system managing:

- project snapshots
- commit relationships
- references
- branches
- local history
- remote history

And think of commands as operations on that model.

Eventually:

- `add` will mean: Update the index with content I want in the next snapshot.
- `commit` will mean: Create a new commit object representing the staged snapshot and move the current branch reference.
- `branch` will mean: Create another reference pointing to a commit.
- `switch` will mean: Move HEAD to another branch and update the working tree accordingly.
- `merge` will mean: Combine commit histories.
- `rebase` will mean: Recreate commits on a different base.

That is where Git starts becoming predictable.

---

## The Mental Model So Far

Keep this diagram:

                         Remote Repository
                              GitHub
                                 ↑
                                 |
                         exchange commits
                                 |
                                 |
                         Local Repository
                      commits / history / refs
                                 ↑
                                 |
                         create snapshot
                                 |
                                 |
                          Staging Area
                             / Index
                                 ↑
                                 |
                         select changes
                                 |
                                 |
                         Working Directory
                         files you edit

And inside the repository:

A---B---C---D
↑ ↑
origin/main main
↑
HEAD

This diagram explains a surprising amount of Git.

---

## Final Takeaway

Git exists because software development needs more than file storage.

Developers need to:

- track history
- work independently
- combine changes
- experiment safely
- understand who changed what
- recover from mistakes
- collaborate across machines

Older centralized systems solved many of these problems, but Git introduced a fast distributed model designed around local repositories, lightweight branching, and a graph of project snapshots.

The most useful way to think about Git is not:

```
git add
git commit
git push
```

It is:

```
Working Directory
        ↓
Staging Area
        ↓
Local Repository
        ↓
Remote Repository
```

And inside the local repository:

```
commits
   +
branches
   +
refs
   +
HEAD
   +
objects
```

Once this mental model is clear, Git commands stop feeling random.

They become operations on a system you understand.

---

## What Comes Next?

In the next article, we can go one level deeper into:

- How Git Actually Stores Data Internally

We can explore:

- blobs
- trees
- commit objects
- refs
- HEAD
- SHA hashes
- .git/objects
- .git/index

and then see what actually happens internally when we eventually run:

```bash
git add
git commit
git switch
```

That is where the internal architecture of Git starts to become really interesting.
