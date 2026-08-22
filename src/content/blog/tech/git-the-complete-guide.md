---
title: "Git: From Why It Exists to Mental Models — A Complete Developer Guide"
description: "Everything you need to understand Git — not just the commands, but the thinking behind them. From Linus Torvalds' frustration in 2005 to the three-state model that powers your daily workflow."
publishedDate: 2026-08-23
updatedDate: 2026-08-23
category: "tech"
tags:
  - "Git"
  - "Version Control"
  - "DevTools"
  - "Open Source"
  - "Terminal"
  - "Developer Workflow"
  - "Beginner"
  - "Linux"
coverImage: "./cover.svg"
featured: true
draft: false
githubUrl: ""
demoUrl: ""
technologies:
  - "Git"
  - "GitHub"
  - "Bash"
  - "Terminal"
---

# Git: From Why It Exists to Mental Models

> *"Git was born out of frustration."*

If you've ever used Git without really understanding what it's doing — or why it exists at all — this post is for you. We'll start from the very beginning: what the world looked like before Git, the frustration that created it, and the core mental models that make every command click.

---

## The World Before Git

Imagine you're writing code with 5 teammates. How do you share it?

**Option A: The USB Drive / Email Method**

```
project_v1.zip
project_v2_FINAL.zip
project_v2_FINAL_new.zip
project_v2_FINAL_new_ACTUALLY_FINAL.zip
project_v2_FINAL_new_ACTUALLY_FINAL_johns_edits.zip
```

Sound familiar? This is **Folder Versioning** — a chaos of filenames standing in for a real system. The problems are obvious once you've lived them:

- Who changed what? When? Why?
- Two people edit the same file → one overwrites the other
- Something broke last week — how do you get back to before the break?
- Which copy is "the real one"?

**Option B: Centralized Tools (CVS, SVN)**

By the 90s and early 2000s, tools like **CVS** (1990) and **Subversion / SVN** (2000) came along. They were better — they tracked changes and let multiple people collaborate. But they had one fatal flaw: **everything lived on a single central server**.

```
Developer A ──┐
Developer B ──┼──► [ CENTRAL SERVER ] ◄── All history lives here
Developer C ──┘
```

If that server went down: no one could work. No internet connection: you couldn't even *see* history. One corrupted disk: years of work gone.

---

## Why Linus Torvalds Built Git in 2 Weeks

In 2005, the **Linux kernel** project — one of the largest collaborative software efforts in the world — was using a proprietary tool called **BitKeeper** for free. Then BitKeeper **revoked the free license**.

**Linus Torvalds**, creator of the Linux kernel, had a simple response: *"Fine. I'll build something better."*

In roughly **two weeks**, he wrote the first version of Git. He designed it around four non-negotiable goals:

| Goal | Why It Mattered |
|------|----------------|
| ⚡ **Speed** | The Linux kernel has millions of files |
| 🔒 **Data Integrity** | Code corruption is unacceptable |
| 🌿 **Cheap Branching** | Parallel development must be effortless |
| 🌐 **Distributed** | No single server should be a point of failure |

That last goal is what sets Git apart from everything that came before.

---

## Mental Model 1: Distributed vs. Centralized

This is the idea that changes everything.

**Centralized (SVN):** One server holds all history. Everyone else is a client that reads from it.

**Distributed (Git):** Every developer's machine holds the *complete* history — every commit, every branch, every change since the beginning of the project.

```
SVN:
Dev A ──┐
Dev B ──┼──► [ ONE SERVER ] — dies → everyone is stuck
Dev C ──┘

Git:
[ Dev A: FULL HISTORY ] ◄──────────► [ Dev B: FULL HISTORY ]
                              ▲
                              │
                    [ Dev C: FULL HISTORY ]
```

**The implication:** If GitHub disappeared tomorrow, every developer who has ever cloned that repository still has a complete backup. There is no single point of failure.

---

## Mental Model 2: Git is a Time Machine for Code

Git doesn't track *files* — it tracks **snapshots of your entire project** at moments you choose.

```
[Snapshot 1]  ──►  [Snapshot 2]  ──►  [Snapshot 3]  ──►  [Snapshot 4]
 "First file"       "Add login"        "Fix the bug"       "Dark mode"
```

Every snapshot is a **commit**. Each one is permanent, immutable, and reachable forever. You can always go back. You can always compare. Nothing is ever truly lost.

---

## Mental Model 3: The Three States

This is the most important thing to understand about how Git works day-to-day. Every file in your project lives in one of **three areas**:

```
┌──────────────────────────────────────────────────────────────────┐
│  Working Directory    →  Staging Area (Index)  →   Repository   │
│                                                                  │
│  Your desk               A packing box            The warehouse  │
│  (messy, in-progress)    (carefully selected)     (sealed, done) │
│                                                                  │
│       git add ──────────────►          git commit ─────────────► │
└──────────────────────────────────────────────────────────────────┘
```

- **Working Directory** — Your actual files as you edit them. Messy, incomplete, in progress.
- **Staging Area** — A holding zone where you carefully choose *what* goes into the next snapshot.
- **Repository** — The permanent, unchangeable history of your project.

**Why does staging exist?** Imagine you fixed two bugs today. Without staging, you'd commit both at once. With staging, you can commit Bug Fix #1 as its own snapshot (`"Fix login crash"`), then Bug Fix #2 as another (`"Fix email validation"`). Clean, precise, meaningful history.

