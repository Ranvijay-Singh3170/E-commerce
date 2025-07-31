import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-center text-lg">No items in cart.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4"
            >
              {/* Image */}
              <div className="flex justify-center sm:justify-start">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-28 h-28 object-cover rounded-md shadow-md"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-700">
                  ₹{item.price} x {item.quantity}
                </p>
              </div>

              {/* Remove Button */}
              <div className="flex justify-center sm:justify-end">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
