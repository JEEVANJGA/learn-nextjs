# Next.js Application Development Notes

## 1. Project Setup

- Run `npx create-next-app@latest` to create a new Next.js project.
- If you want to create the project in the current directory, run `npx create-next-app@latest .`. Make sure your cuurent directory name is in lower-case.
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
- In layout.tsx file, simply add the page layout you want across all the pages.
- Above change can be implemented by default in root layout file.
- if you want to add specific layout changes for a particular route, you can do it by adding layout.tsx file to the respective route folder directory.

## 4. Route Groups
- if you want to create specific layout for a specific route, then you have to change the structure of folders with route groups.
- helps in organoizing route groups and project structure, without impacting the url path.
- create folders with `()`, for root route group create `(root)` and for dashboard route group create `(dashboard)` folders inside `app` folder.
- move dashboard folder into `(dashboard)` folder.
- move about folder and page.tsx from `app` folder into `(dashboard)` folder.
- now create a `layout.tsx` file inside  `(root)` folder.
- move `layout.tsx` file from dashboard folder to `(dashboard)` folder.
- route group folder name wont be included in the route path, its purpose is to group various routes that needs a common layout and other features ( if available ).