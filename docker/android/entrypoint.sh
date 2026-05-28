#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -gt 0 ]; then
  exec "$@"
fi

cd /workspace

export PATH="/workspace/node_modules/.bin:/workspace/src-capacitor/node_modules/.bin:${PATH}"
export GRADLE_OPTS="-Dorg.gradle.java.home=${JAVA_HOME} ${GRADLE_OPTS:-}"

temp_splash_file="/workspace/src-capacitor/android/app/src/main/res/drawable/splash.xml"
temp_foreground_file="/workspace/src-capacitor/android/app/src/main/res/mipmap/ic_launcher_foreground.xml"
created_temp_splash=false
created_temp_foreground=false

cleanup() {
  if [ "$created_temp_splash" = true ] && [ -f "$temp_splash_file" ]; then
    rm -f "$temp_splash_file"
  fi
  if [ "$created_temp_foreground" = true ] && [ -f "$temp_foreground_file" ]; then
    rm -f "$temp_foreground_file"
  fi
}

trap cleanup EXIT

if [ ! -f "/workspace/src-capacitor/android/app/src/main/res/drawable/splash.png" ] && [ ! -f "$temp_splash_file" ]; then
  mkdir -p "$(dirname "$temp_splash_file")"
  cat > "$temp_splash_file" <<'EOF'
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="rectangle">
  <solid android:color="@android:color/white" />
</shape>
EOF
  created_temp_splash=true
fi

if [ ! -f "$temp_foreground_file" ]; then
  mkdir -p "$(dirname "$temp_foreground_file")"
  cp /workspace/src-capacitor/android/app/src/main/res/drawable-v24/ic_launcher_foreground.xml "$temp_foreground_file"
  created_temp_foreground=true
fi

./node_modules/.bin/quasar build -m capacitor -T android --skip-pkg

cd /workspace/src-capacitor/android
./gradlew -Dorg.gradle.java.home="${JAVA_HOME}" assembleDebug

echo "APK output: /workspace/src-capacitor/android/app/build/outputs/apk/debug/app-debug.apk"