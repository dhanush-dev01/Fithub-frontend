import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Styles/Uploadproduct.module.css';

const UploadProducts = () => {
  const [product, setProduct] = useState({
    name: '',
    price: {
      type: 'centPrecision',
      fractionDigits: 1,
      currencyCode: 'INR',
      centAmount: 0,
    },
    imageUrl: '',
    description: '',
    categorykey: '',
    slug: '',
    producttypekey: '',
  });
  
  const [community, setCommunity] = useState('');

  const fetchCommunity = async () => {
    try {
      const customerId = localStorage.getItem('customerId');
      const response = await axios.get('https://machjava.azurewebsites.net/customer/getCommunity', {
        params: { customerid: customerId },
      });
      setCommunity(response.data);
      console.log('Fetched community:', response.data);
    } catch (error) {
      console.error('Error fetching community:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('price.')) {
      const key = name.split('.')[1];
      setProduct((prevProduct) => ({
        ...prevProduct,
        price: {
          ...prevProduct.price,
          [key]: value,
        },
      }));
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://machjava.azurewebsites.net/product/addProduct', product);
      console.log('Product added:', response.data);
      const sku = response.data.masterData.current.masterVariant.sku;
      localStorage.setItem('sku', sku);

      // Fetch the community name
      //await fetchCommunity();

      // Ensure community is set
      if (!community) {
        throw new Error('Community is not set');
      }

      // Add product to the community
      const addProductToCommunityResponse = await axios.post('https://machjava.azurewebsites.net/productselection/addProductToCommunity', null, {
        params: {
          community,
          sku,
        },
      });

      console.log('Product added to community:', addProductToCommunityResponse.data);

      alert('Your product has been saved and will be visible only after the admin publishes your product.');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  useEffect(() =>{
    fetchCommunity()
  },[])
  return (
    <div className={styles.formContainer}>
      <h3  className="styledHeading ">Add Product to your Community</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className="twoFormInputs">
        
          <label className={styles.label}>
            Name:
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </label>
        
        
          <label className={styles.label}>
            Price (INR):
            <input
              type="number"
              name="price.centAmount"
              value={product.price.centAmount}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </label>
        
        </div>
        <div className="twoFormInputs">
          <label className={styles.label}>
            Image URL:
            <input
              type="text"
              name="imageUrl"
              value={product.imageUrl}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </label>
          <label className={styles.label}>
            Description:
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className={styles.textarea}
              required
            />
          </label>
        </div>
        <div className="twoFormInputs">
          <label className={styles.label}>
            Category:
            <select
              name="categorykey"
              value={product.categorykey}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="">Select Category</option>
              <option value="new-arrivals">New Arrivals</option>
              <option value="joghub">Joghub</option>
            </select>
          </label>
          <label className={styles.label}>
            Product Type:
            <select
              name="producttypekey"
              value={product.producttypekey}
              onChange={handleChange}
              className={styles.select}
              required
            >
              <option value="">Select Product Type</option>
              <option value="tshirt-25">Clothing</option>
              <option value="Shoes-40">Shoes</option>
              <option value="bottle-1">Bottles</option>
            </select>
          </label>
        </div>
        <div>
          <label className={styles.label}>
            Slug:
            <input
              type="text"
              name="slug"
              value={product.slug}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </label>
        </div>
        <button type="submit" className={styles.button}>
          Add Product
        </button>
      </form>
    </div>
  );
};

export default UploadProducts;
