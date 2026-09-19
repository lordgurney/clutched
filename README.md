# ClutchEd Driving School (clutched.au)

Official marketing website and local launch kit for **ClutchEd Driving School**, servicing **Cooroy, Gympie, and the Mary Valley**.

ClutchEd operates as the flagship pilot driving school for the [Clutch Marketplace & Logistics Platform](https://github.com/lordgurney/Clutch) (clutchit.au).

---

## ?? Features & Structure

* **Holding Page (index.html)**: Clean, high-converting holding page during initial domain propagation and final inspection.
* **Full Website (index_full.html)**: Complete marketing platform:
  * **Interactive Schedule & Coverage**: Service days and coverage across Gympie (Mon–Sat), Cooroy & Pomona (Tue, Thu, Sat), and Mary Valley (Wed, Fri).
  * **Accredited Instructor Profile**: Neil Gurnett (Lead Instructor & Founder), QLD TMR accreditation, Blue Card, and zero-yell coaching philosophy.
  * **Dual-Control Fleet**: Modern Automatic and Precision Manual vehicles with ANCAP safety, dual pedals, and emergency controls.
  * **Q-SAFE Curriculum & 3:1 Multiplier**: 10 instructor hours = 30 official Queensland logbook hours.
  * **Roadmap**: Future development plans for defensive driving, 4WD training, and simulator hubs.
* **App Bridge (pp-bridge.js)**: Routes client bookings straight into the Clutch platform booking portal at https://clutchit.au/#/s/clutched.
* **Local Marketing Kit (marketing/GBP_AND_LOCAL_LAUNCH_KIT.md)**: High school noticeboard flyer copy, community group announcements, and Google Business Profile blueprint.

---

## ?? Updating Instructor & Vehicle Photos

Place your high-resolution images in ssets/images/:
* **instructor-portrait.jpg** — Instructor headshot / portrait.
* **leet-auto.jpg** — Automatic dual-control vehicle photo.
* **leet-manual.jpg** — Manual dual-control vehicle photo.

*(Fallback photos are configured automatically in HTML via onerror if files are not present).*

---

## ?? Deployment to Firebase Hosting

This repository is configured to deploy directly to Firebase Hosting on the clutched-au target (clutched.au):

`ash
# Deploy to live site
npx firebase deploy --only hosting
`

---

## ?? Connected Repositories
* **Clutch Platform App (SaaS & Marketplace)**: [lordgurney/Clutch](https://github.com/lordgurney/Clutch)
