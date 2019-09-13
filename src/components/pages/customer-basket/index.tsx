import * as React from 'react';
import { Query, Mutation } from '~/components/common';
import { queryEndpoints, mutationEndPoints } from '~/services';
import { Img } from '~/components/ui';

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
                <div key={cardItem.id}>
                  <Img src={cardItem.productPhotoUrl} alt={cardItem.productName} />
                  <Mutation mutation={mutationEndPoints.removeItemFromCard} variables={{ id: cardItem.id }}>
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
              ))}
            </div>
          );
        }}
      </Query>
    </div>
  );
};
interface ICustomerBasketProps {}

export default CustomerBasket;
