import * as React from 'react';
import { useHistory } from 'react-router';
import styled, { colors, css } from '~/styled';
import { useTranslation } from '~/i18n';
import { UIButton } from '~/components/ui';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';

/* ObligationComponent Helpers */
interface ObligationComponentProps {
  userId?: string;
}

/* ObligationComponent Constants */

/* ObligationComponent Styles */
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
const StyledTotalObligationButton = styled(UIButton)`
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

/* ObligationComponent Component  */
function ObligationComponent(props: React.PropsWithChildren<ObligationComponentProps>) {
  /* ObligationComponent Variables */
  const { t } = useTranslation();
  const routerHistory = useHistory();
  const userId = React.useMemo(() => {
    return props.userId ? props.userId : '';
  }, [props.userId]);
  const { data: totalObligation } = useQuery(queryEndpoints.getObligationTotal, {
    defaultValue: {
      debt: 0.0,
      receivable: 0.0,
    },
    variables: {
      id: props.userId,
    },
  });
  /* ObligationComponent Callbacks */

  /* ObligationComponent Lifecycle  */

  return (
    <StyledTotalObligationWrapper>
      <StyledTotalObligationWrapperTitle>{t('obligations.title')}</StyledTotalObligationWrapperTitle>
      <StyledTotalObligationElement>
        <StyledTotalObligationElementText>{t('obligations.totalDebts')}</StyledTotalObligationElementText>
        {/* TODO TL Icon move to translation */}
        <StyledTotalObligationElementText>{totalObligation.debt.toFixed(2)} &#8378;</StyledTotalObligationElementText>
      </StyledTotalObligationElement>
      <StyledTotalObligationElement className={styleTotalObligationElementLast}>
        <StyledTotalObligationElementText>{t('obligations.totalReceivables')}</StyledTotalObligationElementText>
        {/* TODO TL Icon move to translation */}
        <StyledTotalObligationElementText>
          {totalObligation.receivable.toFixed(2)} &#8378;
        </StyledTotalObligationElementText>
      </StyledTotalObligationElement>
      <StyledTotalObligationButton onClick={() => routerHistory.push(`/obligation-activities/${userId}`)}>
        {t('common.details')}
      </StyledTotalObligationButton>
    </StyledTotalObligationWrapper>
  );
}
const PureObligationComponent = React.memo(ObligationComponent);

export { PureObligationComponent as ObligationComponent };
