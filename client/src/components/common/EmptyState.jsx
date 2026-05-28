import { ClipboardList } from "lucide-react";

const EmptyState = () => {

  return (
    <div className="flex flex-col items-center justify-center py-24">

      <div className="bg-blue-100 dark:bg-gray-800 p-6 rounded-full mb-6">

        <ClipboardList
          size={60}
          className="text-blue-600"
        />

      </div>

      <h2 className="text-3xl font-bold mb-3">
        No Tasks Found
      </h2>

      <p className="text-gray-500 text-center max-w-md">
        Start by creating your first task and organize your workflow efficiently.
      </p>

    </div>
  );
};

export default EmptyState;