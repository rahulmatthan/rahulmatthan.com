# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal website for Rahul Matthan, a technology lawyer in India. The site is built with Hugo and deployed to GitHub Pages. Content is synced from an Obsidian vault using a Python build script.

## Build and Development Commands

### Local Development
```bash
cd mysite
hugo server
```
Opens site at http://localhost:1313 with live reload.

### Build for Production
```bash
cd mysite
hugo --minify
```
Generates static site in `mysite/public/`.

### Build Search Index
```bash
cd mysite
hugo                          # Build site first
npx pagefind --site public   # Generate search index
```
Indexes all pages for search functionality. Creates `public/pagefind/` directory with search data.

### Content Sync from Obsidian
```bash
python build.py
```
Syncs content from Obsidian vault at `/Users/Rahul/Vaults/Eden/Writing/Published` to `mysite/content/`. This script:
- Cleans and rebuilds the entire `mysite/content/` directory
- Processes Obsidian markdown files (removes `modified:` frontmatter, converts `[[wikilinks]]` to Hugo links)
- Maps Obsidian folders to Hugo sections per `SECTION_CONFIG`
- Creates hierarchical content structure with `_index.md` files for Hugo sections

### Automated Deployment
An automated file watcher (`auto_deploy.py`) monitors the Obsidian vault and automatically deploys changes to GitHub Pages.

**How it works:**
1. Watches `/Users/Rahul/Vaults/Eden/Writing/Published` for markdown file changes
2. Debounces changes (waits 30 seconds after last change)
3. **Checks frontmatter** of all changed files for `writingStatus: published`
4. Only deploys if at least one file has `writingStatus: published` (skips drafts)
5. Runs `build.py`, commits changes, and pushes to GitHub
6. GitHub Actions automatically deploys to production

**Important:** The watcher will NOT deploy files with `writingStatus: draft` or any other status. This prevents accidental publication of draft content.

**Editing Published Files:**
When you edit a file that's already published (has `writingStatus: published`), the watcher will automatically deploy your edits:
1. Make changes to the published file in Obsidian
2. Save the file (frontmatter must still have `writingStatus: published`)
3. Wait 30 seconds (debounce period)
4. Changes automatically deploy to the live site

You can monitor deployments in real-time:
```bash
tail -f /Users/rahul/Hugo/rahul-site/auto_deploy.log
```

**Control commands:**
```bash
# Start watcher (runs automatically at system boot via launchd)
./watcher_start.sh

# Stop watcher
./watcher_stop.sh

# Check status and view recent activity
./watcher_status.sh

# View live logs
tail -f auto_deploy.log
```

**Workflow:**
- **Old way**: Edit Obsidian → Run `build.py` → Commit → Push → Deploy
- **New way**: Edit Obsidian → Change `writingStatus` to `published` → Save → Automatic deployment

## Architecture

### Content Pipeline
1. **Source**: Obsidian vault with structured markdown files
2. **Processing**: `build.py` transforms Obsidian format to Hugo format
3. **Output**: Hugo content in `mysite/content/` organized by section and subsection

### Content Structure
- **Ex Machina**: Primary blog articles, organized by year (2016-2024+)
  - Each year is a Hugo section with its own `_index.md`
  - Articles numbered sequentially (e.g., "364. The Zone of Mischief.md")
- **Other Writing**: Publications in external venues (Hindustan Times, Carnegie, JMIR)
- **Podcasts**: Organized by podcast series (Ex Machina, Pragati Podcast, The Seen and the Unseen, etc.)
- **Talks**: Conference presentations and panel discussions

### Hugo Layout System
The site uses a custom three-column layout (`mysite/layouts/_default/baseof.html`):
- **Left sidebar**: Navigation with collapsible Ex Machina year sections (accordion behavior)
- **Main content**: Article/list content with breadcrumb navigation
- **Right sidebar**: Related articles by tag (shown only on article pages with tags)

Key layout features:
- Year/folder accordions (only one open at a time)
- Mobile-responsive hamburger menu
- Reading progress bar for articles
- Scroll-to-top button
- Related content cards with hover previews
- External links open in new tab

### Search Functionality
The site uses Pagefind for fast, client-side search functionality.

