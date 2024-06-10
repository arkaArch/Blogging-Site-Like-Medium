## STEP-I: The stack:
We’ll be building medium in the following stack
1. React in the frontend
2. Cloudflare workers in the backend
3. zod as the validation library, type inference for the frontend types
4. Typescript as the language
5. Prisma as the ORM, with connection pooling
6. Postgres as the database
7. jwt for authentication

<br />

## STEP-II: Initialize the backend
1. Create a project folder: `mkdir Blogging-Site-Like-Medium` and go inside it with: `cd Blogging-Site-Like-Medium`

2. Initialize the backend with hono: `npm create hono@latest`

    * Target directory: backend
    * Template to use: cloudflare-workers
    * Install project dependencies: yes
    * Package manager to use: npm

    Go inside it with: `cd backend` and check if the application is running with: `npm run dev`

<br />

## STEP-III: Initialize handlers
To begin with, our backend will have 6 routes
1. POST: /api/v1/user/signup
2. POST: /api/v1/user/signin
3. POST: /api/v1/blog       (Post a blog)
4. PUT: /api/v1/blog        (Update a blog)
5. GET /api/v1/blog/bulk    (Get all the blogs)
6. GET /api/v1/blog/:id     (Get the blog with id)

<br />

## STEP-IV: Initialize DB (prisma):
1. Get your connection url from neon.db or aieven.tech
2. Get connection pool URL from Prisma accelerate
3. Initialize prisma in your project in backend with: `npm install prisma` and `npx prisma init`
4. Replace `DATABASE_URL` variable in `.env` file with the neon-db connection url. (for prisma migration). Your `.env` should be in `.gitignore`.
5. Add `DATABASE_URL` as the connection pool url(Prisma Accelerate API Key) in `wrangler.toml`. (When we run `npm run dev` and `npm run deploy`, the db url picked from here. So cloudflare workers use this url.)
6. Now Initialize the schema in prisma/schema.prisma
7. Migrate your database with: `npx prisma migrate dev --name init_schema`
8. Generate the prisma client for edge connection with: `npx prisma generate --no-engine`
9. Add the accelerate extension with: `npm install @prisma/extension-accelerate`
10. Initialize the prisma client. Add below two lines in `index.ts` file. 
    ```ts
    import { PrismaClient } from '@prisma/client/edge'
    import { withAccelerate } from '@prisma/extension-accelerate'
    ```

<br />

## STEP-V: Create non auth routes:
1. Create simple signup route with `prisma.user.create()`.
2. Add JWT to signup route, with `hono/jwt`. Store the JWT_SECRET as a variable(`[vars]`) in `wrangler.toml` 
3. Create siginin route with `prisma.user.findUnique()`.

<br />

## STEP-VI: Middlewares:
1. Add middlewares for the routes `/api/v1/blog/*`
2. Receive the jwt from "Authorization" part of header
3. Verify the header
4. Set it the value of `id` extracted from token to `userID`.
5. Pass the `userID` Variable as Generics to the constructor of Hono to make it type-safe.
6. Later `get` the token as `userID`.{ like: `const id = c.get("userID")`}

<br />

## Step-VII: Blog routes and better routing:
1. Hono let’s you group routes together so you can have a cleaner file structure.
2. Create two new files inside `/src/routes` named  
`user.ts` and `blog.ts`. Move the all the user logic to `user.ts` and blog logic(middleware also) to `blog.ts`. Import them to `index.ts`.
3. Create all the route logic in `blog.ts`. Make sure first write logic for `/bulk` and then `/:id`, else the get request for `bulk` is misinterpreted as an `id`.
4. `/:id` is passed as url `localhost:8787/api/v1/blog/clx8nxuq1876111n673k1c4rz`

<br />

## Step-VIII: Deploy your app:
1. Make sure you're inside backend folder.
2. Login to cloudflare account by: `npx wrangler login`
3. The deploy your app with: `npm run deploy`. It will gives you url like: `https://backend.arkakar1313.workers.dev`.

<br />

## Step-IX: Zod validation / Initialise common:
1. Now we can install zod, and declare schema for signup, signin route, and use them. But in this approach the problem is, frontend has no access to them. If any other person handle the frontend code, then it'll be difficult for him to see the code in routes.

2. To solve this you can use zod validations in another file and export from there, and you also can use `type inference` like `type SignupInput = z.infer<typeof signup_schema>`. But that's not the best approach, since still the frontend developer have to go into backend folder and search for the correct file to find the type.

3. So we divide our project into three modules, `backend`, `frontend` and `common`. 

4. `common` will contain all the things that frontend and backend want to share. We will make `common` an independent npm module for now. 

5. Eventually, we will see how monorepos make it easier to have multiple packages sharing code in the same repo.

6. Make a folder name `common` into your project. `cd` into it. Then initialize an empty ts project with: 
    * `npm init -y`
    * `npx tsc --init`
    * Go to `tsconfig.json` and set `rootDir` to `./src` and `outDir` to `./dist`. 
    * Also change `declaration` to `true` for declaration file(`index.d.ts`), else you can't import correctly from common-modules `index.js` to your ts file.
    * `mkdir src`
    * `touch src/index.ts`
    * `npm i zod`

7. Write the schema and types of the schema and compile it with `tsc -b`.

8. Publish it to npm:
    * Go to `npmjs.com` and create an account. username --> arka1313
    * Now come to terminal and run `npm login`.
    * Go to `package.json` and change the name of your package from `common` to `@arka1313/blogsite-common`. Also change the `main` section from `index.js` to `dist/index.js`
    * Add a file `.npmignore` and add the folder `src` to it to ignore the folder from publishing.
    * Now publish it with: `npm publish --access public`
    * You can see that in your account and also can see that locally by run the command: `npm pack`.
    * ⚠️ If you change something in the common folder then change `version` in `package.json` else you will not able to publish it.


<br />

## Step X: Import zod in backend:

1. Go to the backend folder.
2. Install the package you published to npm: `npm i @arka1313/blogsite-common`
3. Update the routes to do zod validation on them.

<br />
<br />

## Step XI: Init the frontend project:
1. Initialise a react app: `npm create vite@latest`
    * ✔ Project name: … frontend
    * ✔ Select a framework: › React
    * ✔ Select a variant: › TypeScript

2. Initialise tailwind:
    * `npm install -D tailwindcss postcss autoprefixer`
    * `npx tailwindcss init -p`
    * Update `tailwind.config.js`
        ```js
        /** @type {import('tailwindcss').Config} */
        export default {
        content: [
            "./index.html",
            "./src/**/*.{js,ts,jsx,tsx}",
        ],
        theme: {
            extend: {},
        },
        plugins: [],
        }
        ```

3. Empty up `App.css` and `index.css`. Delete `public` and `src/assets` folders.

4. Update index.css
    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

5. Install blogsite/common package with: `npm i @arka1313/blogsite-common`

<br />

## Step XII: Add react-router-dom:
1. Create a folder `pages` inside `src` and cretae three components, `Signup`,`Signin`,`Blogs`.
2. Add react-router-dom: `npm i react-router-dom`
3. Add routing in `App.tsx`.
4. Creates the components
