FROM mhart/alpine-node:5.11.1
MAINTAINER Ross Hendry "rhendry@googlemail.com"

ADD . /build
WORKDIR /build
RUN sh ./build.sh
WORKDIR /opt/apps/previews-charts/

EXPOSE 3001
CMD ["npm", "start"]
