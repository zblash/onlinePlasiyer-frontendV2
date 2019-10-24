import * as React from 'react';
import lodashGet from 'lodash.get';
import styled from '~/styled';
import { Container } from '~/components/ui';
import { CategoryHorizontalList } from '~/components/common/category-horizontal-list';
import { ProductList } from './product-list';

/*
  ProductsPageComponent Helpers
*/

interface Category {
  id: string;
  name: string;
  parentId: string | null;
  photoUrl: string;
  isSubCategory: boolean;
}

interface ProductsPageComponentProps {
  categories: Category[];
  selectedCategoryId?: string;
}

/*
  ProductsPageComponent Colors
*/
export const ProductsPageComponentColors = {
  wrapperBackground: '#fff',
};

/*
  ProductsPageComponent Styles
*/

const StyledDiv = styled.div`
  margin-top: 48px;
`;

const StyledSelectedParentCategoryTitle = styled.h2`
  font-size: 20px;
  color: #333333;
`;

const _ProductsPageComponent: React.SFC<ProductsPageComponentProps> = props => {
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<string>(props.selectedCategoryId);
  const [selectedParentCategoryId, setSelectedParentCategoryId] = React.useState<string>(null);
  const selectedCategoryName = React.useMemo(
    () => lodashGet(props.categories.find(category => category.id === selectedCategoryId), 'name'),
    [selectedCategoryId],
  );

  const categoriesMap = props.categories
    .filter(category => !category.isSubCategory)
    .map(category => ({
      id: category.id,
      name: category.name,
      photoUrl: category.photoUrl,
      subCategories: props.categories
        .filter(_category => _category.isSubCategory && _category.parentId === category.id)
        .map(_category => ({
          id: category.id,
          name: category.name,
          photoUrl: category.photoUrl,
        })),
    }));

  const __ = (
    <Container>
      <StyledDiv>
        <CategoryHorizontalList
          categories={categoriesMap}
          selectedCateogryId={selectedParentCategoryId}
          onItemClick={id => {
            setSelectedCategoryId(id);
            setSelectedParentCategoryId(id);
          }}
          onSubItemClick={id => {
            setSelectedParentCategoryId(props.categories.find(category => category.id === id).parentId);
            setSelectedCategoryId(id);
          }}
        />
        <StyledSelectedParentCategoryTitle>{selectedCategoryName}</StyledSelectedParentCategoryTitle>
      </StyledDiv>
      <ProductList selectedCategoryId={selectedCategoryId} />
    </Container>
  );

  /*
  ProductsPageComponent Lifecycle
  */

  React.useEffect(() => {
    if (props.categories.length > 0) {
      if (!props.selectedCategoryId) {
        const cat = props.categories.filter(c => !c.isSubCategory)[0];
        setSelectedCategoryId(cat.id);
        setSelectedParentCategoryId(cat.id);
      } else {
        const cat = props.categories.find(c => c.id === selectedCategoryId && c.isSubCategory);
        setSelectedParentCategoryId(cat ? cat.parentId : selectedCategoryId);
      }
    }
  }, []);

  /*
  ProductsPageComponent Functions
  */

  return __;
};

const ProductsPageComponent = _ProductsPageComponent;

export { ProductsPageComponent };
