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
        {/* Progress Bar */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-3 left-0 right-0 h-1 bg-gray-300">
              <div className="h-1 bg-green-600 w-1/2 transition-all duration-500"></div>
            </div>

            {/* Stepper Circles */}
            <div className="relative z-10 text-center">
              <div className="w-7 h-7 rounded-full bg-green-600 text-white flex items-center justify-center text-sm">
                1
              </div>
              <p className="text-sm mt-1">View Cart</p>
            </div>
            <div className="relative z-10 text-center">
              <div className="w-7 h-7 rounded-full bg-green-600 text-white flex items-center justify-center text-sm">
                2
              </div>
              <p className="text-sm mt-1">Checkout</p>
            </div>
            <div className="relative z-10 text-center">
              <div className="w-7 h-7 rounded-full border-2 border-green-600 text-green-600 flex items-center justify-center text-sm">
                3
              </div>
              <p className="text-sm mt-1">Finish</p>
            </div>
          </div>
        </div>

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
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 text-center">
              <p className="text-sm md:text-base font-medium">
                ( Please activate your E-commerce transaction in your Card )
              </p>

              <div className="flex items-center justify-center gap-2  text-green-800 font-semibold">
                <span className="bg-green-600 text-white rounded-sm px-1">
                  ✓
                </span>
                <span>
                  कृपया अपने डेबिट और क्रेडिट कार्ड का ऑनलाइन ट्रांजेक्शन ऑन
                  करें
                </span>
                <span className="bg-green-600 text-white rounded-sm px-1">
                  ✓
                </span>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Your Order</h2>
              <div className="border-t border-gray-300 pt-4 mb-4">
                <p className="font-medium">| Quantity: 1 | Total: ₹298</p>
              </div>

              {/* Payment Options */}
              <div className="space-y-2 mb-4">
                {["credit", "debit", "cod"].map((type) => (
                  <label key={type} className="flex items-center gap-2">
                    <input
                      type="radio"
                      value={type}
                      {...register("payment", { required: true })}
                    />
                    {type === "cod"
                      ? "Cash on delivery"
                      : `${type.charAt(0).toUpperCase() + type.slice(1)} Card`}
                  </label>
                ))}
              </div>

              {/* Card Details */}
              {(selectedPayment === "credit" ||
                selectedPayment === "debit") && (
                <div className="space-y-4">
                  <p className="text-red-500 text-sm">Card Details</p>
                  <input
                    type="text"
                    placeholder="Card Number"
                    {...register("cardNumber", {
                      required: "Card number is required",
                      pattern: {
                        value: /^[0-9]{16}$/,
                        message: "Card must be 16 digits",
                      },
                    })}
                    className="w-full border border-gray-400 p-3 rounded"
                  />
                  {errors.cardNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.cardNumber.message}
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM"
                      {...register("mm", {
                        required: "Month required",
                        pattern: {
                          value: /^(0[1-9]|1[0-2])$/,
                          message: "Invalid month",
                        },
                      })}
                      className="border border-gray-400 p-3 rounded"
                    />
                    <input
                      type="text"
                      placeholder="YY"
                      {...register("yy", {
                        required: "Year required",
                        pattern: {
                          value: /^[0-9]{2}$/,
                          message: "Invalid year",
                        },
                      })}
                      className="border border-gray-400 p-3 rounded"
                    />
                  </div>
                  {errors.month && (
                    <p className="text-red-500 text-sm">
                      {errors.month.message}
                    </p>
                  )}
                  {errors.year && (
                    <p className="text-red-500 text-sm">
                      {errors.year.message}
                    </p>
                  )}

                  <input
                    type="text"
                    placeholder="CVV"
                    {...register("cvv", {
                      required: "CVV required",
                      pattern: {
                        value: /^[0-9]{3}$/,
                        message: "CVV must be 3 digits",
                      },
                    })}
                    className="w-1/2 border border-gray-400 p-3 rounded"
                  />
                  {errors.cvv && (
                    <p className="text-red-500 text-sm">{errors.cvv.message}</p>
                  )}
                </div>
              )}

              {/* COD Warning */}
              {selectedPayment === "cod" && (
                <div className="bg-yellow-100 text-yellow-800 p-3 rounded text-sm">
                  Cash on Delivery not available at this moment.
                  Please choose another payment method.
                </div>
              )}

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={!isValid || isLoading}
                className={`w-full mt-6 py-3 rounded text-white transition ${
                  isValid && !isLoading
                    ? "bg-green-600"
                    : "bg-gray-400 cursor-not-allowed"
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
