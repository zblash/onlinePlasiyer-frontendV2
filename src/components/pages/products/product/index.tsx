import * as React from 'react';
import { Mutation } from '~/components/common';
import { queryEndpoints, mutationEndPoints } from '~/services';
import { Img, Popup } from '~/components/ui';
import './style-product.scss';
import { withAuthUser, IWithAuthUserComponentProps } from '~/components/hoc/with-auth-user';
import { isUserCustomer, isUserAdmin } from '~/utils';
import SpecifyProducts from './customer-specify-products';
import { refetchFactory } from '~/services/endpoints/query-endpoints';
import { IProductResponse } from '~/__types';

const Product: React.SFC<IProductProps> = props => {
  const { product, user, categoryId } = props;
  const [shouldShowSpecifyProductPopup, setShouldShowSpecifyProductPopup] = React.useState(false);

  return (
    <div className="view-product">
      <div className="start-items">
        <Img src={product.photoUrl} alt={product.name} extraWrapperClassName="product-image" />
        <div className="item-config">
          <p>Name : {product.name}</p>
          <p>Category Name : {product.categoryName}</p>-
          <p>Status: {product.active ? 'Active' : 'Passive'}</p>
          <p>barcode : {product.barcode}</p>
          <p>Tax : {product.tax}</p>
        </div>
      </div>
      <div className="end-items">
        <div className="buttons">
          {isUserAdmin(user) && (
            <>
              <button className="btn btn-primary" type="button">
                Duzenle (invalid)
              </button>
              <Mutation
                mutation={mutationEndPoints.deleteProduct}
                variables={{ id: product.id }}
                refetchQueries={[
                  refetchFactory(queryEndpoints.getAllProducts),
                  refetchFactory(queryEndpoints.getAllProductsByCategoryId, { categoryId }),
                ]}
              >
                {(deleteProduct, { loading: deleteProductLoading, error: deleteProductError }) => {
                  if (deleteProductError) {
                    return <div>Error deleteProduct</div>;
                  }

                  return (
                    <button
                      className="btn btn-danger"
                      type="button"
                      disabled={deleteProductLoading || deleteProductError}
                      onClick={() => {
                        deleteProduct();
                      }}
                    >
                      {deleteProductLoading ? '...Loading' : 'Sil'}
                    </button>
                  );
                }}
              </Mutation>
            </>
          )}
          {isUserCustomer(user) && (
            <button
              type="button"
              onClick={() => {
                setShouldShowSpecifyProductPopup(true);
              }}
            >
              Fiyatlari Gor
            </button>
          )}
        </div>
      </div>
      {isUserCustomer(user) && (
        <>
          <Popup show={shouldShowSpecifyProductPopup} onClose={setShouldShowSpecifyProductPopup}>
            <SpecifyProducts productId={product.id} productName={product.name} />
          </Popup>
        </>
      )}
    </div>
  );
};
interface IProductProps extends IWithAuthUserComponentProps {
  product: IProductResponse;
  categoryId: string;
}

export default withAuthUser(Product);
