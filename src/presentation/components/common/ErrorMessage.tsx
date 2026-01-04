interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage = ({ message = 'Ha ocurrido un error' }: ErrorMessageProps) => {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
        <div className="flex items-center gap-3">
          <div className="text-red-500 text-3xl">⚠️</div>
          <div>
            <h3 className="text-red-800 font-bold text-lg">Error</h3>
            <p className="text-red-600 mt-1">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
