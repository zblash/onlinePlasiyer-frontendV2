import * as React from 'react';
import styled, { colors, css } from '~/styled';
import { useTranslation } from '~/i18n';
import { UILink } from '~/components/ui';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';

/* CreditSummaryComponent Helpers */
interface CreditSummaryComponentProps {
  userId?: string;
}

/* CreditSummaryComponent Constants */

/* CreditSummaryComponent Styles */
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
/* CreditSummaryComponent Component  */
function CreditSummaryComponent(props: React.PropsWithChildren<CreditSummaryComponentProps>) {
  /* CreditSummaryComponent Variables */
  const { t } = useTranslation();
  const { data: creditSummary } = useQuery(queryEndpoints.getCredit, {
    defaultValue: {
      creditLimit: 0,
      totalDebt: 0,
    },
    variables: { id: props.userId },
  });
  /* CreditSummaryComponent Callbacks */

  /* CreditSummaryComponent Lifecycle  */

  return (
    <StyledTotalObligationWrapper>
      <StyledTotalObligationWrapperTitle>{t('obligations.title')}</StyledTotalObligationWrapperTitle>
      <StyledTotalObligationElement>
        <StyledTotalObligationElementText>{t('obligations.totalDebts')}</StyledTotalObligationElementText>
        {/* TODO TL Icon move to translation */}
        <StyledTotalObligationElementText>
          {creditSummary.totalDebt.toFixed(2)} &#8378;
        </StyledTotalObligationElementText>
      </StyledTotalObligationElement>
      <StyledTotalObligationElement className={styleTotalObligationElementLast}>
        <StyledTotalObligationElementText>{t('obligations.limit')}</StyledTotalObligationElementText>
        {/* TODO TL Icon move to translation */}
        <StyledTotalObligationElementText>
          {creditSummary.creditLimit.toFixed(2)} &#8378;
        </StyledTotalObligationElementText>
      </StyledTotalObligationElement>
      <StyledTotalObligationLink to={`/credit-activities/${creditSummary.id}`}>
        {t('common.details')}
      </StyledTotalObligationLink>
    </StyledTotalObligationWrapper>
  );
}
const PureCreditSummaryComponent = React.memo(CreditSummaryComponent);

export { PureCreditSummaryComponent as CreditSummaryComponent };
