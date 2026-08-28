'use client';

import { useAppDispatch, useAppSelector } from '@/store/hooks';

import {
  selectProductTypes,
  selectSelectedProductType,
} from '../../productsSelectors';
import { setSelectedType } from '../../productsSlice';

import { useTranslation } from 'react-i18next';

import './ProductTypeFilter.scss';

export const ProductTypeFilter = () => {
  const dispatch = useAppDispatch();

  const productTypes = useAppSelector(selectProductTypes);
  const selectedType = useAppSelector(selectSelectedProductType);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedType(event.target.value));
  };

  const { t } = useTranslation();

  return (
    <div className="product-type-filter">
      <label htmlFor="product-type" className="product-type-filter__label">
        {t('products.type')}:
      </label>

      <select
        id="product-type"
        className="product-type-filter__select form-select"
        value={selectedType}
        onChange={handleChange}
      >
        <option value="all"> {t('products.all')}</option>

        {productTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};
