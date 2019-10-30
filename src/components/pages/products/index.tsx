import * as React from 'react';
import { useParams } from 'react-router';
import styled from '~/styled';
import { Container } from '~/components/ui';
import { ProductList } from '~/components/common/product-list';
import { CategoryHorizontalList } from '~/components/common/category-horizontal-list';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';

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
  titleText: '#333',
};

/*
  ProductsPage Styles
*/

const StyledSelectedParentCategoryTitle = styled.h2`
  font-size: 20px;
  color: ${ProductsPageColors.titleText};
`;

const _ProductsPage: React.SFC<ProductsPageProps> = props => {
  const { categoryId: selectedCategoryId } = useParams<RouteParams>();
  const [selectedCategoryName, setSelectedCategoryName] = React.useState('');
  const { data: allCategories } = useQuery(queryEndpoints.getCategories, {
    variables: { type: 'all' },
    defaultValue: [],
    // TODO : implement on complate
    // onCompleted: categories => {
    //   if (selectedCategoryId) {
    //     setSelectedCategoryName(categories.find(category => category.id === selectedCategoryId).name);
    //   }
    // },
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
