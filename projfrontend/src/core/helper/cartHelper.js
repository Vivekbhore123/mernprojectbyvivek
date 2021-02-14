 const addItemToCart = (item, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...item,
      count:1
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  };
};
export default addItemToCart;

export const loadCart=()=>{
 if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
}
};



export const removeItemFromCart = (productId) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((product, i) => {
      if (product._id === productId) {
        cart.splice(i, 1);
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart; 
};

export const cartEmpty = (dummy,next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("cart");
    console.log(`${dummy}`);
    let cart = [];
     localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

//now question may arise that why we are using next (middleware) in following  
//addItemToCart method and the answer is ...
//when we are calling the following method from the file Card.js
//we are calling the following method from the function named addToCart
//so using this next in following method we are allowing the calling method addItemToCart from addToCart of Card.js file
//to execute the callback function


//method addItemToCart from addToCart of Card.js file

// const addToCart = () => {
//   addItemToCart(product, () => {
//     setRedirect(true);
//   });
// };

