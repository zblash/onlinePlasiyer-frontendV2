import * as React from 'react';
import { ISpecifyProductResponse } from '~/__types';
import { UNIT_TYPE_MAP } from '~/utils/constants';
import { Mutation } from '~/components/common';
import { mutationEndPoints, queryEndpoints } from '~/services';
import { refetchFactory } from '~/services/endpoints/query-endpoints';

const SpecifyProduct: React.SFC<ISpecifyProductProps> = props => {
  const [quantity, setQuantity] = React.useState(0);
  const { specProduct } = props;

  return (
    <div key={specProduct.id} className="specify-product-wrapper">
      <div>contents : {specProduct.contents}</div>
      <div>quantity : {specProduct.quantity}</div>
      <div>recommendedRetailPrice : {specProduct.recommendedRetailPrice}</div>
      <div>sellerName : {specProduct.sellerName}</div>
      <div>totalPrice : {specProduct.totalPrice}</div>
      <div>unitPrice : {specProduct.unitPrice}</div>
      <div>unit type : {UNIT_TYPE_MAP[specProduct.unitType]}</div>
      <div className="add-to-card-wrapper">
        <label>Kac Adet almak istiyorsunuz : </label>
        <input
          type="number"
          className="add-to-card-input"
          value={quantity}
          onChange={e => setQuantity(parseInt(e.target.value, 10) || 0)}
        />

        <Mutation
          mutation={mutationEndPoints.addToCard}
          variables={{ specifyProductId: specProduct.id, quantity }}
          refetchQueries={[refetchFactory(queryEndpoints.getCard)]}
          onComplated={() => {
            setQuantity(0);
          }}
        >
          {(addToCard, { loading: addToCardLoading, error: addToCardError }) => {
            if (addToCardError) {
              return <div>Error addToCard</div>;
            }

            return (
              <button
                type="button"
                disabled={addToCardLoading || addToCardError || quantity <= 0}
                onClick={() => {
                  addToCard();
                }}
              >
                {addToCardLoading ? 'Loading...' : 'Ekle'}
              </button>
            );
          }}
        </Mutation>
      </div>
    </div>
  );
};
interface ISpecifyProductProps {
  specProduct: ISpecifyProductResponse;
}

export default SpecifyProduct;
