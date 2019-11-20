import * as React from 'react';
import { useParams } from 'react-router';

import styled, { css } from '~/styled';
import { Container, UIButton, UIIcon } from '~/components/ui';
import { usePopupContext } from '~/contexts/popup/context';
import { useTranslation } from '~/i18n';
import { CategoryHorizontalListFetcher } from '~/fetcher-components/common/category-horizontal-list';
import { CategoryNameTitle } from './category-name-title';
import { ProductListFetcher } from '~/fetcher-components/common/product-list';

/*
  ProductsPage Helpers
*/
interface RouteParams {
  categoryId?: string;
}

interface ProductsPageProps {}

/*
  ProductsPage Colors // TODO : move theme.json
*/
const ProductsPageColors = {
  titleText: '#333',
  white: '#fff',
  primary: '#0075ff',
  primaryDark: '#0062d4',
  scrollbarTrack: '#e1e1e1',
  addButtonInactive: '#ddd',
  scrollbarThumb: '#878787',
};

/*
  ProductsPage Styles
*/

const StyledProductListTopWrapper = styled.div`
  align-items: baseline;
  display: flex;
  justify-content: space-between;
`;

const StyledAddButton = styled(UIButton)`
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
  background-color: ${ProductsPageColors.addButtonInactive};
  color: ${ProductsPageColors.white};
  padding: 4px 8px;
  border-radius: 8px;
  :active {
    background-color: ${ProductsPageColors.primaryDark} !important;
  }
  :hover {
    background-color: ${ProductsPageColors.primary};
  }
`;
const addIconStyle = css`
  margin-left: 8px;
`;

const _ProductsPage: React.SFC<ProductsPageProps> = props => {
  const { t } = useTranslation();
  const { categoryId: selectedCategoryId } = useParams<RouteParams>();
  const popups = usePopupContext();

  const __ = (
    <Container>
      <CategoryHorizontalListFetcher selectedCateogryId={selectedCategoryId} shouldUseProductsPageLink />
      <StyledProductListTopWrapper>
        <CategoryNameTitle selectedCategoryId={selectedCategoryId} />
        <StyledAddButton onClick={() => popups.createProduct.show({ categoryId: selectedCategoryId })}>
          {t('common.add')} <UIIcon name="add" color={ProductsPageColors.white} size={10} className={addIconStyle} />
        </StyledAddButton>
      </StyledProductListTopWrapper>
      <ProductListFetcher selectedCategoryId={selectedCategoryId} />
    </Container>
  );

  /*
  ProductsPage Lifecycle
  */
  /*
  ProductsPage Functions
  */

  return __;
};

const ProductsPage = _ProductsPage;

export { ProductsPage };
