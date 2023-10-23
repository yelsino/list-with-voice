function ListasSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-y-4">
        {[1, 2, 3, 4, 5].map((lista, index: any) => (
          <div
            className="text-secondary-100 bg-primary-100 px-3 cursor-pointer flex justify-between items-center rounded-lg text-lg py-7 animate-pulse"
            key={index}
          ></div>
        ))}
      </div>
    </>
  );
}

export default ListasSkeleton;
