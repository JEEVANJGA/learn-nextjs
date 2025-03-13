import Hello from "@/app/components/hello.client";

export default function Home() {
  console.log("Which component am I?");

  return (
    <main>
      <div className="my-10 bg-white px-24">
        <div className="flex flex-row justify-center py-5 text-5xl font-bold shadow-xl">
          Welcome to Next.js.
        </div>
      </div>
      <Hello />
    </main>
  );
}
