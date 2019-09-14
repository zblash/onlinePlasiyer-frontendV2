import './style-customer-basket.scss';
import * as React from 'react';
import { Query, Mutation } from '~/components/common';
import { queryEndpoints, mutationEndPoints } from '~/services';
import { Img } from '~/components/ui';
import { refetchFactory } from '~/services/endpoints/query-endpoints';

const CustomerBasket: React.SFC<ICustomerBasketProps> = props => {
  return (
    <div>
      <Query query={queryEndpoints.getCard}>
        {({ data: customerCard, loading: customerCardLoading, error: customerCardError }) => {
          if (customerCardLoading) {
            return <div>Loading customerCard</div>;
          }
          if (customerCardError) {
            return <div>Error customerCard</div>;
          }

          return (
            <div>
              {customerCard.items.map(cardItem => (
                <div key={cardItem.id} className="card-item-wrapper">
                  <div className="start-item">
                    <Img src={cardItem.productPhotoUrl} extraClassName="product-image" alt={cardItem.productName} />
                    <div>
                      <div>name : {cardItem.productName}</div>
                      <div>seller : {cardItem.sellerName}</div>
                      <div>total price : {cardItem.totalPrice}</div>
                      <div>unitType : {cardItem.unitType}</div>
                      <div>unit price : {cardItem.unitPrice}</div>
                    </div>
                  </div>
                  <div>
                    <Mutation
                      mutation={mutationEndPoints.removeItemFromCard}
                      variables={{ id: cardItem.id }}
                      refetchQueries={[refetchFactory(queryEndpoints.getCard)]}
                    >
                      {(removeFromCard, { loading: removeFromCardLoading, error: removeFromCardError }) => {
                        if (removeFromCardError) {
                          return <div>Error removeFromCard</div>;
                        }

                        return (
                          <button
                            type="button"
                            disabled={removeFromCardLoading || removeFromCardError}
                            onClick={() => {
                              removeFromCard();
                            }}
                          >
                            {removeFromCardLoading ? 'Loading...' : 'Sil'}
                          </button>
                        );
                      }}
                    </Mutation>
                  </div>
                </div>
              ))}
              <div>Sepet toplami {customerCard.totalPrice} TL</div>
              <Mutation
                mutation={mutationEndPoints.clearCard}
                refetchQueries={[refetchFactory(queryEndpoints.getCard)]}
              >
                {(clearCard, { loading: clearCardLoading, error: clearCardError }) => {
                  if (clearCardError) {
                    return <div>Error clearCard</div>;
                  }

                  return (
                    <button
                      type="button"
                      disabled={clearCardLoading || clearCardError || customerCard.items.length <= 0}
                      onClick={() => {
                        clearCard();
                      }}
                    >
                      {clearCardLoading ? 'Loading...' : 'karti temizle'}
                    </button>
                  );
                }}
              </Mutation>
              <Mutation
                mutation={mutationEndPoints.cardCheckout}
                refetchQueries={[refetchFactory(queryEndpoints.getCard)]}
              >
                {(cardCheckout, { loading: cardCheckoutLoading, error: cardCheckoutError }) => {
                  if (cardCheckoutError) {
                    return <div>Error cardCheckout</div>;
                  }

                  return (
                    <button
                      type="button"
                      disabled={cardCheckoutLoading || cardCheckoutError || customerCard.items.length <= 0}
                      onClick={() => {
                        cardCheckout();
                      }}
                    >
                      {cardCheckoutLoading ? 'Loading...' : 'sepeti onayla'}
                    </button>
                  );
                }}
              </Mutation>
            </div>
          );
        }}
      </Query>
    </div>
  );
};
interface ICustomerBasketProps {}

export default CustomerBasket;
