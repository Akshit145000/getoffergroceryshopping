import { useNavigate } from "react-router-dom";

const Shopcart = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen  px-4 sm:px-8 py-6">
      <div className="max-w-6xl mx-auto  p-6">
        {/* Heading */}
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-8">
          Shopping Cart
        </h1>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm sm:text-base">
            <thead>
              <tr className="border-b bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
                <th className="py-4 px-4 text-left">Product</th>
                <th className="py-4 px-4 text-center">Price</th>
                <th className="py-4 px-4 text-center">Quantity</th>
                <th className="py-4 px-4 text-center">Total</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b hover: transition">
                <td className="py-6 px-4 text-wrap text-gray-800 font-medium">
                  Combo of 5 kg Fortune oil + 5 kg sugar + 5 kg Basmati rice
                </td>

                <td className="py-6 px-4 text-center text-gray-700">
                  ₹298
                </td>

                <td className="py-6 px-4 text-center text-gray-700">
                  1
                </td>

                <td className="py-6 px-4 text-center font-semibold text-gray-900">
                  ₹298
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-10 gap-4">
          {/* Total Summary */}
          <div className="text-lg font-semibold text-gray-800">
            Subtotal: <span className="text-green-600">₹298</span>
          </div>

          {/* Checkout Button */}
          <button
            onClick={() => navigate("/cart/checkout")}
            className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-2 rounded-xs tracking-wide shadow-sm"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Shopcart;
