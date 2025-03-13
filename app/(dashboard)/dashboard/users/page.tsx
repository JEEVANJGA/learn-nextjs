import Link from "next/link";

const page = () => {
  return (
    <main>
      <div className="my-10 bg-white px-24">
        <div className="flex flex-row justify-center py-5 text-5xl font-bold shadow-xl">
          Users
        </div>
        <div className="mt-4">
          <h1 className="text-2xl font-bold">Dashboard Users</h1>
          <ul className="mt-2">
            <li>
              <Link href="/dashboard/users/1">User 1</Link>
            </li>
            <li>
              <Link href="/dashboard/users/2">User 2</Link>
            </li>
            <li>
              <Link href="/dashboard/users/3">User 3</Link>
            </li>
            <li>
              <Link href="/dashboard/users/4">User 4</Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};

export default page;
