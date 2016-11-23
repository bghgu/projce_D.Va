#
npm install
ionic platform list
ionic platform add android
ionic build --release android
apk 사인 jarsigner
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore key.keystore android-release-unsigned.apk alias_name

확인 jarsigner jar verified
jarsigner -verify -verbose -certs android-release-unsigned.apk

optimize zipalign
zipalign -v 4 android-release-unsigned.apk foressst.apk
ionic platform add ios
ionic build iOS —release
