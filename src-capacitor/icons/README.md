## Replacing Project Icon (Android + iOS via Capacitor)

This project uses **Quasar + Icon Genie + Capacitor** to generate all
application icons and splashscreens.

### 📦 Default icon

The default icon is located in:

    src-capacitor/icons/platform.png

This **platform icon** is used to generate all platform assets.

The **platform icon** related generated assets are git ignored by default.
To use them, regenarate them by following the Generating app icons section.

---

## 🏭 Generating app icons

### 1. Add the new soucre icon (if necessary)

Add the new file into the icons directory:
```
src-capacitor/icons/{your-icon.png}
```
---

### 2. Generate icon assets

Run:

``` bash
icongenie generate -m capacitor -i src-capacitor/icons/{your-icon.png}
  --skip-trim   --padding 10,10
```

This will regenerate:
- Android mipmap icons (all densities)
- iOS AppIcon set
- Splashscreen assets

---

## ⚠️ Important rules

-   ❌ Do NOT manually edit generated mipmap or iOS assets
-   ❌ Do NOT commit partial icon sets
-   ❌ Do NOT use cropped / edge-to-edge logos
-   ✔ Always regenerate via Icon Genie

Android uses:
- `ic_launcher_foreground.png`
- `ic_launcher_background.png`

Make sure your icon:
- does NOT rely on tight edges
- has enough transparent padding
- looks good inside a circular/squircle mask

---

## 🧠 Common issues

### Icon looks cropped on device?

-   Icon is too large inside canvas
-   Adaptive icon mask is clipping edges
-   Fix: reduce logo size in source icon

### Icon looks different across devices?

-   OEM launchers apply different masks
-   Fix: ensure safe zone padding in source icon

### Icon changes not reflected?

-   Android launcher cache
-   Fix: uninstall app before reinstall

---

## 🏁 Summary

To update the app icon:

1.  Specify/Add the icon file `src-capacitor/icons/{your-icon.png}`
2.  Run Icon Genie generation
3.  Rebuild Capacitor Android project
4.  Reinstall APK

This ensures consistent icons across Android and iOS.
