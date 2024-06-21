
import React from 'react';
import Product from './Product';

const products = [
  { id: 1, image: "./images/tshirt-1.png", name: 'Tshirt 1', price: 100 },
  { id: 2, image: './images/tshirt-2.png', name: 'Tshirt 2', price: 200 },
  { id: 3, image: './images/tshirt-3.png', name: 'Tshirt 3', price: 300 },
  { id: 4, image: "./images/tshirt-6.png", name: 'Tshirt 4', price: 400 },
  { id: 5, image: './images/tshirt-4.png', name: 'Tshirt 5', price: 150 },
  { id: 6, image: './images/tshirt-3.png', name: 'Tshirt 6', price: 400 },
  { id: 7, image: "./images/tshirt-5.png", name: 'Tshirt 7', price: 100 },
  { id: 8, image: './images/tshirt-3.png', name: 'Tshirt 8', price: 200 },
  { id: 9, image: './images/tshirt-4.png', name: 'Tshirt 9', price: 250 },
  { id: 10, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSALbLbMkc26NkEb_xnsaxiewqAqVtsVGK6ZA&s', name: 'Tshirt 10', price: 600 },
];

function ProductListingPageMain({ addToCart }) {
  return (
    <div className="product-list">
      {products.map(product => (
        <Product key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  );
}

export default ProductListingPageMain;
