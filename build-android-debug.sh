#!/bin/bash

# Define the drawable directories to be deleted
declare -a drawableDirectories=("drawable-hdpi" "drawable-mdpi" "drawable-xhdpi" "drawable-xxhdpi" "drawable-xxxhdpi")

# Define the directory path where SVG files are located
svgDirectory="android/app/src/main/res/raw"

# Clean the Android build
cd android
./gradlew clean
cd ..

# Delete the existing index.android.bundle file
rm -f "android/app/src/main/assets/index.android.bundle"

# Clean all watchman listners
watchman watch-del-all

# Generate the bundle and assets
npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

# Loop through the drawable directories and delete the generated assets
for dir in "${drawableDirectories[@]}"
do
    if [ -d "android/app/src/main/res/$dir" ]; then
        rm -rf "android/app/src/main/res/$dir"
        echo "Deleted $dir directory"
    fi
done

# Delete SVG files in the specified directory
if [ -d "$svgDirectory" ]; then
    find "$svgDirectory" -type f -name "*.svg" -exec rm {} +
    echo "Deleted SVG files in $svgDirectory"
fi

# Build the Android release
cd android
./gradlew assembleDebug
cd ..

# Delete the generated index.android.bundle file after generating android release build
rm -f "android/app/src/main/assets/index.android.bundle"
