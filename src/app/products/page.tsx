'use client';

import { ProductTypeFilter } from '@/features/products/components/ProductTypeFilter/ProductTypeFilter';
import { ProductsList } from '@/features/products/components/ProductsList/ProductsList';

import './ProductsPage.scss';

const ProductsPage = () => {
  return (
    <section className="products-page">
      <div className="products-page__header">
        <div>
          <h1 className="products-page__title">Products</h1>
        </div>

        <ProductTypeFilter />
      </div>

      <ProductsList />
    </section>
  );
};

export default ProductsPage;
