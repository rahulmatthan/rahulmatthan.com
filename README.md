# Rahul Matthan's Website

Personal website built with Hugo, featuring Ex Machina articles, podcasts, talks, and other writing.

## Setup for GitHub Pages

### 1. Create GitHub Repository

1. Go to GitHub and create a new repository named `rahulmatthan-site` (or any name)
2. Make it **public** (required for free GitHub Pages)
3. **Don't** initialize with README (we already have files)

### 2. Push to GitHub using GitHub Desktop

1. Open **GitHub Desktop**
2. File → Add Local Repository
3. Choose this folder: `/Users/rahul/Hugo/rahul-site/mysite`
4. Click "Publish repository"
5. Select your GitHub account
6. Make sure "Keep this code private" is **unchecked**
7. Click "Publish Repository"

### 3. Enable GitHub Pages

1. Go to your repository on GitHub.com
2. Click **Settings** → **Pages** (in left sidebar)
3. Under "Source", select: **GitHub Actions**
4. That's it! GitHub will automatically build and deploy

### 4. Configure Custom Domain (rahulmatthan.com)

#### On GitHub:
1. Still in Settings → Pages
2. Under "Custom domain", enter: `rahulmatthan.com`
3. Click "Save"
4. Check "Enforce HTTPS" (after DNS is configured)

#### On Your Domain Registrar:
Configure these DNS records:

**A Records** (point to GitHub's servers):
```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

**CNAME Record** (for www subdomain):
```
Type: CNAME
Name: www
Value: <your-github-username>.github.io
```

DNS changes can take up to 24 hours to propagate.

### 5. Daily Workflow

After running your Python script to update Hugo files:

1. Open **GitHub Desktop**
2. Review the changes shown
3. Write a commit message (e.g., "Add new article")
4. Click **"Commit to main"**
5. Click **"Push origin"**
6. GitHub automatically builds and deploys in 1-2 minutes

## Local Development

Preview the site locally:
```bash
cd /Users/rahul/Hugo/rahul-site/mysite
hugo server
```

Then open http://localhost:1313

## File Structure

```
mysite/
├── .github/workflows/hugo.yml  # Auto-deployment
├── content/                     # All your articles
│   ├── ex-machina/
│   ├── podcasts/
│   ├── talks/
│   └── other-writing/
├── layouts/                     # HTML templates
├── static/                      # CSS, images, CNAME
│   ├── style.css
│   └── CNAME                    # Domain configuration
└── hugo.toml                    # Hugo config
```
