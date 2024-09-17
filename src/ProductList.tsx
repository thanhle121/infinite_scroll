import React, { useState, useEffect } from 'react';
import { fetchProducts } from './services/fetchProducts';
import { Product } from './types/Product';
import InfiniteScroll from 'react-infinite-scroll-component';
import { searchProducts } from './services/searchProducts';
import './style/style.css'

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [hasMore, setHasMore] = useState(true); 
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleFetchProducts = async (reset: boolean = false) => {
    if (loading) return;
    setLoading(true);

    let fetchedProducts: Product[] = [];

    if(searchTerm) {
        fetchedProducts = await searchProducts(searchTerm)
    } else {
        fetchedProducts = await fetchProducts(page, 20)
    }

    if(fetchedProducts.length > 0) {
        setProducts((prev) => reset ? fetchedProducts : [...prev, ...fetchedProducts])
        setPage((prev) => reset ? 2 : prev + 1);
    }

    setHasMore(fetchedProducts.length === 20);
    setLoading(false);
  }

  useEffect(() => {
    handleFetchProducts(true);
  }, [searchTerm])

  return (
    <div>
        <input
        type='text'
        placeholder='Search...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{marginBottom: '20px', padding: '8px', width: '400px'}}
        />
      <InfiniteScroll
        dataLength={products.length}
        next={handleFetchProducts}
        hasMore={hasMore}
        loader={<p>Loading more products...</p>}
        endMessage={<p>No more products to load</p>}
      >
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.thumbnail} alt={product.title} />
              <h2>{product.title}</h2>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default ProductList;
