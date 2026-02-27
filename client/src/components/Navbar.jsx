import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useCart } from "./context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { item } = useCart();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-[#FFFFFF] shadow-sm shadow-gray-300 px-4 sm:px-8 py-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-gray-800 cursor-pointer"
        >
          <img width={80} height={80} src="./logo.png" alt="Logo" />
        </div>

        {/* Cart Section */}
        <div
          onClick={() => {
            if (item > 0) {
              navigate("/cart/shopcart");
            }
          }}
          className={`relative 
    ${item > 0 ? "cursor-pointer" : "cursor-not-allowed"}
  `}
        >
          <ShoppingCartIcon className="h-7 w-7 text-gray-700 hover:text-black transition duration-200" />

          {/* Cart Badge */}
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
            {item}
          </span>
        </div>
      </div>
    </nav>
  );
}
