/**
 * Curiovix — Site Configuration
 * Update these values before each release.
 */
const SITE_CONFIG = {
  COMPANY_NAME:         "Curiovix",
  COMPANY_TAGLINE:      "Building useful software and digital products to make everyday life easier.",
  SUPPORT_EMAIL:        "curiovix.support@gmail.com",
  SITE_URL:             "https://curiovix.com",

  // Product #1: Melodiq (Flagship Audio Player)
  MELODIQ_NAME:         "Melodiq",
  MELODIQ_TAGLINE:      "Modern Android music player and regional audio discovery companion.",
  MELODIQ_STATUS:       "Coming Soon",
  MELODIQ_VERSION:      "1.0.0",
  MELODIQ_MIN_ANDROID:  "Android 5.0 (API 21)+",
  MELODIQ_TARGET_SDK:   "Target SDK 36",
  MELODIQ_LIVE:         false,               // Switch to true once Google Play listing is live
  MELODIQ_PLAY_STORE_URL: "https://google.com", // Google Play Store listing URL

  // Product #2: StorySplitz (Video Toolkit - Coming Soon)
  APP_NAME:             "StorySplitz",
  APP_TAGLINE:          "Powerful video tools, built for your stories.",
  APP_STATUS:           "Coming Soon",
  APP_VERSION:          "1.0.0",
  APP_MIN_ANDROID:      "Android 5.0 (API 21)+",
  DOWNLOAD_READY:       false,              // StorySplitz is currently in development / Coming Soon
  APK_URL:              "https://github.com/Curiovix/StorySplitz/releases/download/v1.0.0/StorySplitz-v1.0.0.apk",
  APK_SIZE:             "68 MB",
  RELEASE_DATE:         "Coming Soon",
  STARTER_CREDITS:      30,
  REWARDED_CREDITS:     20,
  BATCH_SPLIT_COST:     8,
};
window.SITE = SITE_CONFIG;
