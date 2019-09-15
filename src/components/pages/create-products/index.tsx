import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Query } from '~/components/common';
import { isUserMerchant, isBarcodeCorrectSize } from '~/utils';
import { queryEndpoints } from '~/services';
import CreateProductByRole from './create-product-by-role';
import CreateSpecifyProduct from './create-specify-product';
import { IWithAuthUserComponentProps, withAuthUser } from '~/components/hoc/with-auth-user';

const CreateProduct: React.SFC<CreateProductProps> = props => {
  const {
    match: { params },
    history,
    user,
  } = props;
  const [barcode, setBarcode] = React.useState(params.barcode || '');

  if (!params.barcode) {
    return (
      <div className="container">
        <div className="form_box">
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              onChange={e => {
                setBarcode(e.target.value);
              }}
            />
          </div>
          <button
            type="button"
            className="btn btn-dark ds"
            disabled={!isBarcodeCorrectSize(barcode)}
            onClick={() => {
              history.replace(`/products/create/${barcode}`);
            }}
          >
            Kontrol Et
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Query query={queryEndpoints.getProductByBarcode} variables={{ barcode: params.barcode }}>
      {({ data: getProduct, error: getProductError, loading: getProductLoading }) => {
        if (getProductLoading) {
          return null;
        }
        const hasBarcode = !getProductError && getProduct;
        if (hasBarcode) {
          if (isUserMerchant(user)) {
            return <CreateSpecifyProduct barcode={barcode} userId={user.id} />;
          }
          // TODO : redirect for admin
          return <p>Redirect</p>;
        }

        return <CreateProductByRole role={user.role} barcode={barcode} history={history} />;
      }}
    </Query>
  );
};

type CreateProductProps = {} & RouteComponentProps<{ barcode: string }> & IWithAuthUserComponentProps;

export default withAuthUser(CreateProduct);
