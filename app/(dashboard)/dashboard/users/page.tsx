import Link from "next/link";

const page = () => {
  return (
    <main>
      <div className="my-10 px-24 bg-white">
        <div className="py-5 flex flex-row justify-center font-bold text-5xl shadow-xl">
          Users
        </div>
        <div className="mt-4">
          <h1 className="font-bold text-2xl">Dashboard Users</h1>
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
