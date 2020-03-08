import * as React from 'react';
import { Redirect } from 'react-router';
import styled from '~/styled/index';
import { Container } from '~/components/ui/index';
import { CategoryHorizontalListFetcher } from '~/fetcher-components/common/category-horizontal-list';
import { ObligationComponent } from '~/components/common/obligation/index';
import { AnnouncementComponent } from '~/components/common/announcements/index';
import { useApplicationContext } from '~/app/context';
import { CreditSummaryComponent } from '~/components/common/credit-summary/index';

/* Home Helpers */
interface HomeProps {}

/* Home Style Constants */

/* Home Styles */

const HomeWrapper = styled.div``;

/* Home Component  */
function Home(props: React.PropsWithChildren<HomeProps>) {
  const applicationContext = useApplicationContext();

  if (applicationContext.user.isMerchant) {
    return <Redirect to="/merchant/home" />;
  }
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
