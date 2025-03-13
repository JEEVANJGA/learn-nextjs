const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return (
    <main>
      <div className="my-10 bg-white px-24">
        <div className="flex flex-row justify-center py-5 text-5xl font-bold shadow-xl">
          User details for user ID : {id}
        </div>
      </div>
    </main>
  );
};

export default page;
