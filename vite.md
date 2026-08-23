IN FRONTEND FOLDER:



&#x20;npm create vite@latest .



&#x20;npm I



&#x20;npm run dev







TO MAKE API REQUEST:



fetch: API is built directly into modern browsers, meaning you do not need to install any external packages., 



axios: inside a useEffect hook, Axios is a popular third-party library. It automatically transforms responses into JSON, offers built-in timeout protections, and simplifies complex requests.

To install: npm install axios

import axios from 'axios';



react query: by leveraging modern data-fetching libraries like TanStack Query.

To install: npm install @tanstack/react-query

import { useQuery } from '@tanstack/react-query';

import axios from 'axios';





2 OPTIONS:
1.USE PROXY

2\. WHITE LISTING YOUR URL TO SEREVER		









Below line tells your frontend development server (like React) to send any unknown API requests to your backend server running on port 8000. This avoids CORS errors during development by letting you use short relative paths (like /api/users) instead of full URLs.

"proxy": "http://localhost:8000" (to be added in package.json if create react app is used)





What It Does?

Bypasses CORS(same origin): Your browser thinks your frontend and backend share the same origin, so it allows the requests.

Saves Typing(appends): You can write /login instead of http://localhost:8000/login in your fetch or axios calls.





&#x20;you cannot use the "proxy" field in package.json if you are using Vite. Vite does not look at the package.json file for proxy configurations; instead, you must add the proxy settings inside your vite.config.js (or vite.config.ts) file



IN VITE:



Open your project's root folder and locate vite.config.js.

Update the file to include a server.proxy block.



export default defineConfig({

&#x20; plugins: \[react()],

&#x20; server: {

&#x20;   proxy: {

&#x20;     '/api': {

&#x20;       target: 'http://localhost:8000',

&#x20;       changeOrigin: true,

&#x20;       secure: false,

&#x20;     }

&#x20;   }

&#x20; }





/api: This matches any fetch request in your React code that starts with /api (e.g., fetch('/api/users')).

target: The actual location of your backend server where Vite will redirect those requests.

changeOrigin: true: Changes the origin of the host header to the target URL. This prevents the backend from rejecting the request due to security mismatches.

secure: false: Allows the proxy to work even if your backend server is using a self-signed or unverified SSL/HTTPS certificate.



TO RUN FRONTEND:

**npm run dev**



TO RUN BACKEND:

**npm run** 

**npm run start**





**Backend Channel: Port 8000**

**Frontend Channel: Port 3000 (or 5173 if using Vite)**



&#x20;During local development, your backend and frontend must have different port numbers.They are two completely separate programs running on your machine, and your computer cannot assign the same port number to two different programs at the same time.



How it works when you run them🧭 

Frontend: Runs on its own port (e.g., http://localhost:5173 for Vite or http://localhost:3000 for Create React App). You open this URL in your browser to see your website.



⚙️ Backend (Express): Runs on a different port (e.g., http://localhost:8000). It sits quietly in the background waiting to serve data.



🌉 The Proxy: Acts as a bridge. When your frontend asks for /api/jokes, the proxy automatically redirects that request to http://localhost:8000/api/jokes behind the scenes.





When you run npm run build, Vite takes all your raw React components, CSS files, and images, transforms them, and packs them into a single, highly optimized folder named dist containing static files (pure HTML, CSS, and JavaScript).Browsers cannot natively read raw React components or JSX code. They only understand standard static files.



1\. What is npm run build?

This is the compiler command. When you are developing, Vite updates your browser instantly using a temporary development server. But when you are ready to publish your website live, you run npm run build.It strips away all development tools.It converts JSX and modern JavaScript into code that every old and new browser can understand.It minifies your files (removes all spaces, comments, and shortens variable names to make file sizes tiny).



2\. What is the dist folder?

The name dist stands for Distribution. It is the final product folder generated automatically when you run npm run build.This folder is completely self-contained.It contains everything needed to run your website.When you buy web hosting (like Netlify, Vercel, or AWS), the dist folder is the only folder you upload to the internet. You do not upload your src folder or your node\_modules folder.





3\. What are Static Files?

Static files are files that do not change on their own when a user requests them. They sit passively on a server until a browser asks for them. In your dist folder, you will typically see:index.html: The single entry point page of your website..js files: Your entire React logic squished into compressed files..css files: All your styles combined and stripped of empty spaces.Images/Logos: Optimized versions of your assets.





You only use npm run build once at the very end when you are completely finished writing your code and want to launch your website live on the internet.

