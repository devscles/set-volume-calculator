# TrainBlock

> A hypertrophy planning and workout tracking app built with Claude, because apparently no existing app does exactly what we want. That's what Claude says, anyways.

---

## What is this?

TrainBlock is a progressive web app for planning resistance-training programs and tracking workouts. It started as a humble spreadsheet calculator to answer the question *"am I doing enough sets per muscle group per week?"* and has since metastasised into something considerably more ambitious.

It lives in a single HTML file. Yes, one file. It's approximately 2,500 lines of hand-crafted, lovingly over-engineered vanilla JavaScript. No frameworks were harmed in the making of this application. 

---

## Features

### Planning
- **Multi-block programs** — up to 26 blocks (A–Z), each with 1–7 training days
- **Exercise library** — ~80 built-in exercises across all major muscle groups, with primary (1.0×) and secondary (0.5×) muscle weight assignments
- **Custom exercises** — add your own with full muscle mapping
- **Built-in exercise editing** — disagree with the default muscle weights? Change them. They're just suggestions.
- **Set type multipliers** — because one myo-rep sequence is not the same as one straight set, no matter what your logbook says

| Type | Multiplier | Notes |
|---|---|---|
| Straight | 1.0× | The baseline against which all things are measured |
| AMRAP | 1.0× | Same volume, more suffering |
| Drop set | 1.5× | Works out to roughly 1.5 straight sets |
| Cluster | 1.5× | Ditto |
| Rest-pause | 2.0× | One set with interruptions for existential reflection |
| Myo-rep | 2.5× | Activation set + mini-sets; "1 set" means the whole sequence |

- **Supersets & giant sets** — long-press any row to link it to the one above. Tri-sets, giant sets, whatever your program calls for.

### Volume analysis
- **Summary tab** — weekly effective sets per muscle group, colour-coded against Pak et al.'s minimum effective dose thresholds:
  - 🔴 &lt;6 sets/week — below the floor
  - 🟡 6–9 sets/week — minimum effective range
  - ⬜ 10–14 sets/week — solid
  - 🟢 ≥15 sets/week — high volume territory
- **Planned vs Actual toggle** — compare what you intended to do with what you actually did (thresholds scale 4× for the 28-day window)
- **Expandable muscle cards** — tap any card to see which exercises contributed and from which days

### Tracking
- **Native workout sessions** — tap "Start workout" on any planned day, log sets with weight and reps as you go
- **Set chips** — one chip per planned set, turns green when logged, yellow if you missed the rep target
- **Optional RIR tracking** — hidden by default, because you're already doing a lot
- **Rest timer** — auto-starts when you log a set, vibrates when done. Defaults to 90 seconds, which is probably too short for your heaviest sets but here we are.
- **Auto-resume** — close the app mid-session and it picks up where you left off
- **In-progress session protection** — the app will ask before discarding your work. It's not your therapist, but it's trying.

### Flexify integration
- **Export plans** — exports any block as a Flexify-compatible CSV, one plan per training day
- **Import history** — reads your `graphs.csv` from Flexify, maps exercise names to ours, and populates the Actual volume view. 92% name-match rate on real-world data, which is better than most things in life.

---

## The science bit

Volume thresholds are informed by Israetel, Hoffman, and colleagues' MEV/MAV/MRV framework, with minimum effective dose guidance from Pak et al. Set-type multipliers are derived from the rest-pause and myo-rep literature (Marshall et al. and others), conservatively estimated, and made user-editable because the error bars on this stuff are wide enough to drive a powerlifting meet through.

The app does not know your 1RM, your sleep quality, your stress levels, or whether you remembered to eat before training. It is a planning tool, not a coach. Please do not sue us.

---

## Technical notes

- **Single-file PWA** — `index.html` + `sw.js` + `manifest.json` + icons. Deploy anywhere that serves static files.
- **All data is local** — `localStorage` only. Nothing leaves your device. There is no server. There is no cloud. There is only you and your data and a service worker.
- **Offline capable** — service worker caches everything. Works in the gym even when the wifi is "gym wifi."
- **Dark mode** — respects `prefers-color-scheme`. Your eyes are safe.
- **Install as PWA** — add to home screen from Chrome on Android for the full app experience. Firefox PWA support is limited; use Chrome.

---

## Planned / in progress

- [ ] Workout history browsing
- [ ] Per-exercise progression graphs
- [ ] Last-session hints during logging ("you did 8×185 last time")
- [ ] Target weight/reps planning per exercise row
- [ ] Switch Actual summary mode to use native sessions (retiring the Flexify import path)
- [ ] Export session history to CSV

---

## What it won't do

- Count your macros
- Tell you whether you should bulk or cut
- Play motivational music
- Remember your PR if you clear browser storage
- Replace a good coach

---

## Deployment

1. Clone the repo
2. Push to a GitHub Pages branch
3. Open the URL on your phone
4. Add to home screen
5. Go lift something

No build step. No dependencies. No `npm install`. This is not a drill.

---

*Built with Claude. Tested in real gyms with real barbells.*
