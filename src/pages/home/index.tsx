import * as React from 'react';
import { Container } from '~/components/ui';
import { CategoryHorizontalListFetcher } from '~/fetcher-components/common/category-horizontal-list';

interface HomeProps {}

const Home: React.SFC<HomeProps> = props => {
  return (
    <Container>
      <CategoryHorizontalListFetcher shouldUseProductsPageLink />
    </Container>
  );
};

export { Home };
