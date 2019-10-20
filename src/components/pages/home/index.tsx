import * as React from 'react';
import styled from '~/styled';
import { Container } from '~/components/ui';
import { ProductCard, ProductCardWrapper } from './product-card';
import { Query } from '~/cache-management/components/query';
import { queryEndpoints } from '~/services';
import { CategoryFields } from './category';
import { CategoryHorizontalList } from '~/backend-components/common/category-horizontal-list';
import { WithAuthUserComponentProps } from '~/components/hoc/with-auth-user';

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

const Home: React.SFC<IHomeProps & WithAuthUserComponentProps> = props => {
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<string>(null);
  const [selectedParentCategoryId, setSelectedParentCategoryId] = React.useState<string>(null);

  if (!props.user) {
    return null;
  }

  return (
    <Query
      query={queryEndpoints.getCategories}
      variables={{ type: 'all' }}
      onComplated={d => {
        const cat = d.filter(c => !c.subCategory)[0];
        setSelectedCategoryId(cat.id);
        setSelectedParentCategoryId(cat.id);
      }}
    >
      {({ data, loading, error }) => {
        if (data && selectedCategoryId && selectedParentCategoryId) {
          const selectedCategoryName = data.find(category => category.id === selectedCategoryId)!.name;

          return (
            <Container>
              <StyledDiv>
                <CategoryHorizontalList
                  categories={data}
                  selectedCateogryId={selectedParentCategoryId}
                  onItemClick={id => {
                    setSelectedCategoryId(id);
                    setSelectedParentCategoryId(id);
                  }}
                  onSubItemClick={id => {
                    setSelectedParentCategoryId(data.find(category => category.id === id).parentId);
                    setSelectedCategoryId(id);
                  }}
                />
                <StyledSelectedParentCategoryTitle>{selectedCategoryName}</StyledSelectedParentCategoryTitle>
              </StyledDiv>

              <StyledCardContainer>
                {[1, 2, 3, 4].map(i => (
                  <ProductCard key={i} />
                ))}
              </StyledCardContainer>
            </Container>
          );
        }
        return null;
      }}
    </Query>
  );
};
interface IHomeProps {}

export default Home;
