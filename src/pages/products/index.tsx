import * as React from 'react';
import { useParams } from 'react-router';
import lodashGet from 'lodash.get';

import styled, { css } from '~/styled';
import { Container, UIButton, UIIcon } from '~/components/ui';
import { ProductList } from '~/components/common/product-list';
import { CategoryHorizontalList } from '~/components/common/category-horizontal-list';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { usePopupContext } from '~/contexts/popup/context';
import { useTranslation } from '~/utils/hooks';

/*
  ProductsPage Helpers
*/
interface RouteParams {
  categoryId?: string;
}

interface ProductsPageProps {}

/*
  ProductsPage Colors
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
const StyledSelectedCategoryName = styled.h2`
  font-size: 20px;
  color: ${ProductsPageColors.titleText};
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
  const [selectedCategoryName, setSelectedCategoryName] = React.useState('');
  const { data: allCategories } = useQuery(queryEndpoints.getCategories, {
    variables: { type: 'all' },
    defaultValue: [],
  });
  const categoriesMap = allCategories
    .filter(category => !category.subCategory)
    .map(category => ({
      ...category,
      subCategories: allCategories.filter(subCategory => subCategory.parentId === category.id),
    }));

  const __ = (
    <Container>
      <CategoryHorizontalList
        categories={categoriesMap}
        selectedCateogryId={selectedCategoryId}
        shouldUseProductsPageLink
      />
      <StyledProductListTopWrapper>
        <StyledSelectedCategoryName>{selectedCategoryName}</StyledSelectedCategoryName>

        <StyledAddButton onClick={() => popups.createProduct.show({ categoryId: selectedCategoryId })}>
          {t('common.add')} <UIIcon name="add" color={ProductsPageColors.white} size={10} className={addIconStyle} />
        </StyledAddButton>
      </StyledProductListTopWrapper>
      <ProductList selectedCategoryId={selectedCategoryId} />
    </Container>
  );

  /*
  ProductsPage Lifecycle
  */
  React.useEffect(() => {
    setSelectedCategoryName(lodashGet(allCategories.find(category => category.id === selectedCategoryId), 'name'));
  }, [selectedCategoryId, JSON.stringify(allCategories)]);

  /*
  ProductsPage Functions
  */

  return __;
};

const ProductsPage = _ProductsPage;

export { ProductsPage };
