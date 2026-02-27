import { createContext, useState, useContext } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [item, setItem] = useState(0);

  return (
    <CartContext.Provider value={{ item, setItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => {
  return useContext(CartContext);
};
