import { CartItem } from "../types/Cart";


export async function fetchCart(userId: number): Promise<CartItem[]> {
  const cartResponse = await fetch(`http://localhost:3000/bff/carts/items/${userId}`);
  if (!cartResponse.ok) throw new Error("Failed to fetch cart items");
  const cartItems = await cartResponse.json(); // [{ id, name, description, price, imageUrl, quantity }]
  console.log("Fetched cart items:", cartItems);
  return cartItems;
}

//Remove item from cart
export async function deleteCartItem(userId: number, itemId: number): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`http://localhost:3000/bff/carts/${userId}/${itemId}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Failed to remove item from cart");
  return { success: true, message: "Item removed from cart." };
}

//Place order new
export async function placeOrder( userId: number, cart: CartItem[], totalAmount:number ): Promise<{ success: boolean; message: string }> {
  console.log("Placing order with cart items:", cart);
  const response = await fetch("http://localhost:3000/bff/orders", {
    method: "POST",
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify({
      userId,
      cartItems: cart,
      totalAmount,
    }),
  });

  if (!response.ok) throw new Error("Failed to place order");

  const result = await response.json();
  return { success: true,message: result.message || "Order placed successfully!"};
}

export async function updateQuantity(userId: number, itemId: number, quantity: number) {
  console.log("Updating item quantity:", { userId, itemId, quantity });


  const payload = {
    productQuantities: {
      [itemId]: quantity, // ✅ dynamic key
    },
  };

  const response = await fetch(`http://localhost:3000/bff/carts/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  console.log("Update cart item quantity response:", response);
  if (!response.ok) throw new Error("Failed to update cart item quantity");
  return response.json();
}

// export async function patchCart( userId: number, cartDTO) : Promise<CartItem[]> {
  
//   const response = await fetch(`http://localhost:3000/bff/carts/${userId}`, { 
//     method : "PATCH",
//     headers: {"Content-Type": "application/json",},
//     body: JSON.stringify({
//       userId,
//       cartDTO
//     }),
//   });

//   if (!response.ok) throw new Error("Failed to update cart");

//   const updatedCart = await response.json();
//   return updatedCart;
  

// }