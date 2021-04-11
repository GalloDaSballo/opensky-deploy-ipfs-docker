FROM node:14
MAINTAINER "Alex The Entreprenerd"

# Create app directory
WORKDIR /usr/src/app

RUN git clone https://github.com/GalloDaSballo/opensky-default-template template
RUN cd template && yarn
COPY . .
RUN yarn
RUN yarn build

EXPOSE 3000


CMD ["yarn", "start"]