**Architecture:**
- Search button positioned at bottom of left sidebar (uses `margin-top: auto` in flexbox)
- Styled to match other sidebar navigation links
- Opens full-page modal overlay on click or Cmd/Ctrl+K keyboard shortcut

**Search UI Components** (`mysite/layouts/_default/baseof.html`):
- Search trigger button: `<button class="search-trigger">Search</button>`
- Search modal: Full-page overlay with backdrop blur
- Pagefind mount point: `<div id="pagefind-search"></div>` where search UI renders

**Key Features:**
- **Keyboard shortcuts**: Cmd/Ctrl+K to open, ESC to close
- **Lazy loading**: Pagefind UI only initializes when search is first opened
- **Auto-focus**: Search input automatically focused when modal opens
- **Mobile responsive**: Adapts styling for smaller screens
- **Accessibility**: Proper ARIA labels and keyboard navigation

**Search Index Generation:**
Pagefind automatically runs during deployment (`.github/workflows/deploy.yml` line 47):
```bash
npx pagefind --site public
```

**Local Testing:**
```bash
cd mysite
hugo                          # Build site first
npx pagefind --site public    # Generate search index
hugo server                   # Serve with search enabled
```

The search indexes all HTML files in `public/` and creates a `/pagefind/` directory with:
- Search index files
- Pagefind UI JavaScript and CSS
- Language-specific search data

**Styling:**
- Search button: Matches `.side-nav a` styling (minimal, hover slides right)
- Modal: Custom styling in `style.css` with backdrop blur and smooth transitions
- Pagefind UI: Customized via CSS variables to match site design

**Important:**
- Search button uses `margin-top: auto` to push to bottom of sidebar
- Modal has `z-index: 10001` (above mobile menu at 9999)
- Magnifying glass icon hidden via CSS for cleaner input appearance

### Section-Specific Layouts
- `layouts/other-writing/list.html`: Custom list view for publications
- `layouts/podcasts/list.html`: Custom list view for podcast episodes
- `layouts/talks/list.html`: Custom list view for talks

### Frontmatter Schema
Ex Machina articles include:
- `title`: Article title
- `published`: Original publication date
- `date`: Hugo date (synced from `published`)
- `tags`: Array of topic tags (e.g., `data_governance`, `privacy`)
- `urlSecondary`: Link to original publication (usually LiveMint)
- `urlCanonical`: Canonical URL at exmachina.in
- `Archive URL`: Archived version of original publication
- `category`: Content type (usually "article")
- `writingStatus`: Publication status (usually "published")
- `publication`: Publication name (usually "Ex Machina")

### Deployment
GitHub Actions workflow at `.github/workflows/deploy.yml`:
- Triggers on push to `main` branch
- Uses Hugo extended latest version
- Runs Pagefind for search indexing after build
- Deploys to GitHub Pages automatically

## Configuration
- `mysite/hugo.toml`: Minimal Hugo config (baseURL, title, language)
- `mysite/static/CNAME`: Custom domain configuration for rahulmatthan.com
- `mysite/static/style.css`: Single CSS file for all styling
- `mysite/static/favicon.svg`: Site favicon

## Important Notes

### Content Sync Workflow
The typical workflow is:
1. Edit content in Obsidian vault
2. Run `python build.py` to sync to Hugo
3. Preview with `hugo server` if needed
4. Commit and push changes (GitHub Actions handles deployment)

### Build Script Mapping
`SECTION_CONFIG` in `build.py` defines the folder mapping:
- `exmachina` → `ex-machina`
- `otherwriting` → `other-writing`
- `podcasts` → `podcasts`
- `talks` → `talks`

The script uses case-insensitive folder name matching and creates slugified subfolder names.

### Link Conversion
`build.py` converts Obsidian `[[wikilinks]]` to Hugo relative links:
- `[[Article Name]]` → `[Article Name](../article-name)`
- `[[Article Name|Display Text]]` → `[Display Text](../article-name)`

### Hugo Section Behavior
Each section and subsection requires an `_index.md` file for Hugo to recognize it. The build script automatically creates these for:
- Root sections (ex-machina, other-writing, podcasts, talks)
- Year folders under ex-machina (2016, 2017, etc.)
- Podcast series folders under podcasts
- Publication folders under other-writing
