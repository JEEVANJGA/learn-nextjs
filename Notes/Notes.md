# Next.js Application Development Notes

## Step-00

### 1. Project Setup

- Run `npx create-next-app@latest` to create a new Next.js project.
- If you want to create the project in the current directory, run `npx create-next-app@latest .`. Make sure your current directory name is in lower-case.
- Follow the prompts to set up your project with the desired configuration.
- After the setup is complete, navigate to your project directory and run `npm run dev` to start the development server.

### 2. Routing

- Next.js uses a file-based routing system.
- By default, the `app` directory contains the home page route (`page.tsx`).

#### Adding New Routes

- To add new routes, create a new folder in the `app` directory with the desired route name, and within this folder, create a `page.tsx` file, e.g., `app/about/page.tsx` for `/about`.

#### Nested Routes

- For nested routes, create a folder within the `app` directory with the parent route name, and within this folder, create additional folders with `page.tsx` files for sub-routes.
  ```plaintext
  app/
  ├── blog/
  │   ├── page.tsx  // accessible at /blog
  │   ├── first-post/
  │       ├── page.tsx  // accessible at /blog/first-post
  ```

#### Dynamic Routes

- For dynamic routes, create a folder with the route name in square brackets, and within this folder, create a `page.tsx` file, e.g., `app/product/[id]/page.tsx`.
  ```plaintext
  app/
  ├── product/
  │   ├── [id]/
  │       ├── page.tsx  // accessible at /product/:id
  ```
- Example of a dynamic route component:

  ```jsx
  // app/product/[id]/page.tsx
  import { useRouter } from "next/router";

  const ProductPage = () => {
    const router = useRouter();
    const { id } = router.query;

    return <div>Product ID: {id}</div>;
  };

  export default ProductPage;
  ```

#### Important Notes

- Ensure that the `app` directory is at the root of your project.
- Dynamic routes can be nested and combined with static routes.
- Use `getStaticProps` or `getServerSideProps` for data fetching in dynamic routes.

### 3. Layouts

- In `layout.tsx` file, define the layout you want to apply across all pages.
- This layout can be implemented by default in the root layout file.
- If you want to add specific layout changes for a particular route, you can do so by adding a `layout.tsx` file to the respective route folder.
- Example of a root layout component:

  ```jsx
  // app/layout.tsx
  const RootLayout = ({ children }) => {
    return (
      <html>
        <body>
          <header>Header Content</header>
          <main>{children}</main>
          <footer>Footer Content</footer>
        </body>
      </html>
    );
  };

  export default RootLayout;
  ```

- Example of a route-specific layout component:

  ```jsx
  // app/dashboard/layout.tsx
  const DashboardLayout = ({ children }) => {
    return (
      <div>
        <nav>Dashboard Navigation</nav>
        <main>{children}</main>
      </div>
    );
  };

  export default DashboardLayout;
  ```

- Layouts can be nested, allowing you to create complex page structures with shared components.
- Ensure that the `layout.tsx` file is placed correctly to apply the desired layout to the intended routes.

### 4. Route Groups

- If you want to create a specific layout for a specific route, then you have to change the structure of folders with route groups.
- Helps in organizing route groups and project structure, without impacting the URL path.
- Create folders with `()`, for root route group create `(root)` and for dashboard route group create `(dashboard)` folders inside `app` folder.
- Move the dashboard folder into the `(dashboard)` folder.
- Move the about folder and page.tsx from the `app` folder into the `(dashboard)` folder.
- Now create a `layout.tsx` file inside the `(root)` folder.
- Move the `layout.tsx` file from the dashboard folder to the `(dashboard)` folder.
- Route group folder names won't be included in the route path, their purpose is to group various routes that need a common layout and other features (if available).
- Example of a route group structure:
  ```plaintext
  app/
  ├── (root)/
  │   ├── layout.tsx  // Root layout
  ├── (dashboard)/
  │   ├── layout.tsx  // Dashboard layout
  │   ├── about/
  │   │   ├── page.tsx  // About page
  │   ├── dashboard/
  │       ├── page.tsx  // Dashboard page
  ```

### 5. Error Handling

#### error.[j/t]s

- Errors will bubble up to the nearest `error.tsx` file available.
- You can create an `error.tsx` file within the `(root)` folder dedicated to root level.
- If you want a global error handler, you could create one at the `app` folder level with `global-error.tsx` file name.

### 6. Loading UIs

