'use client';

import { useAppSelector } from '@/store/hooks';

import { selectFilteredProducts } from '../../productsSelectors';

import { ProductItem } from '../ProductItem/ProductItem';

import './ProductsList.scss';

export const ProductsList = () => {
  const products = useAppSelector(selectFilteredProducts);

  if (products.length === 0) {
    return <div className="products-list__empty">No products found.</div>;
  }

  return (
    <div className="products-list">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};
