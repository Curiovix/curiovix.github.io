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
  MELODIQ_TAGLINE:      "Smart music player and regional audio streaming for Android.",
  MELODIQ_STATUS:       "Available for Android",
  MELODIQ_VERSION:      "1.0.0",
  MELODIQ_MIN_ANDROID:  "Android 7.0+",

  // Product #2: StorySplitz (Video Toolkit - Coming Soon)
  APP_NAME:             "StorySplitz",
  APP_TAGLINE:          "Powerful video tools, built for your stories.",
  APP_STATUS:           "Coming Soon",
  APP_VERSION:          "1.0.0",
  APP_MIN_ANDROID:      "Android 5.0 (API 21)+",
  DOWNLOAD_READY:       true,               // set to true and fill APK_URL before release
  APK_URL:              "https://github.com/Curiovix/StorySplitz/releases/download/v1.0.0/StorySplitz-v1.0.0.apk",                  // fill with direct APK download URL
  APK_SIZE:             "68 MB",
  RELEASE_DATE:         "August 2026",
  STARTER_CREDITS:      30,
  REWARDED_CREDITS:     20,
  BATCH_SPLIT_COST:     8,
};
window.SITE = SITE_CONFIG;
