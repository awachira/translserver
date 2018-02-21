FROM node:9-alpine

EXPOSE 3000

RUN mkdir -p /src/app

WORKDIR /src/app
COPY package.json .

RUN npm install

COPY . .

# Add Tini
RUN apk add --no-cache tini
# tini is now available at /sbin/tini
ENTRYPOINT ["/sbin/tini", "--"]

# Run your program under Tini
CMD ["npm", "start"]

# or docker run your-image /your/program ...
