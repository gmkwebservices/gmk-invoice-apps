# GMK Invoice - Windows & Android apps

Native apps for **GMK Invoice** (https://gmkwebservices.co.za/invoice-app/).
They open your live invoicing app inside a native window, so every update you make to the
WordPress plugin shows up in the apps instantly. No rebuild needed.

| Folder | What it builds | Technology |
|---|---|---|
| `windows/` | `GMK-Invoice-Setup-x.y.z.exe` (installer) and `GMK-Invoice-Portable-x.y.z.exe` | Electron |
| `android/` | `GMK-Invoice.apk` | Capacitor |

GitHub builds both automatically (see `.github/workflows/`).

## 1. Push to GitHub

Create an empty repository on github.com (for example `gmk-invoice-apps`), then in this folder:

```
git init
git add .
git commit -m "GMK Invoice Windows and Android apps"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/gmk-invoice-apps.git
git push -u origin main
```

(No Git? Create the repo, click **Add file -> Upload files**, and drag in everything from this folder, including the hidden `.github` folder.)

## 2. Download your apps

1. Open the repo on GitHub -> **Actions** tab. Two runs start: *Build Windows app* and *Build Android app* (about 5-10 minutes).
2. Click a finished run -> scroll to **Artifacts** -> download `GMK-Invoice-Windows` or `GMK-Invoice-Android`.
3. To rebuild any time: Actions -> pick the workflow -> **Run workflow**.

### Publish a download page (optional)
Create a release tag and both files are attached to a GitHub Release for customers to download:
```
git tag v1.0.0
git push origin v1.0.0
```

## 3. Install

* **Windows:** run `GMK-Invoice-Setup-*.exe`. Windows SmartScreen may say "unknown publisher" because the app is not code-signed: click **More info -> Run anyway**.
* **Android:** copy `GMK-Invoice.apk` to the phone and open it. Allow "Install unknown apps" for your browser/files app when asked.
  This is a test-signed APK for direct installs. Publishing on Google Play needs a signed release build (ask for it when you are ready).

## Settings you may want to change
* **Address / allowed sites:** `windows/src/config.js` and `android/capacitor.config.json`.
* **App name / ID:** `windows/package.json` and `android/capacitor.config.json` (`appId`).
* **Icons:** replace `windows/build/icon.ico` + `icon.png` and the three PNGs in `android/assets/`.
* **Version number:** `windows/package.json` -> `version`.

## Good to know
* The apps need an internet connection (they show your live account).
* "Continue with Google" opens Google in your normal browser (Google does not allow sign-in inside app windows) and then signs the app in automatically. Requires GMK Invoice plugin **1.6.1** or newer on the server.
* On Android, downloading a PDF straight from the app may not work in this first version; use the Email / WhatsApp share buttons.
