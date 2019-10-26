import * as React from 'react';
import { Container } from '~/components/ui';
import { CategoryHorizontalList } from '~/backend-components/common/category-horizontal-list';
import { WithAuthUserComponentProps } from '~/components/hoc/with-auth-user';

interface HomeProps extends WithAuthUserComponentProps {}

const Home: React.SFC<HomeProps> = props => {
  return <Container>{props.user && <CategoryHorizontalList shouldUseProductsPageLink />}</Container>;
};

export default Home;
