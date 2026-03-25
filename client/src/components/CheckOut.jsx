import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { checkout } from "./api";
import toast from "react-hot-toast";
import { useState } from "react";

const Checkout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      payment: "credit",
    },
  });

  const selectedPayment = watch("payment");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      await checkout(data);
      navigate("/");
      toast.error("Something went wrong. Please try again.");
    } catch (error) {
      console.error("Checkout failed:", error);
      setIsLoading(false);
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="min-h-screen px-4 sm:px-8 py-6">
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Billing Details */}
          <div>
            <h2 className="text-lg font-semibold mb-6">Billing Details</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name *"
                {...register("fullName", { required: "Full name is required" })}
                className="w-full border border-gray-400 p-3 rounded bg-white"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">
                  {errors.fullName.message}
                </p>
              )}

              <div className="flex">
                <span className="border border-gray-400 rounded-l border-r-0 p-3 bg-gray-100 text-sm">
                  +91
                </span>
                <input
                  type="text"
                  placeholder="Mobile Number *"
                  {...register("phoneNumber", {
                    required: "Mobile number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter valid 10 digit number",
                    },
                  })}
                  className="w-full border border-gray-400 p-2 rounded-r"
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">
                  {errors.phoneNumber.message}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="City *"
                  {...register("city", { required: "City is required" })}
                  className="border border-gray-400 p-3 rounded"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm">{errors.city.message}</p>
                )}

                <input
                  type="text"
                  placeholder="State *"
                  {...register("state", { required: "State is required" })}
                  className="border border-gray-400 p-3 rounded"
                />
                {errors.state && (
                  <p className="text-red-500 text-sm">{errors.state.message}</p>
                )}
              </div>

              <input
                type="text"
                placeholder="Address *"
                {...register("address", { required: "Address is required" })}
                className="w-full border border-gray-400 p-3 rounded"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}

              <input
                type="text"
                placeholder="Pincode / Zip *"
                {...register("pincode", {
                  required: "Pincode is required",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Enter valid 6 digit pincode",
                  },
                })}
                className="w-full border border-gray-400 p-3 rounded"
              />
              {errors.pincode && (
                <p className="text-red-500 text-sm">{errors.pincode.message}</p>
              )}
            </div>
          </div>

          {/* Order Section */}
          <div className="border border-gray-200 rounded p-4">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Your Order</h2>

              {/* Payment Options */}
              <div className="space-y-2 mb-4">
                {["credit", "debit", "cod"].map((type) => (
                  <label
                    key={type}
                    className={`flex items-center gap-2 ${
                      type === "cod" ? "text-gray-400" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      value={type}
                      disabled={type === "cod"}  // ✅ COD disabled ONLY
                      {...register("payment", { required: true })}
                    />
                    {type === "cod"
                      ? "Cash on delivery (Not available)"
                      : `${
                          type.charAt(0).toUpperCase() + type.slice(1)
                        } Card`}
                  </label>
                ))}
              </div>

              {/* Card Details */}
              {(selectedPayment === "credit" ||
                selectedPayment === "debit") && (
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    {...register("cardNumber", {
                      required: "Card number is required",
                    })}
                    className="w-full border border-gray-400 p-3 rounded"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={!isValid || isLoading}
                className={`w-full mt-6 py-3 rounded text-white ${
                  isValid ? "bg-green-600" : "bg-gray-400"
                }`}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Checkout;
