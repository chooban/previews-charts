FROM mhart/alpine-node:6.1.0
MAINTAINER Ross Hendry "rhendry@googlemail.com"

RUN mkdir -p /opt/apps/previews-charts/

# This stuff will change infrequently, so let's make use of the layer cache.
ADD package.json .
RUN npm install --production --progress=false && \
  mv package.json node_modules/ /opt/apps/previews-charts/

ADD . /build
WORKDIR /build
RUN npm install && \
  npm run build && \
  cp -r index.js public /opt/apps/previews-charts && \
  npm cache clean && \
  rm -rf ./node_modules ./src && \
  cd ../ && \
  rm -rf /build

WORKDIR /opt/apps/previews-charts/

EXPOSE 3001
CMD ["npm", "start"]
