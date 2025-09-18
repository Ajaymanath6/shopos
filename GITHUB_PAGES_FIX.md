# GitHub Pages 404 Fix - Complete Solution

## The Problem
Getting "404 - There isn't a GitHub Pages site here" means GitHub Pages is not properly configured or the deployment is failing.

## Step-by-Step Fix

### 1. Check Repository Settings
Go to your GitHub repository → Settings → Pages:
- **Source**: Must be set to "GitHub Actions" (NOT "Deploy from a branch")
- **Custom domain**: Should be empty unless you have one
- **Enforce HTTPS**: Should be checked

### 2. Check Actions Permissions
Go to Settings → Actions → General:
- **Actions permissions**: Allow all actions and reusable workflows
- **Workflow permissions**: Read and write permissions
- **Allow GitHub Actions to create and approve pull requests**: Checked

### 3. Verify Workflow File
The workflow file `.github/workflows/deploy.yml` should be exactly as provided.

### 4. Check Build Process
Run locally to ensure it builds:
```bash
npm run build
npm run preview
```

### 5. Manual Deployment Test
If the above doesn't work, try this alternative workflow:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 6. Force Redeploy
1. Go to Actions tab in your repository
2. Click on the latest workflow run
3. Click "Re-run all jobs"

### 7. Alternative: Enable Pages First
If nothing works, try this:
1. Go to Settings → Pages
2. Temporarily set Source to "Deploy from a branch"
3. Select "main" branch and "/ (root)" folder
4. Save
5. Wait 5 minutes
6. Change back to "GitHub Actions"
7. Push a new commit to trigger deployment

## Common Issues and Solutions

### Issue 1: Workflow not running
- Check if `.github/workflows/deploy.yml` exists in the main branch
- Verify the file has correct YAML syntax
- Check Actions permissions

### Issue 2: Build fails
- Check if `npm run build` works locally
- Verify all dependencies are in package.json
- Check for TypeScript errors

### Issue 3: 404 after successful deployment
- Verify `base` in vite.config.ts matches repository name
- Check `basename` in main.tsx matches repository name
- Ensure 404.html exists in public folder

### Issue 4: Repository name mismatch
If your repository is NOT named "shopos", update:
1. `vite.config.ts`: Change `repoBase = '/your-repo-name/'`
2. `src/main.tsx`: Change `basename = '/your-repo-name'`

## Verification Steps
1. Check https://github.com/YOUR_USERNAME/shopos/actions for successful deployment
2. Visit https://YOUR_USERNAME.github.io/shopos/
3. Test navigation to https://YOUR_USERNAME.github.io/shopos/ai-shopping

## If Still Not Working
1. Delete the repository
2. Create a new one with the same name
3. Push the code again
4. Follow steps 1-7 above

The issue is almost always in the repository settings or Actions permissions.
