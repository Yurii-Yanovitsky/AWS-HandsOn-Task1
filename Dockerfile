FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# Set the AWS region environment variable
ENV AWS_REGION=eu-north-1
ENV AWS_ACCESS_KEY_ID=AKIAYS2NVH7BPQL5VJP3
ENV AWS_SECRET_ACCESS_KEY=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

CMD [ "npm", "start" ]