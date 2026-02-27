import { useEffect, useState } from "react";
import { useCart } from "./context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [timeLeft, setTimeLeft] = useState(15 * 60 + 43);

  const { item, setItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="overflow-hidden w-2/3 mx-auto  m-10 ">
      {/* Top Banner */}
      <div className="flex flex-col items-center text-center">
        {/* Image Section */}
        <div className="mt-6">
          <img src="/product.jpg" alt="Offer" className="h-40  object-cover " />
        </div>

        <p className="text-green-600 font-semibold mt-4">1 Day Delivery</p>
      </div>

      {/* Offer Details */}
      <div className="p-6">
        <p className="text-gray-700 text-sm mb-2">
          Dmart Offer today: Combo of 5 kg Fortune oil + 5 kg sugar + 5 kg
          Basmati rice
        </p>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-green-600 font-bold text-lg">70% Off</span>
          <span className="text-gray-400 line-through">₹999</span>
          <span className="text-black font-bold text-xl">₹298</span>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Offer ends in:{" "}
          <span className="text-red-500 font-semibold">
            {minutes} min {seconds < 10 ? `0${seconds}` : seconds} sec
          </span>
        </p>
        {/* Buttons */}
        <div className="flex gap-4">
          <button
            disabled={item >= 1}
            onClick={() => {
              setItem(item + 1);
              toast.success("Item added to cart!");
              navigate("/cart/shopcart");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`${item >= 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} text-white py-2 rounded-sm  flex-1`}
          >
            Add To Cart
          </button>
          <button
            onClick={() => {
              navigate("/cart/shopcart");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-sm "
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
