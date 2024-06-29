import React from 'react';

function Product({ product, addToCart }) {
  return (
    <div className="product">
      <h2>{product.name}</h2>
      <img
        src={product.image}
        alt={"Joghub" + product.id}
        height={200}
        width={200}
      />
      <p>₹{product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default Product;
