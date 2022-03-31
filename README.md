# Sportify

Sports equipment online store. Written using `React` and `Typescript`. Styled with `Scss`. Tested using `Jest` and `React Testing Library`. Backend api which uses `Express` can be found in a separate repository – [Sports-store-api](https://github.com/RafalAlmakiewicz/sports-store-api).

## Hosting live on Vercel

https://sportify-pi.vercel.app

## Set up locally

(Developed with node v14 and Create React App)

Clone repository. In the root folder run `npm install`, then `npm start`

## Features

![home](https://user-images.githubusercontent.com/79459373/160728969-d84729d1-c09a-4100-a626-f8e8886b2262.png)

### Fullstack app

App comunicates with node api, which persists data using MongoDb.

### Browsing products

Sidebar lets user search by name, set price range, change sorting order and filter by activity.

### Authentication

Forms to log in and register. Some routes are protected from unauthenticated users.

### Admin panel

Creating, updating and deleting products.

### Cart

Shopping cart which persists data in LocalStorage.

## Skills I learned/improved

- React
- Typescript
- responsive layouts
- REST
- css modules
- testing with Jest and RTL
