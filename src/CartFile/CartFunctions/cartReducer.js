
import { ADD_TO_CART, DECREASE_QUANTITY, REMOVE_FROM_CART, PLACE_ORDER } from "./cartAction";

const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const itemToAdd = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === itemToAdd.id);

      if (existingItemIndex !== -1) {
        // If the item already exists in the cart, increase its quantity
        state.items[existingItemIndex].quantity++;
        return {
          ...state,
          items: [...state.items],
        };
      } else {
        // If the item is not in the cart, add it with quantity 1
        return {
          ...state,
          items: [...state.items, { ...itemToAdd, quantity: 1 }],
        };
      }

      // case DECREASE_QUANTITY:
      //   const productId = action.payload;
      //   const updatedItems = state.items.map(item => {
      //     if (item.id === productId && item.quantity > 1) {
      //       return { ...item, quantity: item.quantity - 1 };
      //     } else {
      //       return item;
      //     }
      //   });

      //   return {
      //     ...state,
      //     items: [...updatedItems],
      //   };

      ////for Decrease the Quantity
      case DECREASE_QUANTITY:
        const productId = action.payload;
        const itemToDecreaseIndex = state.items.findIndex((item) => item.id === productId);

          if (itemToDecreaseIndex !== -1) {
              const updatedItems = [...state.items];
              
              if (updatedItems[itemToDecreaseIndex].quantity > 1) {
                updatedItems[itemToDecreaseIndex].quantity--;
              } else {
                updatedItems.splice(itemToDecreaseIndex, 1);
              }

              return {
                ...state,
                items: updatedItems,
              };
          }

        return state;

      ////for Remove the Item if Quantity is 0
    case REMOVE_FROM_CART:
      const removedProductId = action.payload;
      return {
        ...state,
        items: state.items.filter((item) => item.id !== removedProductId),
      };

      case PLACE_ORDER:
            // Handle placing the order, e.g., reset the cart items
            return {
                ...state,
                items: [],
            };

    default:
      return state;
      
  }
};

export default cartReducer;
