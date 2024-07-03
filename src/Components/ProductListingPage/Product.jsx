import React from 'react';

function Product({ product, addToCart }) {
  const formatPrice = (price) => {
    const [integerPart, decimalPart] = price.toFixed(2).split('.');
    const lastThree = integerPart.slice(-3);
    const otherNumbers = integerPart.slice(0, -3);
    const formattedInteger = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + (otherNumbers ? "," : "") + lastThree;
    return formattedInteger;
  };
  return (
    <div className="product">
      <h2>{product.name}</h2>
      <img
        src={product.image}
        alt={"Joghub" + product.id}
        height={200}
        width={200}
      />
      <p>₹{formatPrice(product.price)}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default Product;
