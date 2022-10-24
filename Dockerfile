FROM node:14-alpine
WORKDIR /home/node/app
COPY ./package.json .
RUN yarn
COPY . .
RUN yarn build
EXPOSE 7000
CMD ["yarn", "start"]