// components/ui/AlertBar.jsx
import { useEffect } from "react";

function AlertBar({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Auto-dismiss after 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up">
      {message}
    </div>
  );
}

export default AlertBar;

// function AlertBar({ message, visible }) {
//   return (
//     <div
//       className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-full text-white font-semibold shadow-md transition-all duration-300
//         ${
//           visible ? "bg-red-500 opacity-100" : "opacity-0 pointer-events-none"
//         }`}
//     >
//       {message}
//     </div>
//   );
// }

// export default AlertBar;
