'use client';

import Image from 'next/image';

import type { Product } from '@/types/product';
import { formatCurrency } from '@/utils/formatCurrency';
import { formatLongDate, formatShortDate } from '@/utils/formatDate';
import { useAppSelector } from '@/store/hooks';

import { selectOrderTitleById } from '../../productsSelectors';

import './ProductItem.scss';

interface ProductItemProps {
  product: Product;
}

export const ProductItem = ({ product }: ProductItemProps) => {
  const orderTitle = useAppSelector(selectOrderTitleById(product.order));

  return (
    <article className="product-item">
      <div className="product-item__status">
        <span
          className={`product-item__status-dot ${
            product.isNew
              ? 'product-item__status-dot--new'
              : 'product-item__status-dot--used'
          }`}
        />
      </div>

      <div className="product-item__image-wrapper">
        <Image
          src={product.photo}
          alt={product.title}
          width={52}
          height={52}
          className="product-item__image"
        />
      </div>

      <div className="product-item__name">
        <strong>{product.title}</strong>

        <span>SN: {product.serialNumber}</span>
      </div>

      <div className="product-item__type">
        <span className="product-item__label">Type</span>
        <strong>{product.type}</strong>
      </div>

      <div className="product-item__guarantee">
        <span className="product-item__label">Guarantee</span>

        <span>{formatShortDate(product.guarantee.start)}</span>

        <span>{formatLongDate(product.guarantee.end)}</span>
      </div>

      <div className="product-item__price">
        <span className="product-item__label">Price</span>

        {product.price.map((price) => (
          <span
            key={price.symbol}
            className={
              price.isDefault ? 'product-item__price-default' : undefined
            }
          >
            {formatCurrency(price.value, price.symbol)}
          </span>
        ))}
      </div>

      <div className="product-item__order">
        <span className="product-item__label">Order</span>
        <strong>{orderTitle}</strong>
      </div>
    </article>
  );
};
