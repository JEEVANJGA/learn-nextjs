import Hello from "@/app/components/hello.client";

const Page = () => {
  return (
    <main>
      <div className="my-10 bg-white px-24">
        <div className="flex flex-row justify-center py-5 text-5xl font-bold shadow-xl">
          About
        </div>
      </div>
      <Hello />
    </main>
  );
};

export default Page;
