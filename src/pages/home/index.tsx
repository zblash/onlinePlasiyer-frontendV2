import * as React from 'react';
import { Container } from '~/components/ui';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { useApiCallContext } from '~/services/api-call-context/context';
// import { CategoryHorizontalListFetcher } from '~/fetcher-components/common/category-horizontal-list';

interface HomeProps {}

const Home: React.SFC<HomeProps> = props => {
  // const apiCallContext = useApiCallContext();
  // const d = useQuery(queryEndpoints.getCategories, { variables: { type: 'all' } });
  // console.log(d);

  return <Container>{/* <CategoryHorizontalListFetcher shouldUseProductsPageLink /> */}</Container>;
};

export { Home };
