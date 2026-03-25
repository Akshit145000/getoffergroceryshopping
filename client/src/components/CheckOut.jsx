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
      payment: "credit", // ✅ default always card
    },
  });

  const selectedPayment = watch("payment");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      await checkout(data);

      toast.success("Order placed successfully ✅"); // ✅ fixed
      navigate("/");
    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="min-h-screen px-4 sm:px-8 py-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Billing */}
          <div>
            <h2 className="text-lg font-semibold mb-6">Billing Details</h2>

            <input
              type="text"
              placeholder="Full Name *"
              {...register("fullName", { required: "Full name is required" })}
              className="w-full border p-3 mb-2"
            />
            {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}

            <input
              type="text"
              placeholder="Mobile Number *"
              {...register("phoneNumber", {
                required: "Mobile number required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter valid 10 digit number",
                },
              })}
              className="w-full border p-3 mb-2"
            />
            {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}

            <input
              type="text"
              placeholder="City *"
              {...register("city", { required: "City required" })}
              className="w-full border p-3 mb-2"
            />
            {errors.city && <p className="text-red-500">{errors.city.message}</p>}

            <input
              type="text"
              placeholder="State *"
              {...register("state", { required: "State required" })}
              className="w-full border p-3 mb-2"
            />
            {errors.state && <p className="text-red-500">{errors.state.message}</p>}

            <input
              type="text"
              placeholder="Address *"
              {...register("address", { required: "Address required" })}
              className="w-full border p-3 mb-2"
            />
            {errors.address && <p className="text-red-500">{errors.address.message}</p>}

            <input
              type="text"
              placeholder="Pincode *"
              {...register("pincode", {
                required: "Pincode required",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Invalid pincode",
                },
              })}
              className="w-full border p-3"
            />
            {errors.pincode && <p className="text-red-500">{errors.pincode.message}</p>}
          </div>

          {/* Order */}
          <div className="border p-4 rounded">
            <h2 className="text-xl font-semibold mb-4">Your Order</h2>

            <p className="mb-4">Quantity: 1 | Total: ₹298</p>

            {/* Payment Options */}
            <div className="space-y-2 mb-4">
              <label className="flex gap-2">
                <input
                  type="radio"
                  value="credit"
                  {...register("payment", { required: true })}
                />
                Credit Card
              </label>

              <label className="flex gap-2">
                <input
                  type="radio"
                  value="debit"
                  {...register("payment", { required: true })}
                />
                Debit Card
              </label>

              <label className="flex gap-2 text-gray-400">
                <input type="radio" value="cod" disabled />
                Cash on Delivery (Not available)
              </label>
            </div>

            {/* Card Fields */}
            {(selectedPayment === "credit" || selectedPayment === "debit") && (
              <>
                <input
                  type="text"
                  placeholder="Card Number"
                  {...register("cardNumber", {
                    required: "Card number required",
                    pattern: {
                      value: /^[0-9]{16}$/,
                      message: "Must be 16 digits",
                    },
                  })}
                  className="w-full border p-3 mb-2"
                />
                {errors.cardNumber && <p className="text-red-500">{errors.cardNumber.message}</p>}

                <div className="flex gap-2">
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
                    className="border p-3 w-1/2"
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
                    className="border p-3 w-1/2"
                  />
                </div>

                {errors.mm && <p className="text-red-500">{errors.mm.message}</p>}
                {errors.yy && <p className="text-red-500">{errors.yy.message}</p>}

                <input
                  type="text"
                  placeholder="CVV"
                  {...register("cvv", {
                    required: "CVV required",
                    pattern: {
                      value: /^[0-9]{3}$/,
                      message: "Invalid CVV",
                    },
                  })}
                  className="w-1/2 border p-3 mt-2"
                />
                {errors.cvv && <p className="text-red-500">{errors.cvv.message}</p>}
              </>
            )}

            <button
              type="submit"
              disabled={!isValid || isLoading}
              className={`w-full mt-6 py-3 text-white ${
                isValid ? "bg-green-600" : "bg-gray-400"
              }`}
            >
              {isLoading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Checkout;
