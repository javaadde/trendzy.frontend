import { createContext, useContext, useState, useEffect } from "react";
import axios from "../axios";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  const fetchCart = async () => {
    try {
      const res = await axios.get("/cart");
      if (res.data && res.data.items) {
        setCartItems(res.data.items);
        setCartCount(res.data.items.length);
        setTotal(res.data.subtotal || 0);
      }
    } catch (err) {
      console.error("Cart fetch failed", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [updateTrigger]);

  const refreshCart = () => setUpdateTrigger((prev) => prev + 1);

  return (
    <CartContext.Provider value={{ cartCount, cartItems, total, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => useContext(CartContext);
