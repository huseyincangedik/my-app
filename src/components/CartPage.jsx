import React from "react";
import { useCart } from "./CartContext";

function CartPage() {
  const { cartItems } = useCart();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Sepetim</h2>
      {cartItems.length === 0 ? (
        <h2>Sepetiniz boş</h2>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <h3>{item.name} - {item.price} TL x {item.quantity} ={" "}
                {item.price * item.quantity} TL
                </h3>
              </li>
            ))}
          </ul>
          <h3>Toplam Tutar: {totalPrice} TL</h3>
        </div>
      )}
    </div>
  );
}

export default CartPage;


