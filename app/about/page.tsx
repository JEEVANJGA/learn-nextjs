import Hello from "@/app/components/hello.client";

const Page = () => {
  return (
    <main>
      <div className="my-10 px-24 bg-white">
        <div className="py-5 flex flex-row justify-center font-bold text-5xl shadow-xl">
          About
        </div>
      </div>
      <Hello />
    </main>
  );
};

export default Page;
