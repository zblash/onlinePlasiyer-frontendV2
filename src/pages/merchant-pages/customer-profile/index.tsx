import * as React from 'react';
import { useParams } from 'react-router';
import { useTranslation } from '~/i18n';
import styled, { colors, css } from '~/styled';
import { UILink, Container } from '~/components/ui';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';

/* CustomerProfilePage Helpers */
interface CustomerProfilePageProps {}
interface RouteParams {
  customerName: string;
  customerId: string;
}
/* CustomerProfilePage Constants */

/* CustomerProfilePage Styles */
const StyledProfilePageWrapper = styled.div``;
const StyledPageHeader = styled.div`
  width: 100%;
  float: left;
  display: flex;
  justify-content: center;
`;
const StyledDetailMenu = styled.div`
  width: 33.33%;
  float: right;
  text-align: center;
  border: 1px solid ${colors.lightGray};
  background-color: ${colors.white};
  border-radius: 8px;
`;
const StyledDetailMenuHeader = styled.h3`
  color: ${colors.darkGray};
  border-bottom: 1px solid ${colors.lightGray};
  padding-bottom: 15px;
  margin-bottom: 0;
  float: left;
  width: 100%;
`;
const StyledDetailMenuElementWrapper = styled.div`
  text-align: start;
  padding: 10px 0 10px 3%;
  border-bottom: 1px solid ${colors.lightGray};
`;
const StyledDetailMenuElement = styled(UILink)`
  color: ${colors.primaryDark};
  cursor: pointer;
`;
const StyledTotalObligationWrapper = styled.div`
  width: 33.33%;
  float: right;
  text-align: center;
  border-top: 1px solid ${colors.lightGray};
  border-bottom: 1px solid ${colors.lightGray};
`;

const StyledTotalObligationWrapperTitle = styled.h3`
  color: ${colors.darkGray};
`;

const StyledTotalObligationElement = styled.div`
  width: 44%;
  text-align: center;
  vertical-align: middle;
  transition: background-color 0.3s;
  background-color: ${colors.white};
  color: ${colors.darkGray};
  padding: 4px 8px;
  border-radius: 8px;
  border: 1px solid ${colors.lightGray};
  float: left;
`;
const StyledTotalObligationElementText = styled.h3``;
const styleTotalObligationElementLast = css`
  margin-left: 1%;
`;
const StyledTotalObligationLink = styled(UILink)`
display: flex;
float: right;
align-items: center;
transition: background-color 0.3s;
background-color: ${colors.primary};
color: ${colors.white};
padding: 4px 8px;
margin 3%;
border-radius: 8px;
:active {
  background-color: ${colors.primaryDark} !important;
}
:hover {
  background-color: ${colors.lightGray};
}
`;
const fullWidth = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

/* CustomerProfilePage Component  */
function CustomerProfilePage(props: React.PropsWithChildren<CustomerProfilePageProps>) {
  /* CustomerProfilePage Variables */
  const { t } = useTranslation();
  const { customerName, customerId } = useParams<RouteParams>();
  const { data: credit, loading: creditLoading, error } = useQuery(queryEndpoints.getUsersCreditByUser, {
    defaultValue: {},
    variables: { userId: customerId },
  });
  /* CustomerProfilePage Callbacks */

  /* CustomerProfilePage Lifecycle  */

  return (
    <Container>
      <StyledProfilePageWrapper>
        <StyledPageHeader>
          <div>
            <h2>{credit && !error && !creditLoading ? credit.customerName : customerName}</h2>
          </div>
        </StyledPageHeader>
        <div className={fullWidth}>
          <StyledTotalObligationWrapper>
            <StyledTotalObligationWrapperTitle>Musteriye Sagladiginiz Kredi</StyledTotalObligationWrapperTitle>
            {credit && !error && !creditLoading && (
              <>
                <StyledTotalObligationElement>
                  <StyledTotalObligationElementText>{t('obligations.totalDebts')}</StyledTotalObligationElementText>
                  {/* TODO TL Icon move to translation */}
                  <StyledTotalObligationElementText>{credit.totalDebt} &#8378;</StyledTotalObligationElementText>
                </StyledTotalObligationElement>
                <StyledTotalObligationElement className={styleTotalObligationElementLast}>
                  <StyledTotalObligationElementText>{t('obligations.limit')}</StyledTotalObligationElementText>
                  {/* TODO TL Icon move to translation */}
                  <StyledTotalObligationElementText>{credit.creditLimit} &#8378;</StyledTotalObligationElementText>
                </StyledTotalObligationElement>
              </>
            )}
            {(!credit || error || creditLoading) && <p>Kredi saglamiyorsunuz. Kredi saglamak icin TIKLAYIN</p>}
            <StyledTotalObligationLink to={`/credit-activities/${credit.id}`}>
              {t('common.details')}
            </StyledTotalObligationLink>
          </StyledTotalObligationWrapper>

          <StyledDetailMenu>
            <StyledDetailMenuHeader>Detaylar</StyledDetailMenuHeader>

            <StyledDetailMenuElementWrapper>
              <StyledDetailMenuElement to={`/orders/${customerId}`}>Siparislerini Gor</StyledDetailMenuElement>
            </StyledDetailMenuElementWrapper>
          </StyledDetailMenu>
        </div>
      </StyledProfilePageWrapper>
    </Container>
  );
}
const PureCustomerProfilePage = React.memo(CustomerProfilePage);

export { PureCustomerProfilePage as CustomerProfilePage };
