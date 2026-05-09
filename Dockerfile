FROM node:20.9.0-alpine AS builder
WORKDIR /app
COPY ./package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
ENV VITE_SERVER_URL=https://backend.realtokenization.io/api 
ENV VITE_GEOCODING_API_KEY='1818dacb991a41bba869de9d4db30c9b'
ENV VITE_GOOGLE_API_KEY='AIzaSyCJdaGfHZZEt1heuVb5Hpoe6pZLh61UlEA'
ENV VITE_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51KxbWUHGdRIZRlMyY4nhQp14pCarD4GkzVK3H9V1RMvQd9xTlOncsikEsO9wXJ2hpZwB6FttGG5ZqeZqBhsZYy0Y00wbSKx6Sd
RUN npm run build

FROM node:20.9.0-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
RUN npm install -g serve
EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]