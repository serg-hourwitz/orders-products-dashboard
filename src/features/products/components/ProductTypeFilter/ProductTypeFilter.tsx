'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';

import {
  selectProductTypes,
  selectSelectedProductType,
} from '../../productsSelectors';
import { setSelectedType } from '../../productsSlice';

import './ProductTypeFilter.scss';

export const ProductTypeFilter = () => {
  const dispatch = useAppDispatch();

  const productTypes = useAppSelector(selectProductTypes);
  const selectedType = useAppSelector(selectSelectedProductType);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedType(event.target.value));
  };

  return (
    <div className="product-type-filter">
      <label htmlFor="product-type" className="product-type-filter__label">
        Type:
      </label>

      <select
        id="product-type"
        className="product-type-filter__select form-select"
        value={selectedType}
        onChange={handleChange}
      >
        <option value="all">All</option>

        {productTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};
