export const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-colombia-blue border-t-transparent rounded-full animate-spin"></div>
        <div className="mt-4 text-center">
          <p className="text-colombia-blue font-semibold">Cargando...</p>
        </div>
      </div>
    </div>
  );
};
