import * as React from 'react';
import styled from '~/styled';
import { CategoryList } from './category-list';
import { Container, Button } from '~/components/ui';
import { ProductCard, ProductCardWrapper } from './product-card';

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

const Home: React.SFC<IHomeProps> = props => {
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(categories[0].id);
  const [selectedParentCategoryId, setSelectedParentCategoryId] = React.useState(categories[0].id);

  const { subCategories, name: selectedParentCategoryName } = categories.find(
    category => category.id === selectedParentCategoryId,
  );
  const selectedCategoryName =
    selectedCategoryId === selectedParentCategoryId
      ? selectedParentCategoryName
      : subCategories.find(category => category.id === selectedCategoryId).name;

  return (
    <Container>
      <StyledDiv>
        <CategoryList
          categories={categories}
          selectedCateogryId={selectedParentCategoryId}
          onItemClick={id => {
            setSelectedCategoryId(id);
            setSelectedParentCategoryId(id);
          }}
          onSubItemClick={id => {
            setSelectedParentCategoryId(
              categories.find(category => category.subCategories.find(subCategory => subCategory.id === id)).id,
            );
            setSelectedCategoryId(id);
          }}
        />
        <StyledSelectedParentCategoryTitle>{selectedCategoryName}</StyledSelectedParentCategoryTitle>
      </StyledDiv>

      <StyledCardContainer>
        {[1, 2, 3, 4].map(() => (
          <ProductCard />
        ))}
      </StyledCardContainer>
    </Container>
  );
};
interface IHomeProps {}

export default Home;

// TODO: remove
const categories = new Array(11).fill('').map((_, index) => ({
  id: `${index}`,
  name: `Category${index}`,
  img: `https://picsum.photos/700/${900 + index}`,
  subCategories: new Array(11).fill('').map((_, index2) => ({
    id: `${index}_${index2}`,
    name: `Category${index}_${index2}`,
    img: `https://picsum.photos/600/${800 + index}`,
  })),
}));
