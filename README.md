# Velvet Wedding Invitation — Recovered Frontend Project

Recovered local frontend backup for **Nuhman & Shahna Wedding Invitation** (`https://nuhmanshahna.vercel.app/`).

---

## 📁 Project Structure

```
velvet-recovered/
├── index.html              # Main HTML markup with localized asset links
├── README.md               # Documentation and local setup instructions
├── css/
│   ├── fonts.css           # Local @font-face declarations for Cormorant Garamond, DM Sans & Great Vibes
│   └── style.css           # Complete responsive stylesheet, animations, and typography
├── js/
│   └── script.js           # Interactive logic (scratch canvas, video opening, countdown, lightbox, RSVP)
├── images/
│   ├── HeroIMG.png         # Main couple hero background
│   ├── openingIMG.png      # Opening envelope graphic
│   ├── story-1.jpg         # Story photo 1
│   ├── story-2.jpg         # Story photo 2
│   ├── story-3.jpg         # Story photo 3
│   ├── venue.jpg           # Aalakkod wedding venue graphic
│   ├── gallery-1.jpg       # Gallery photo 1
│   ├── gallery-2.jpg       # Gallery photo 2
│   ├── gallery-3.jpg       # Gallery photo 3
│   ├── gallery-4.jpg       # Gallery photo 4
│   ├── gallery-5.jpg       # Gallery photo 5
│   └── gallery-6.png       # Gallery photo 6
├── fonts/
│   └── *.woff2             # 34 downloaded woff2 font files (Cormorant Garamond, DM Sans, Great Vibes)
├── icons/
│   ├── favicon.svg         # SVG favicon
│   ├── instagram.svg       # Instagram SVG icon
│   ├── facebook.svg        # Facebook SVG icon
│   └── website.svg         # Globe/Website SVG icon
└── assets/
    ├── openingScene.mp4    # Opening invitation video animation (3.1 MB)
    └── music.mp3           # Wedding background music audio track (824 KB)
```

---

## 🚀 How to Run Locally

### Option 1: Using Python's built-in HTTP server (Recommended)
Open your terminal in the `velvet-recovered` folder and run:
```bash
python -m http.server 8000
```
Then navigate to:
[http://localhost:8000](http://localhost:8000)

### Option 2: Using Node.js `serve` / `npx`
```bash
npx serve .
```

### Option 3: Direct File Opening
Double-click `index.html` to open it directly in Google Chrome, Microsoft Edge, Firefox, or Safari.

---

## 🎨 Interactive Features Preserved & Recovered

1. **Opening Envelope & Video Experience**:
   - Tap/click the wax seal/envelope to trigger the opening video animation (`openingScene.mp4`).
   - Sound toggle button (`♪`) controls background music (`music.mp3`) and video audio.
   - Smoothly transitions into the main invitation upon video completion.

2. **Interactive Scratch-to-Reveal**:
   - HTML5 Canvas-based scratch card for the Day (14), Month (06), and Year (2027).
   - Touch/drag reveals the wedding date with realistic metallic shimmer and text.
   - Triggers celebration message once 48%+ of the area is scratched.

3. **Live Wedding Countdown**:
   - Real-time countdown timer calculating remaining Days, Hours, Minutes, and Seconds until June 14, 2027.

4. **Timeline & Animated Flower Indicator**:
   - Scroll-linked animated flower marker (`✿`) and progress bar tracking your position through wedding events (Nikkah, Reception, Wedding Party).

5. **Gallery Lightbox**:
   - Click any gallery image to open it in a full-screen modal lightbox with keyboard `Escape` support.

6. **RSVP Form & WhatsApp Integration**:
   - Interactive RSVP form with attendance selection, guest counter, and message area.
   - Direct WhatsApp RSVP link with pre-filled message.

7. **Typography & Styling**:
   - All Google Fonts (`Cormorant Garamond`, `DM Sans`, `Great Vibes`) downloaded locally in `.woff2` format for 100% offline functionality.
