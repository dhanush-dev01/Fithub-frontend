import React, { useEffect, useState } from 'react';
import axios from "axios";
import Product from './Product';
import JoggingAnimation from '../JoggingLoader/JoggingLoader';
import algoliasearch from 'algoliasearch';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import './Styles/Instantsearch.css'
const searchClient = algoliasearch("YDUH36G8N8", "fcae7f86c7b1de5a4b4db89a7aea3f5f");

function Hit({ hit, addToCart }) {
  return <Product product={hit} addToCart={addToCart} />;
}

function ProductListingPageMain({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCommunity(customerid) {
      try {
        const response = await axios.get('http://localhost:8080/customer/getCommunity', {
          params: {
            customerid: customerid
          }
        });
        console.log(response.data)

        if (response.data !== "Community not found") {
          const res = await axios.get("http://localhost:8080/productselection/getProductSelectionProducts", {
            params: {
              community: response.data,
            },
          });
          
          const apiData = res.data;
          console.log(apiData);

          const mappedProducts = apiData.map((item) => ({
            objectID: item.id, // Use a unique identifier as objectID
            image: item.imageUrl,
            name: item.name,
            price: item.price.centAmount,
          }));

          setProducts(mappedProducts);

          // Save products to Algolia
          const index = searchClient.initIndex("Joghub");

          // Clear the index before adding new records
          index.clearObjects()
            .then(() => {
              index.saveObjects(mappedProducts, { autoGenerateObjectIDIfNotExist: true })
                .then(() => {
                  console.log("Products added to Algolia");
                })
                .catch((error) => {
                  console.error("Error adding products to Algolia:", error);
                });
            })
            .catch((error) => {
              console.error("Error clearing Algolia index:", error);
            });

          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching community data:', error);
        setLoading(false);
      }
    }

    getCommunity(localStorage.getItem("customerId"));
  }, []);

  if (loading) {
    return <JoggingAnimation />;
  }

  return (
    <div>
      <InstantSearch searchClient={searchClient} indexName="Joghub">
        <SearchBox />
        <div className="product-list">
          <Hits hitComponent={(props) => <Hit {...props} addToCart={addToCart} />} />
        </div>
      </InstantSearch>
      {/* {products.length >= 1 && (
        <div className="product-list">
          {products.map(product => (
            <Product key={product.objectID} product={product} addToCart={addToCart} />
          ))}
        </div>
      )} */}
      {products.length < 1 && (
        <div className='no-product-found'>
          <h1>No Products Found</h1>
          <h2>Please join a Community</h2>
        </div>
      )}
    </div>
  );
}

export default ProductListingPageMain;
