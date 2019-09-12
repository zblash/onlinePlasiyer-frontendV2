import * as React from 'react';
import { Query, Mutation } from '~/components/common';
import { queryEndpoints, mutationEndPoints } from '~/services';
import { Img, Popup } from '~/components/ui';
import './style-product.scss';
import { withAuthUser, IWithAuthUserComponentProps } from '~/components/hoc/with-auth-user';
import { isUserCustomer, isUserAdmin } from '~/utils';
import SpecifyProduct from './customer-specify-products';

const Product: React.SFC<IProductProps> = props => {
  const { productId, user, categoryId } = props;
  const [shouldShowSpecifyProductPopup, setShouldShowSpecifyProductPopup] = React.useState(false);

  return (
    <div>
      <Query
        query={queryEndpoints.getProductById}
        variables={{ id: productId }}
        readCache={{
          parentQuery: queryEndpoints.getAllProductsByCategoryId,
          parentVariables: { categoryId },
          dataGetter: products => products.find(_pr => _pr.id === productId),
        }}
      >
        {({ data: product, loading: getProductLoading, error: getProductError }) => {
          if (getProductLoading) {
            return <div>Loading getProduct</div>;
          }
          if (getProductError) {
            return <div>Error getProduct</div>;
          }

          return (
            <div className="view-product">
              <div className="start-items">
                <Img src={product.photoUrl} alt={product.name} extraWrapperClassName="product-image" />
                <div className="item-config">
                  <p>Name : {product.name}</p>
                  <p>Category Name : {product.categoryName}</p>
                  <p>Status: {product.active ? 'Active' : 'Passive'}</p>
                  <p>barcode : {product.barcode}</p>
                  <p>Tax : {product.tax}</p>
                </div>
              </div>
              <div className="end-items">
                <div className="buttons">
                  {isUserAdmin(user) && (
                    <>
                      <button type="button">Duzenle (invalid)</button>
                      <Mutation
                        mutation={mutationEndPoints.deleteProduct}
                        variables={{ id: productId }}
                        refetchQueries={[
                          {
                            query: queryEndpoints.getAllProducts,
                          },
                          {
                            query: queryEndpoints.getAllProductsByCategoryId,
                            variables: { categoryId },
                          },
                        ]}
                      >
                        {(deleteProduct, { loading: deleteProductLoading, error: deleteProductError }) => {
                          if (deleteProductError) {
                            return <div>Error deleteProduct</div>;
                          }

                          return (
                            <button
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
                    <SpecifyProduct productId={productId} productName={product.name} />
                  </Popup>
                </>
              )}
            </div>
          );
        }}
      </Query>
    </div>
  );
};
interface IProductProps extends IWithAuthUserComponentProps {
  productId: string;
  categoryId: string;
}

export default withAuthUser(Product);
