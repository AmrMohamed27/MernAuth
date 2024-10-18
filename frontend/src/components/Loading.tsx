import { Loader2 } from "lucide-react";

const Loading = ({ isLoading }: { isLoading: boolean }) => {
  return (
    isLoading && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <Loader2 className="w-24 h-24 text-white animate-spin" />
      </div>
    )
  );
};

export default Loading;
