import React, { useContext } from 'react'
import { ProductContext } from 'vtex.product-context'
import { compose, isEmpty, prop, propOr, reject, flip, map, contains } from 'ramda'

import ProductSpecifications from './index';

const ProductSpecificationsWrapper = ({ showSpecificationsTab = false, ...props }) => {
  const valuesFromContext = useContext(ProductContext)

  const getSpecifications = () => {
    const { product } = valuesFromContext

    const allSpecifications = propOr([], 'properties', product)
    const generalSpecifications = propOr([], 'generalProperties', product)

    return reject(
      compose(
        flip(contains)(map(x => x.name, generalSpecifications)),
        prop('name')
      ),
      allSpecifications
    )
  }

  const productSpecificationsProps = () => {
    if (!valuesFromContext || isEmpty(valuesFromContext)) 
      return {
        ...props,
        tabsMode: showSpecificationsTab,
      }

    return {
      tabsMode: showSpecificationsTab,
      specifications: getSpecifications(),
    }
  }

  return (
    <ProductSpecifications { ...productSpecificationsProps() } />
  )
}

export default ProductSpecificationsWrapper