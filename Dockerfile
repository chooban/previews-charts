FROM mhart/alpine-node:5.1.0
MAINTAINER Ross Hendry "rhendry@googlemail.com"

ADD . /opt/apps/previews-charts
WORKDIR /opt/apps/previews-charts

RUN npm install --production
EXPOSE 3001
CMD ["npm", "start"]
