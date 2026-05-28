import { motion } from "framer-motion";

const Modal = ({ isOpen, onClose, children, size = "max-w-lg" }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        className={`bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full ${size} p-6 border border-gray-200 dark:border-gray-800`}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;
