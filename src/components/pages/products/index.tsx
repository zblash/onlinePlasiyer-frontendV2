import * as React from 'react';
import { useParams } from 'react-router';
import styled from '~/styled';
import { Container } from '~/components/ui';
import { ProductList } from '~/components/common/product-list';
import { useQuery } from '~/services/context';
import { queryEndpoints } from '~/services/endpoints';
import { CategoryHorizontalList } from '~/components/common/category-horizontal-list';

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
  const [selectedProductId, setSelectedProductId] = React.useState<string>(null);
  const [allCategories] = useQuery(queryEndpoints.getCategories, {
    variables: { type: 'all' },
    defaultValue: [],
    onCompleted: categories => {
      if (selectedCategoryId) {
        setSelectedCategoryName(categories.find(category => category.id === selectedCategoryId).name);
      }
    },
  });
  const [products] = useQuery(queryEndpoints.getAllProductsByCategoryId, {
    variables: { categoryId: selectedCategoryId },
    skip: !selectedCategoryId,
    defaultValue: [],
  });
  const [specifyProducts] = useQuery(queryEndpoints.getAllSpecifyProductsByProductId, {
    variables: { productId: selectedProductId },
    skip: !selectedProductId,
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
      <StyledSelectedParentCategoryTitle>{selectedCategoryName}</StyledSelectedParentCategoryTitle>
      <ProductList
        onItemClick={id => setSelectedProductId(id)}
        selectedProductSpecifies={specifyProducts}
        items={products.map(product => ({
          id: product.id,
          name: product.name,
          taxRate: product.tax,
          img: product.photoUrl,
          barcode: product.barcode,
        }))}
      />
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
