# 🧠 Git + GitHub Full Workflow Cheat Sheet (with Descriptions)

## 🔹 1. Set Git Identity (Only Once Per System)
```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```
✅ Sets your name and email for all future commits on your system.

---

## 🔹 2. Create Git Repository in Project Folder
```bash
cd your-project-folder     # Navigate to your project folder
git init                   # Initialize git repository in that folder
```
✅ Makes the folder a Git repo (adds `.git` hidden folder).

---

## 🔹 3. Track and Commit Your Code
```bash
git add .                          # Stage all files
git commit -m "Initial commit"     # Commit with a message
```
✅ Prepares your code and saves a snapshot in Git history.

---

## 🔹 4. Create GitHub Repository
- Go to https://github.com → Click **New**
- Name your repo (e.g., `my-project`)
- Leave “Initialize with README” **unchecked**

---

## 🔹 5. Link Local Git to GitHub Repo
```bash
git remote add origin https://github.com/username/my-project.git
git branch -M main
git push -u origin main
```
✅ Connects your local project to GitHub and pushes it.

---

## 🔹 6. Pull If Remote Has Extra Files (e.g., README)
```bash
git pull --rebase origin main
git push
```
✅ Fixes error if GitHub already has files you don’t have locally.

---

## 🔹 7. Check Git Status
```bash
git status
```
✅ Shows file changes, new/modified/staged status.

---

## 🔹 8. Push Changes After Code Update
```bash
git add .
git commit -m "Describe the change"
git push
```
✅ Use this flow every time you edit your code.

---

## 🔹 9. View Commit History (Optional)
```bash
git log
```
✅ See all commits with messages and timestamps.

---

## 🔹 10. Clone an Existing GitHub Repo
```bash
git clone https://github.com/username/repo-name.git
```
✅ Use this if you want to download and start working on a GitHub repo.

---

✅ Save and reuse this cheat sheet for all your projects!
