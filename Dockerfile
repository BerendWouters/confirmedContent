FROM node:21
WORKDIR /home/node/app
COPY . .
RUN npm install
CMD ["node", "index.mjs"]
EXPOSE 3000
