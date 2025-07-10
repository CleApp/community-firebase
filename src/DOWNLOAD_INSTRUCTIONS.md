# How to Download Your Project Code

This guide will walk you through the standard process of getting your project code from this web-based IDE to your local computer using Git and GitHub.

## Prerequisites

1.  **Git Installed:** You need Git installed on your local computer. If you don't have it, you can download it from [git-scm.com](https://git-scm.com/).
2.  **GitHub Account:** You need a free account on [GitHub](https://github.com/).

---

## Step 1: Create a New Repository on GitHub

1.  Go to [GitHub](https://github.com/) and log in.
2.  Click the **+** icon in the top-right corner and select **"New repository"**.
3.  Give your repository a name (e.g., `community-connect-app`).
4.  You can leave it as a "Public" repository for now.
5.  **Important:** Do **NOT** initialize the repository with a README, .gitignore, or license file. You want it to be completely empty.
6.  Click **"Create repository"**.

---

## Step 2: Push Your Code to the New GitHub Repository

After creating the repository, GitHub will show you a page with instructions. We will use the commands listed under **"...or push an existing repository from the command line"**.

You will need to run these commands in the terminal within this online IDE. If there isn't a visible terminal, you may need to open one through the IDE's menu (e.g., "View > Terminal" or similar).

**Copy and paste these commands into the terminal one by one:**

*First, replace `YOUR_GITHUB_USERNAME` and `YOUR_REPOSITORY_NAME` with your actual GitHub username and the repository name you just created.*

```bash
# Initialize a new Git repository in your project
git init

# Add all your project files to be tracked by Git
git add .

# Create the first commit (a snapshot of your code)
git commit -m "Initial commit from Firebase Studio"

# Set the main branch name (a standard practice)
git branch -M main

# Connect your project to the remote GitHub repository
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git

# Push your code to GitHub
git push -u origin main
```

---

## Step 3: Download (Clone) the Repository to Your Local Computer

Now that your code is on GitHub, you can download it to your local machine.

1.  Open a terminal or command prompt on your **local computer**.
2.  Navigate to the directory where you want to store your project (e.g., `cd Documents/Projects`).
3.  Run the `git clone` command, again replacing the URL with your repository's URL:

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME.git
```

4.  This will create a new folder with your project's name, containing all your code. You can now open this folder in your favorite code editor (like VS Code) and continue working on it locally!
