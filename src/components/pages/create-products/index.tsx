import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Query } from '~/components/common';
import { isUserMerchant } from '~/utils';
import { queryEndpoints } from '~/services';
import CreateProductByRole from './create-product-by-role';
import CreateSpecifyProduct from './create-specify-product';

const CreateProduct: React.SFC<CreateProductProps> = props => {
  const {
    match: { params },
    history,
  } = props;
  const [barcode, setBarcode] = React.useState(params.barcode || '');

  if (!params.barcode) {
    return (
      <div>
        <label>barcode girin</label>
        <input
          type="text"
          onChange={e => {
            setBarcode(e.target.value);
          }}
        />
        <button
          type="button"
          disabled={barcode.length < 10 || barcode.length > 100}
          onClick={() => {
            history.replace(`/products/create/${barcode}`);
          }}
        >
          Kontrol Et
        </button>
      </div>
    );
  }

  return (
    <Query query={queryEndpoints.getProductByBarcode} variables={{ barcode: params.barcode }}>
      {({ data: getProduct, error: getProductError, loading: getProductLoading }) => {
        if (getProductLoading) {
          return null;
        }
        const hasBarcode = !getProductError && getProduct;

        return (
          <Query query={queryEndpoints.getAuthUser}>
            {({ data: user, loading, error }) => {
              if (error || loading) {
                return null;
              }

              if (hasBarcode) {
                if (isUserMerchant(user)) {
                  return <CreateSpecifyProduct barcode={barcode} userId={user.id} />;
                }

                return <p>Redirect</p>;
              }

              return <CreateProductByRole role={user.role} barcode={barcode} history={history} />;
            }}
          </Query>
        );
      }}
    </Query>
  );
};

type CreateProductProps = {} & RouteComponentProps<{ barcode: string }>;

export default CreateProduct;
