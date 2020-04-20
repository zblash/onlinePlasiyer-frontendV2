import * as React from 'react';
import styled, { colors, css } from '~/styled';
import { useTranslation } from '~/i18n';
import { ObligationComponent } from '~/components/common/obligation';
import { Container, UILink } from '~/components/ui';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { AnnouncementComponent } from '~/components/common/announcements';

/* MerchantHome Helpers */
interface MerchantHomeProps {}

/* MerchantHome Constants */

/* MerchantHome Styles */
const StyledMerchantHomeWrapper = styled.div`
  margin-top: 25px;
`;
const StyledOrderSummaryWrapper = styled.div`
  width: 60%;
  float: left;
  padding: 0 15px 24px 15px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: ${colors.white};
`;
const StyledOrderSummaryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${colors.lightGray}
  padding: 0 10px 0 10px;
  font-size: 14px;
  margin-bottom: 15px;
`;
const StyledOrderSummaryContentWrapper = styled.div`
  padding: 0 10px 0 10px;
  border: 1px solid ${colors.lightGray};
`;
const StyledOrderSummaryMenu = styled.ul`
  display: table;
  table-layout: fixed;
  width: 100%;
  list-style: none;
  padding-inline-start: 0;
`;
const StyledOrderSummaryItem = styled.li`
  display: table-cell;
  text-align: center;
  border-right: 1px solid ${colors.lightGray};
  :last-child {
    border: 0;
  }
`;
const StyledLink = styled(UILink)`
  color: ${colors.primaryDark};
`;

const orderSummaryItemI = css`
  font-size: 24px;
  font-style: normal;
  display: block;
`;
/* MerchantHome Component  */
function MerchantHome(props: React.PropsWithChildren<MerchantHomeProps>) {
  /* MerchantHome Variables */
  const { t } = useTranslation();
  const { data: orderSummary } = useQuery(queryEndpoints.getOrderSummary, {
    defaultValue: {},
  });
  /* MerchantHome Callbacks */

  /* MerchantHome Lifecycle  */

  return (
    <Container>
      <StyledMerchantHomeWrapper>
        <StyledOrderSummaryWrapper>
          <StyledOrderSummaryHeader>
            <h3>Siparis Ozeti</h3>
            <p>
              <StyledLink to="/orders">{t('cart.show-order-detail')}</StyledLink>
            </p>
          </StyledOrderSummaryHeader>
          <StyledOrderSummaryContentWrapper>
            <StyledOrderSummaryMenu>
              <StyledOrderSummaryItem>
                <p>
                  <StyledLink to="/orders" state={{ status: 'NEW' }} className={orderSummaryItemI}>
                    {orderSummary.newCount}
                  </StyledLink>
                  Yeni Siparis
                </p>
              </StyledOrderSummaryItem>
              <StyledOrderSummaryItem>
                <p>
                  <StyledLink to="/orders" state={{ status: 'FINISHED' }} className={orderSummaryItemI}>
                    {orderSummary.finishedCount}
                  </StyledLink>
                  Tamamlanan Siparis
                </p>
              </StyledOrderSummaryItem>
              <StyledOrderSummaryItem>
                <p>
                  <StyledLink to="/orders" state={{ status: 'CANCELLED' }} className={orderSummaryItemI}>
                    {orderSummary.cancelledCount}
                  </StyledLink>
                  Iptal Olan Siparis
                </p>
              </StyledOrderSummaryItem>
              <StyledOrderSummaryItem>
                <p>
                  <StyledLink to="/orders" state={{ status: 'CANCEL_REQUEST' }} className={orderSummaryItemI}>
                    {orderSummary.cancelRequestCount}
                  </StyledLink>
                  Iptal Isteginde Olan Siparis
                </p>
              </StyledOrderSummaryItem>
              <StyledOrderSummaryItem>
                <p>
                  <StyledLink to="/orders" state={{ status: 'CONFIRMED' }} className={orderSummaryItemI}>
                    {orderSummary.submittedCount}
                  </StyledLink>
                  Onaylanan Siparis
                </p>
              </StyledOrderSummaryItem>
            </StyledOrderSummaryMenu>
          </StyledOrderSummaryContentWrapper>
        </StyledOrderSummaryWrapper>
        <ObligationComponent />
        <AnnouncementComponent />
      </StyledMerchantHomeWrapper>
    </Container>
  );
}
const PureMerchantHome = React.memo(MerchantHome);

export { PureMerchantHome as MerchantHome };
