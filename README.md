# Shri Girdhari Tilakdhari Inter College Website

यह एक modern, responsive school website frontend है जो HTML, Tailwind CSS, CSS और JavaScript से बनाया गया है।

## Project Files

- `index.html` : main website file
- `styles.css` : custom styling, hover effects, animations, glassmorphism
- `script.js` : interactivity, dark mode, slider, lightbox, form validation
- `assets/images` : school photos
- `assets/videos` : school video

## VS Code Me Run Kaise Karein

### Option 1: Live Server Extension

1. VS Code खोलें।
2. `File > Open Folder` से यह folder खोलें:
   `C:\Users\Avanish\Documents\Codex\2026-04-25-files-mentioned-by-the-user-video`
3. Extensions में जाकर `Live Server` install करें।
4. `index.html` खोलें।
5. Right click करें और `Open with Live Server` चुनें।
6. Website browser में खुल जाएगी।

Example URL:

```text
http://127.0.0.1:5500/index.html
```

### Option 2: Python Server

VS Code terminal में यह command चलाएँ:

```powershell
python -m http.server 5500
```

फिर browser में यह URL खोलें:

```text
http://localhost:5500/index.html
```

## Important Note

यह project कुछ CDN links use करता है:

- Tailwind CSS CDN
- Swiper.js
- AOS animation library
- Font Awesome
- Google Fonts

इसलिए internet connection होने पर website best तरीके से load होगी।

## Features

- Fully responsive layout
- Sticky navbar
- Mobile menu
- Smooth scrolling
- Hero image slider
- Typing text effect
- Founder highlight section
- Gallery with lightbox
- Hover zoom and lift effects
- Dark/light mode toggle
- Admission form validation
- Contact form to WhatsApp redirect
- Scroll to top button

## Deploy Kaise Karein

### Option 1: Netlify

1. [Netlify](https://www.netlify.com/) पर account बनाएं या login करें।
2. `Add new site` पर जाएँ।
3. Project folder upload करें।
4. Deploy होने के बाद आपको live link मिल जाएगा।

### Option 2: Vercel

1. [Vercel](https://vercel.com/) पर login करें।
2. `New Project` चुनें।
3. इस static project folder को import या upload करें।
4. Deploy पर click करें।

### Option 3: GitHub Pages

1. इस project को GitHub repository में upload करें।
2. Repository settings में जाएँ।
3. `Pages` section खोलें।
4. Branch select करें, जैसे `main`.
5. Save करें।
6. कुछ समय बाद live URL मिल जाएगा।

### Option 4: Normal Hosting / cPanel

1. Hosting account के `public_html` folder में जाएँ।
2. Project की files upload करें:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `assets` folder
3. Upload के बाद domain open करके website check करें।

## Deploy Karte Waqt Dhyan Rakhein

- `assets` folder पूरा upload होना चाहिए।
- File names change न करें।
- `index.html` root में होना चाहिए।
- CDN access block नहीं होना चाहिए।

## Customization

अगर आगे आपको यह changes करने हों, तो आसानी से update कर सकते हैं:

- school name
- phone number
- WhatsApp number
- gallery photos
- founder details
- map location
- colors and text

## Contact Flow

Website में contact और inquiry actions WhatsApp number `9450874431` पर भेजे गए हैं।

## Ready Status

यह frontend static hosting के लिए ready है।
