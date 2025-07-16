import { createContext, useState } from 'react';

export const CartItemsContext = createContext();

const CartItemsProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const addToCart = (newItem) => {
    setItems((prevItems) => {
      const index = prevItems.findIndex(
        (item) =>
          item.id === newItem.id && item.selectedSize === newItem.selectedSize
      );

      if (index !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[index].itemQuantity += 1;
        return updatedItems;
      } else {
        return [...prevItems, { ...newItem, itemQuantity: 1 }];
      }
    });

    setTotalAmount((prev) => prev + newItem.price);
  };

  const removeItem = (targetItem) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.id === targetItem.id &&
            item.selectedSize === targetItem.selectedSize
          )
      )
    );

    setTotalAmount((prev) =>
      prev - targetItem.price * targetItem.itemQuantity
    );
  };

  const quantity = (id, action, size) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id && item.selectedSize === size) {
          if (action === 'INC') {
            setTotalAmount((prev) => prev + item.price);
            return { ...item, itemQuantity: item.itemQuantity + 1 };
          } else if (action === 'DEC' && item.itemQuantity > 1) {
            setTotalAmount((prev) => prev - item.price);
            return { ...item, itemQuantity: item.itemQuantity - 1 };
          }
        }
        return item;
      })
    );
  };

  return (
    <CartItemsContext.Provider
      value={{ items, addToCart, removeItem, quantity, totalAmount }}
    >
      {children}
    </CartItemsContext.Provider>
  );
};

export default CartItemsProvider;
