import * as React from 'react';
import { useParams } from 'react-router';
import styled from '~/styled';
import { Container } from '~/components/ui';
import { ProductList } from './product-list';
import { CategoryHorizontalList } from '~/backend-components/common/category-horizontal-list';

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
export const ProductsPageColors = {
  wrapperBackground: '#fff',
};

/*
  ProductsPage Styles
*/

const StyledSelectedParentCategoryTitle = styled.h2`
  font-size: 20px;
  color: #333333;
`;

const _ProductsPage: React.SFC<ProductsPageProps> = props => {
  const { categoryId: selectedCategoryId } = useParams<RouteParams>();
  const [selectedCategoryName, setSelectedCategoryName] = React.useState('');
  const __ = (
    <Container>
      <CategoryHorizontalList
        selectedCateogryId={selectedCategoryId}
        shouldUseProductsPageLink
        onLoadData={categories => {
          if (selectedCategoryId) {
            setSelectedCategoryName(categories.find(category => category.id === selectedCategoryId).name);
          }
        }}
      />
      <StyledSelectedParentCategoryTitle>{selectedCategoryName}</StyledSelectedParentCategoryTitle>
      <ProductList selectedCategoryId={selectedCategoryId} />
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
