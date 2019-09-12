import './style-customer-specify-products.scss';
import * as React from 'react';
import { queryEndpoints } from '~/services';
import { Query } from '~/components/common';
import { UNIT_TYPE_MAP } from '~/utils/constants';

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
              {specifyProducts.map(specProdcut => (
                <div key={specProdcut.id} className="specify-product-wrapper">
                  <div>contents : {specProdcut.contents}</div>
                  <div>quantity : {specProdcut.quantity}</div>
                  <div>recommendedRetailPrice : {specProdcut.recommendedRetailPrice}</div>
                  <div>sellerName : {specProdcut.sellerName}</div>
                  <div>totalPrice : {specProdcut.totalPrice}</div>
                  <div>unitPrice : {specProdcut.unitPrice}</div>
                  <div>unit type : {UNIT_TYPE_MAP[specProdcut.unitType]}</div>
                </div>
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