- works very simiarly to error handling.
- can be handled by adding `loading.tsx` file in respective folder.
- In that you can add any kind of loader/spinner
- As your pages loads, this component will be shown first until the page.tsx gets rendered

### 7. Additional topics that can be explored

1. Parallel Routes
2. Interception Routes
3. localization routes

These can be explored from NextJs documentation

### 8. Data Fetching

- Next.js provides several methods for data fetching in your components.
- `getStaticProps`: Fetch data at build time.
- `getServerSideProps`: Fetch data on each request.
- `getStaticPaths`: Define dynamic routes to be pre-rendered based on data.

#### Example of `getStaticProps`:

```jsx
// pages/index.js
export async function getStaticProps() {
  const res = await fetch("https://api.example.com/data");
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

const HomePage = ({ data }) => {
  return (
    <div>
      <h1>Home Page</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default HomePage;
```

#### Example of `getServerSideProps`:

```jsx
// pages/index.js
export async function getServerSideProps() {
  const res = await fetch("https://api.example.com/data");
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

const HomePage = ({ data }) => {
  return (
    <div>
      <h1>Home Page</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default HomePage;
```

#### Example of `getStaticPaths` and `getStaticProps` for dynamic routes:

```jsx
// pages/posts/[id].js
export async function getStaticPaths() {
  const res = await fetch("https://api.example.com/posts");
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://api.example.com/posts/${params.id}`);
  const post = await res.json();

  return {
    props: {
      post,
    },
  };
}

