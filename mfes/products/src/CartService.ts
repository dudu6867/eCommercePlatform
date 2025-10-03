export async function addToCart(userId: number, productId: number) {
  const response = await fetch(`http://localhost:3000/bff/carts/${userId}/${productId}`, {
    method: "POST",
  });
  console.log("Add to cart response:", response);
  if (!response.ok) throw new Error("Failed to add to cart");
  return response.json();
}
