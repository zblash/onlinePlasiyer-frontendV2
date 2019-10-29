import * as React from 'react';
import { Container } from '~/components/ui';
import { useQuery } from '~/services/context';
import { queryEndpoints } from '~/services/endpoints';
import { CategoryHorizontalList } from '~/components/common/category-horizontal-list';

interface HomeProps {}

const Home: React.SFC<HomeProps> = props => {
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

  return (
    <Container>
      <CategoryHorizontalList categories={categoriesMap} shouldUseProductsPageLink />
    </Container>
  );
};

export { Home };