const PostPage = ({ post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default PostPage;
```

### 9. API Routes

- Next.js allows you to create API routes inside the `pages/api` directory.
- Each file in this directory is mapped to `/api/*` and will be treated as an API endpoint.
- Example of a simple API route:
  ```jsx
  // pages/api/hello.js
  export default function handler(req, res) {
    res.status(200).json({ message: "Hello, world!" });
  }
  ```
- You can use dynamic API routes by creating files with square brackets in the `pages/api` directory.
  ```plaintext
  pages/
  ├── api/
  │   ├── [id].js  // Dynamic API route
  ```
- Example of a dynamic API route:
  ```jsx
  // pages/api/[id].js
  export default function handler(req, res) {
    const { id } = req.query;
    res.status(200).json({ message: `ID: ${id}` });
  }
  ```

### 10. SEO & Metadata

- Refer : https://nextjs.org/docs/app/building-your-application/optimizing/metadata

## Step-01

### Project Setup

- create a Next.js project following steps from [1. Project Setup](#1-project-setup) under [Step-00](#step-00).

### Setup Linting

- Run `npm i eslint-config-standard eslint-plugin-tailwindcss eslint-config-prettier prettier --legacy-peer-deps`
- Run `npm i eslint-plugin-import -D --legacy-peer-deps`
- Run `npm i @eslint/compat @eslint/eslintrc @eslint/js -D --legacy-peer-deps`
- Run `npm i eslint-plugin-n -D --legacy-peer-deps`
- Run `npm i eslint-plugin-promise -D --legacy-peer-deps`
- update `eslint.config.mjs` with below content :

  ```js
  import path from "node:path";
  import { fileURLToPath } from "node:url";

  import { FlatCompat } from "@eslint/eslintrc";
  import js from "@eslint/js";
  import importPlugin from "eslint-plugin-import";

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
  });

  const config = [
    {
      ignores: ["components/ui/**/*"],
    },
    ...compat.extends(
      "next/core-web-vitals",
      "next/typescript",
      "standard",
      "plugin:tailwindcss/recommended",
      "prettier"
    ),
    {
      plugins: { import: importPlugin },
      rules: {
        "import/order": [
          "error",
          {
            groups: [
              "builtin",
              "external",
              "internal",
              ["parent", "sibling"],
              "index",
              "object",
            ],
            "newlines-between": "always",
            pathGroups: [
              {
                pattern: "@app/**",
                group: "external",
                position: "after",
              },
            ],
            pathGroupsExcludedImportTypes: ["builtin"],
            alphabetize: {
              order: "asc",
              caseInsensitive: true,
            },
          },
        ],
        "comma-dangle": "off",
      },
    },
    {
      files: ["**/*.ts", "**/*.tsx"],
      rules: {
        "no-undef": "off",
      },
    },
  ];

  export default config;
  ```

- steps to integrate eslint & prettier into VS-Code, follow below steps :

  - create `.vscode` within the project folder.
  - create `settings.json` within `.vscode` folder.
  - will make vscode to save eslint or prettier recommendations you save or exit the file.
  - update with below content :

  ```json
  {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": "explicit",
      "source.addMissingImports": "explicit"
    },
    "prettier.tabWidth": 2,
    "prettier.useTabs": false,
    "prettier.semi": true,
    "prettier.singleQuote": false,
    "prettier.jsxSingleQuote": false,
    "prettier.trailingComma": "es5",
    "prettier.arrowParens": "always",
    "[json]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[typescriptreact]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascriptreact]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "typescript.tsdk": "node_modules/typescript/lib"
  }
  ```

- After making all above changes, add a new script to `package.json` file :

  ```json
    "lint:fix": "next lint --fix"
  ```

- run `npm run lint:fix`

### Setup Tailwind css

- take Solution related config and theme style informations from reference [commit](https://github.com/adrianhajdin/jsmasterypro_devflow/tree/13c179cb2282e1b1587a070e89a07740e94e4d8d) and update `global.css` file and `tailwind.config.ts` file.
- Figma Reference :[Figma Design](https://www.figma.com/design/2vtjgodtBxTdg0zOUHPvXh/JSM-Pro---DevOverflow?node-id=494-4291)

### Setup Fonts

- Download font files from reference [commit](https://github.com/adrianhajdin/jsmasterypro_devflow/tree/4af15966ae046fae2645613d8efb8313c5a530e6).
- Make necessary file changes in root `layout.tsx` file & `global.css` file , to use the downloaded font files.

### Setup Assets & Metadata

- Download assets from [resource](https://drive.google.com/file/d/1nBru53dqIY4__A_WsburhpdiWUbdbncY/view?usp=sharing)
- update assets in public fiolder.
- update Metadata information in `layout.tsx` file

## Step-02

### Enforcing React Version Consistency

- Added the following to `package.json`:

  ```json
  "packageManager": "npm@10.8.2"
  "overrides": {
    "react": "$react",
    "react-dom": "$react-dom"
  }
  ```

- **Explanation:**
  - The `packageManager` field specifies which package manager and version should be used for the project (in this case, npm version 10.8.2). This helps ensure that everyone working on the project uses the same package manager version, reducing environment-related issues.
  - The `overrides` field (supported by npm v8.3.0+) forces all dependencies and sub-dependencies in the project to use the exact versions of `react` and `react-dom` specified in the root `dependencies`.  
    This prevents version conflicts and ensures consistency, especially when some packages require different React versions.

### Setup theme

- For theme handling we will use <a href="https://github.com/pacocoursey/next-themes" target="_blank">`next-themes`</a>
- run `npm i next-themes --legacy-peer-deps`

#### Theme Setup with next-themes

- Created a custom `ThemeProvider` in `context/Theme.tsx` to wrap the `next-themes` provider. This allows for easy theme management and future customization.

  ```tsx
  // context/Theme.tsx
  "use client";

  import {
    ThemeProvider as NextThemeProvider,
    ThemeProviderProps,
  } from "next-themes";
  import React from "react";

  const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
    return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
  };

  export default ThemeProvider;
  ```

- Updated `app/layout.tsx` to wrap the application with this `ThemeProvider`, enabling dynamic theme switching (light/dark/system) based on user or system preference.

  ```tsx
  // app/layout.tsx (excerpt)
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    {children}
  </ThemeProvider>
  ```

- **Explanation:**
  - `attribute="class"`: Applies theme by toggling a CSS class.
  - `defaultTheme="system"`: Uses the user's system theme by default.
  - `enableSystem`: Automatically switches theme based on OS preference.
  - `disableTransitionOnChange`: Prevents CSS transitions when changing themes.

#### Add ShadCN UI

- Run `npx shadcn@latest init`
- proceed - y
- style - new york
- color - slate

#### Add ShadCN UI

- Run `npx shadcn@latest init`
- If you encounter SSL certificate errors (e.g., "unable to get local issuer certificate"), you can temporarily bypass SSL validation for troubleshooting by running:
  ```
  set NODE_TLS_REJECT_UNAUTHORIZED=0
  npx shadcn@latest init
  ```
  > ⚠️ Only use this for local development. For a permanent fix, configure your network or install the required CA certificates.
- proceed - y
- style - new york
- color - slate
- installation fails due to dependency errors.
- Run `npm install tailwindcss-animate class-variance-authority lucide-react clsx tailwind-merge --legacy-peer-deps`
