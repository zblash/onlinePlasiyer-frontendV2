import './style-customer-specify-products.scss';
import * as React from 'react';
import { queryEndpoints } from '~/services';
import { Query } from '~/components/common';
import SpecifyProduct from './specify-product';

const CustomerSpecifyProduct: React.SFC<ICustomerSpecifyProductProps> = props => {
  const { productId, productName } = props;

  return (
    <div>
      <h1>{productName} Fiyatlari</h1>
      <Query
        query={queryEndpoints.getAllSpecifyProductsByProductId}
        variables={{
          productId,
        }}
      >
        {({ data: specifyProducts, loading: specifyProductsLoading, error: specifyProductsError }) => {
          if (specifyProductsLoading) {
            return <div>Loading specifyProducts</div>;
          }
          if (specifyProductsError) {
            return <div>Error specifyProducts</div>;
          }

          return (
            <div className="scrollable">
              {specifyProducts.map(specProduct => (
                <SpecifyProduct specProduct={specProduct} key={specProduct.id} />
              ))}
            </div>
          );
        }}
      </Query>
    </div>
  );
};
interface ICustomerSpecifyProductProps {
  productName: string;
  productId: string;
}

export default CustomerSpecifyProduct;
