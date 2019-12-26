import * as React from 'react';
import styled from '~/styled';
import { Container } from '~/components/ui';
import { CategoryHorizontalListFetcher } from '~/fetcher-components/common/category-horizontal-list';
import { ObligationComponent } from '~/components/common/obligation';
import { AnnouncementComponent } from '~/components/common/announcements';
import { useApplicationContext } from '~/app/context';
import { CreditSummaryComponent } from '~/components/common/credit-summary';

/* Home Helpers */
interface HomeProps {}

/* Home Style Constants */

/* Home Styles */

const HomeWrapper = styled.div``;

/* Home Component  */
function Home(props: React.PropsWithChildren<HomeProps>) {
  const applicationContext = useApplicationContext();

  const __ = (
    <Container>
      <CategoryHorizontalListFetcher shouldUseProductsPageLink />
      <HomeWrapper>
        <AnnouncementComponent />
        {!applicationContext.user.isCustomer && <ObligationComponent />}
        {applicationContext.user.isCustomer && <CreditSummaryComponent />}
      </HomeWrapper>
    </Container>
  );
  /* Home Lifecycle  */

  /* Home Functions  */

  return __;
}

const _Home = Home;

export { _Home as Home };
