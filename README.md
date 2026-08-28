# Curiovix Website

Official website for **Curiovix** and **StorySplitz**.

## Folder Structure

```
website/
├── index.html              ← Main homepage
├── README.md               ← This file
├── config/
│   └── site.js             ← ⭐ ALL RELEASE VALUES HERE — update before each release
├── css/
│   └── main.css            ← All styles (single file, no framework)
├── js/
│   └── main.js             ← Navigation, animations, FAQ accordion
├── pages/
│   ├── privacy.html        ← Privacy Policy
│   ├── terms.html          ← Terms of Use
│   └── faq.html            ← FAQ + APK Installation Guide
└── assets/
    ├── logo/               ← Curiovix + StorySplitz logos
    ├── screenshots/        ← Add app screenshots here
    ├── images/             ← General images
    └── icons/              ← Icons/favicons
```

## How to Run Locally

No build step required. Open directly in a browser:

```
# Windows — double-click index.html
# OR serve with Python for proper path resolution:
python -m http.server 8080
# Then open http://localhost:8080
```

## How to Deploy to GitHub Pages

1. Create a GitHub repository (e.g. `curiovix.github.io` or `curiovix-website`)
2. Push the entire `website/` folder contents to the `main` branch
3. Go to **Settings → Pages → Source: main branch / root**
4. GitHub Pages will publish automatically

The site is 100% static — no server, no build step needed.

## ⭐ Before Each Release — Update config/site.js

Open `config/site.js` and update:

| Key | Description |
|-----|-------------|
| `APP_VERSION` | New version string (e.g. `"1.0.1"`) |
| `APK_URL` | Direct URL to the release APK file |
| `APK_SIZE` | APK file size (e.g. `"157 MB"`) |
| `RELEASE_DATE` | Human-readable date (e.g. `"September 2026"`) |
| `SUPPORT_EMAIL` | Support contact email |
| `SITE_URL` | Live domain once decided |

## Where to Add Screenshots

1. Add screenshot images to `assets/screenshots/`
2. In `index.html`, find the storysplitz section and add `<img>` tags

## Where to Update Privacy/Terms

Edit `pages/privacy.html` and `pages/terms.html` directly.
Update the "Last updated" date at the top of each file.

## Security Checklist

Before publishing, confirm this website contains:
- ✅ NO passwords or API keys
- ✅ NO Firebase private credentials
- ✅ NO signing keystore or key.properties
- ✅ NO private source code
- ✅ Only public product/brand information
