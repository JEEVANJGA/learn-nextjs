import Hello from "@/app/components/hello.client";

export default function Home() {
  console.log("Which component am I?");

  return (
    <main>
      <div className="my-10 px-24 bg-white">
        <div className="py-5 flex flex-row justify-center font-bold text-5xl shadow-xl">
          Welcome to Next.js.
        </div>
      </div>
      <Hello />
    </main>
  );
}
