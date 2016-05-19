#! /usr/bin/env sh

npm config set progress=false
npm install
npm run build
rm -rf node_modules/
npm install --production
npm cache clean
mkdir -p /opt/apps/previews-charts/
rm -rf ./src
cp -r index.js package.json node_modules/ public/ /opt/apps/previews-charts/
cd ../
rm -rf /build