---

## Mental Model 4: Branches Are Parallel Timelines

A **branch** is just a named pointer to a commit. Creating one costs almost nothing.

```
main:     A ──── B ──── C ─────────────────── G
                         \                   /
feature/dark-mode:        D ──── E ──── F ──
```

You experiment on `feature/dark-mode` without ever touching `main`. When you're done, you **merge** the timelines back together. If the experiment fails, you delete the branch — `main` was never touched.

---

## Core Commands, Explained

### Starting Out

```bash
# Turn any folder into a Git repository
git init

# Download an existing project (and its full history)
git clone https://github.com/username/repo.git
```

### The Daily Loop

```bash
# Your compass — check this constantly
git status

# Move changes to the staging area
git add index.html          # specific file
git add .                   # everything in current folder

# Save the snapshot permanently
git commit -m "feat: Add dark mode toggle"

# See your project's history
git log --oneline --graph --all
```

### Branching

```bash
# Create and switch to a new branch (modern syntax)
git switch -c feature/login

# Merge a branch into your current branch
git switch main
git merge feature/login

# Delete after merging
git branch -d feature/login
```

### Working with Remotes (GitHub)

```bash
# Upload your commits
git push

# Download your team's latest commits and merge them
git pull

# Download without merging (safe — just look)
git fetch origin
```

### Undoing Mistakes

```bash
# Discard edits in a file (not yet staged)
git restore index.html

# Unstage a file (move it back to working directory)
git restore --staged index.html

# Undo your last commit but keep the changes
git reset --soft HEAD~1

# Safely undo a past commit on a shared branch
git revert a3f2c1d
```

### The Emergency Drawer: Stash

```bash
# You're mid-feature when something urgent comes up
git stash push -m "WIP: half-done login form"

# Switch to fix the urgent thing...
git switch main
git switch -c hotfix/payment-bug
# ... fix and commit ...

# Come back and restore your work
git switch feature/login
git stash pop
```

---

## A Good Commit Message

```
feat: Add user login with Google OAuth

- Integrate Google OAuth2 provider
- Store session tokens in HTTP-only cookie
- Add /login and /callback routes

Closes #42
```

**Format:** `type: Short summary (50 chars max)` + blank line + detail

| Type | When to use |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `refactor` | Code change, no behavior change |
| `test` | Adding tests |
| `chore` | Build process, tooling |

---

## The .gitignore File

Before your first commit, create a `.gitignore` in your project root. It tells Git which files to **never track**:

```gitignore
# Dependencies
node_modules/

# Secrets — never commit these!
.env
.env.local

# Build output
dist/
build/
*.pyc

# OS files
.DS_Store
Thumbs.db

# IDE files
.vscode/
.idea/
```

---

## A Real Workflow (Start to Finish)

```bash
# Morning: get your team's latest work
git pull origin main

# Start your task on its own branch
git switch -c feature/user-profile

# ... code throughout the day ...

# Save progress in logical chunks
git add avatar-upload.js
git commit -m "feat: Add profile picture upload"

git add .
git commit -m "fix: Validate image file type and size"

# Before sharing: sync with whatever main has now
git fetch origin
git rebase origin/main

# Push and open a Pull Request
git push -u origin feature/user-profile
```

---

## Quick Reference

| Command | What It Does |
|---------|-------------|
| `git init` | Start a new repository |
| `git clone <url>` | Download an existing repo |
| `git status` | See the state of all files |
| `git add <file>` | Stage a file for the next commit |
| `git commit -m "..."` | Save the staged snapshot |
| `git log --oneline` | See compact history |
| `git diff` | See exact line-by-line changes |
| `git switch -c <name>` | Create and switch to a new branch |
| `git merge <branch>` | Merge a branch into the current one |
| `git pull` | Fetch + merge from remote |
| `git push` | Upload commits to remote |
| `git stash` | Temporarily shelve uncommitted work |
| `git restore <file>` | Undo edits in working directory |
| `git reset HEAD~1` | Undo last commit, keep changes |
| `git revert <hash>` | Safely undo a commit on shared branches |

---

## Where to Go Next

**Week 1** — Core loop: `init → add → commit → log → status → diff`

**Week 2** — Branching: `branch → switch → merge → stash`

**Week 3** — Remote: `clone → push → pull → fetch`

**Week 4** — Undoing: `restore → reset → revert → cherry-pick`

**Week 5+** — Advanced: `rebase → bisect → tag → blame`

---

## Try It Right Now

```bash
mkdir git-practice && cd git-practice
git init

echo "Hello Git!" > readme.txt
git add readme.txt
git commit -m "feat: Add readme"

echo "Learning Git is fun!" >> readme.txt
git diff
git add readme.txt
git commit -m "docs: Add learning note"

git switch -c feature/about
echo "I am learning Git" > about.txt
git add . && git commit -m "feat: Add about file"

git switch main
git merge feature/about

git log --oneline --graph --all
```

That's a complete Git workflow — branch, work, merge, history — in under 30 seconds. Everything else is just these ideas applied at scale.

---

*Git is less about memorizing commands and more about internalizing three ideas: every commit is a permanent snapshot, the staging area gives you control over what goes in each snapshot, and branches let you explore without risk. Once those click, the rest follows naturally.*
