import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center text-lg">Your Cart is currently empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row  sm:justify-between bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all p-4 gap-4 "
            >
              {/* Image */}
              <div className="w-full sm:w-32 flex justify-center sm:justify-start">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-28 h-28 object-cover rounded-md border"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                <p className="text-gray-600 text-sm mt-1">
                  ₹{item.price}
                   <span className="mx-1">*</span>{item.quantity}
                </p>
                <p className="text-gray-900 font-medium mt-1  ">
                  ₹{item.price} x {item.quantity}
                </p>
              </div>

              {/* Remove Button */}
              <div className="mt-2 sm:mt-0">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-sm bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 
                  focus:ring-2 focus:ring-red-400 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          {/* cart Total */}
          <div className="text-right pt-4 border-t mt-8">
            <h4 className="text-xl font-semibold text-gray-800">
              Grand Total: ₹{cartItems.reduce((total,item)=>total+item.price * item.quantity,0)}
            </h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
