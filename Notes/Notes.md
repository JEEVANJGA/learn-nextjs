# Next.js Application Development Notes

## 1. Project Setup

- Run `npx create-next-app@latest` to create a new Next.js project.
- If you want to create the project in the current directory, run `npx create-next-app@latest .`. Make sure your current directory name is in lower-case.
- Follow the prompts to set up your project with the desired configuration.
- After the setup is complete, navigate to your project directory and run `npm run dev` to start the development server.

## 2. Routing

- Next.js uses a file-based routing system.
- By default, the `app` directory contains the home page route (`page.tsx`).

### Adding New Routes
- To add new routes, create a new folder in the `app` directory with the desired route name, and within this folder, create a `page.tsx` file, e.g., `app/about/page.tsx` for `/about`.

### Nested Routes
- For nested routes, create a folder within the `app` directory with the parent route name, and within this folder, create additional folders with `page.tsx` files for sub-routes.
    ```plaintext
    app/
    ├── blog/
    │   ├── page.tsx  // accessible at /blog
    │   ├── first-post/
    │       ├── page.tsx  // accessible at /blog/first-post
    ```

### Dynamic Routes
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
    import { useRouter } from 'next/router';

    const ProductPage = () => {
        const router = useRouter();
        const { id } = router.query;

        return <div>Product ID: {id}</div>;
    };

    export default ProductPage;
    ```

### Important Notes
- Ensure that the `app` directory is at the root of your project.
- Dynamic routes can be nested and combined with static routes.
- Use `getStaticProps` or `getServerSideProps` for data fetching in dynamic routes.

## 3. Layouts

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

## 4. Route Groups
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

## 5. API Routes

- Next.js allows you to create API routes inside the `pages/api` directory.
- Each file in this directory is mapped to `/api/*` and will be treated as an API endpoint.
- Example of a simple API route:
    ```jsx
    // pages/api/hello.js
    export default function handler(req, res) {
        res.status(200).json({ message: 'Hello, world!' });
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

## 6. Data Fetching

- Next.js provides several methods for data fetching in your components.
- `getStaticProps`: Fetch data at build time.
- `getServerSideProps`: Fetch data on each request.
- `getStaticPaths`: Define dynamic routes to be pre-rendered based on data.

### Example of `getStaticProps`:
```jsx
// pages/index.js
export async function getStaticProps() {
    const res = await fetch('https://api.example.com/data');
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

### Example of `getServerSideProps`:
```jsx
// pages/index.js
export async function getServerSideProps() {
    const res = await fetch('https://api.example.com/data');
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

### Example of `getStaticPaths` and `getStaticProps` for dynamic routes:
```jsx
// pages/posts/[id].js
export async function getStaticPaths() {
    const res = await fetch('https://api.example.com/posts');
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

## 7. Error Handling

### error.[j/t]s
- Errors will bubble up to the nearest `error.tsx` file available.
- You can create an `error.tsx` file within the `(root)` folder dedicated to root level.
- If you want a global error handler, you could create one at the `app` folder level with `global-error.tsx` file name.