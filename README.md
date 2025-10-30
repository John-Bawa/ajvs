# African Journal of Veterinary Sciences (AJVS)

## About This Project

AJVS is a modern, open-access academic journal platform built with React, featuring integration with Open Journal Systems (OJS) for manuscript management.

### System Architecture

- **Public Portal** (This React App): Public-facing website for browsing articles, journal information, and archives
- **OJS Backend** (External): Handles manuscript submission, peer review, and editorial workflows
- **Integration**: Simple redirects/external links between systems

### Key Features

- 📚 Article browsing and archives
- 🎨 Responsive, modern design
- 🔐 Role-based access (Admin, Editor, Reviewer, Author)
- 💳 Payment processing (Paystack)
- 📧 Email notifications
- 🔗 OJS integration for submissions

## OJS Integration Setup

This site is configured to work with an external OJS installation for manuscript workflows.

**Quick Start:**
1. Install OJS on a PHP-enabled server
2. Add your OJS URL to `.env`:
   ```
   VITE_OJS_URL=https://your-ojs-installation.org
   ```
3. Test the "Submit Manuscript" flow

**Documentation:**
- 📖 [Quick Setup Guide](README_OJS_SETUP.md)
- 📚 [Comprehensive Integration Guide](OJS_INTEGRATION_GUIDE.md)

## Project info

**URL**: https://lovable.dev/projects/18dc0a91-1ae3-44ea-8958-4c62d5ee004a

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/18dc0a91-1ae3-44ea-8958-4c62d5ee004a) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/18dc0a91-1ae3-44ea-8958-4c62d5ee004a) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
