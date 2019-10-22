import * as React from 'react';
import styled from '~/styled';
import { Container } from '~/components/ui';
import { ProductCardWrapper, ProductCard } from '~/components/pages/products/product-card';
import { CategoryHorizontalList } from '~/backend-components/common/category-horizontal-list';
import { ICategoryResponse } from '~/backend-model-helpers';

/*
  ProductsPageComponent Helpers
*/
interface ProductsPageComponentProps {
  categories: ICategoryResponse[];
  categoryIdParam?: string;
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

const StyledCardContainer = styled(StyledDiv)`
  display: flex;
  ${ProductCardWrapper} {
    :first-child {
      margin-left: 0;
    }
    :last-child {
      margin-right: 0;
    }
  }
`;

const _ProductsPageComponent: React.SFC<ProductsPageComponentProps> = props => {
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<string>(props.categoryIdParam);
  const [selectedParentCategoryId, setSelectedParentCategoryId] = React.useState<string>(null);
  const selectedCategoryName = React.useMemo(
    () => props.categories.find(category => category.id === selectedCategoryId)!.name || '',
    [selectedCategoryId],
  );

  React.useEffect(() => {
    if (props.categories.length > 0) {
      if (!props.categoryIdParam) {
        const cat = props.categories.filter(c => !c.subCategory)[0];
        setSelectedCategoryId(cat.id);
        setSelectedParentCategoryId(cat.id);
      } else {
        const cat = props.categories.find(c => c.id === selectedCategoryId && c.subCategory);
        setSelectedParentCategoryId(cat ? cat.parentId : selectedCategoryId);
      }
    }
  }, []);

  const __ = (
    <Container>
      <StyledDiv>
        <CategoryHorizontalList
          categories={props.categories}
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

      {/* TODO: remove mock data */}
      <StyledCardContainer>
        {[1, 2, 3, 4].map(i => (
          <ProductCard key={i} />
        ))}
      </StyledCardContainer>
    </Container>
  );

  /*
  ProductsPageComponent Lifecycle
  */

  /*
  ProductsPageComponent Functions
  */

  return __;
};

const ProductsPageComponent = _ProductsPageComponent;

export { ProductsPageComponent };
