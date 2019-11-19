import * as React from 'react';
import { useTranslation } from 'react-i18next';
import styled, { colors, css } from '~/styled';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { Container, UIButton } from '~/components/ui';
import { CategoryHorizontalList } from '~/components/common/category-horizontal-list';
import { CategoryHorizontalListFetcher } from '~/fetcher-components/common/category-horizontal-list';

/* Home Helpers */
interface HomeProps {}

/* Home Style Constants */

/* Home Styles */
const HomePageColors = {
  text: '#4d4d4d',
  white: '#fff',
  primary: '#0075ff',
  primaryDark: '#0062d4',
  scrollbarTrack: '#e1e1e1',
  addButtonInactive: '#ddd',
  scrollbarThumb: '#878787',
};

const StyledHomeWrapper = styled.div`
  background-color: ${colors.primary};
`;

const StyledTotalObligationWrapper = styled.div`
  width: 33.33%;
  float: right;
  text-align: center;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
`;

const StyledTotalObligationWrapperTitle = styled.h3`
  color: ${HomePageColors.text};
`;

const StyledTotalObligationElement = styled.div`
  width: 44%;
  text-align: center;
  vertical-align: middle;
  transition: background-color 0.3s;
  background-color: ${HomePageColors.white};
  color: ${HomePageColors.text};
  padding: 4px 8px;
  border-radius: 8px;
  border: 1px solid #e6e6e6;
  float: left;
`;
const StyledTotalObligationElementText = styled.h3`
  
`;
const styleTotalObligationElementLast = css`
  margin-left: 1%;
`

const StyledTotalObligationButton = styled(UIButton)`
display: flex;
float: right;
align-items: center;
transition: background-color 0.3s;
background-color: ${HomePageColors.primary};
color: ${HomePageColors.white};
padding: 4px 8px;
margin 3%;
border-radius: 8px;
:active {
  background-color: ${HomePageColors.primaryDark} !important;
}
:hover {
  background-color: ${HomePageColors.addButtonInactive};
}
`;

/* Home Component  */
function Home(props: React.PropsWithChildren<HomeProps>) {
  const { t } = useTranslation();
  const { data: totalObligation } = useQuery(queryEndpoints.getObligationTotal, {
    defaultValue: {},
  });
  
  const __ = (
    <Container>
      <CategoryHorizontalListFetcher shouldUseProductsPageLink />

      <StyledTotalObligationWrapper>
        <StyledTotalObligationWrapperTitle>{t('obligations.title')}</StyledTotalObligationWrapperTitle>
        <StyledTotalObligationElement>
          <StyledTotalObligationElementText>{t('obligations.totalDebts')}</StyledTotalObligationElementText>
          {/*TODO TL Icon move to translation*/}
          <StyledTotalObligationElementText>{totalObligation.totalDebts} &#8378;</StyledTotalObligationElementText>
        </StyledTotalObligationElement>
        <StyledTotalObligationElement className={styleTotalObligationElementLast}>
          <StyledTotalObligationElementText>{t('obligations.totalReceivables')}</StyledTotalObligationElementText>
          {/*TODO TL Icon move to translation*/}
          <StyledTotalObligationElementText>{totalObligation.totalReceivables} &#8378;</StyledTotalObligationElementText>
        </StyledTotalObligationElement>
        <StyledTotalObligationButton>{t('obligations.details')}</StyledTotalObligationButton>
      </StyledTotalObligationWrapper>
    </Container>
  );
  /* Home Lifecycle  */

  /* Home Functions  */

  return __;
}

const _Home = Home;

export { _Home as Home };
