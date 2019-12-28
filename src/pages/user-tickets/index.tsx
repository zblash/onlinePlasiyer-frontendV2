import * as React from 'react';
import styled, { colors } from '~/styled';
import { Container, UILink, UITable } from '~/components/ui';
import { CategoryHorizontalListFetcher } from '~/fetcher-components/common/category-horizontal-list';
import { useApplicationContext } from '~/app/context';
import { usePaginationQuery } from '~/services/query-context/use-pagination-quey';
import { paginationQueryEndpoints } from '~/services/query-context/pagination-query-endpoints';

/* UserTicketsPage Helpers */
interface UserTicketsPageProps {}

/* UserTicketsPage Constants */

/* UserTicketsPage Styles */
const StyledPageContainer = styled.div``;
const StyledPageHeader = styled.div`
  display: flex;
`;
const StyledLink = styled(UILink)`
  color: ${colors.primaryDark};
`;

/* UserTicketsPage Component  */
function UserTicketsPage(props: React.PropsWithChildren<UserTicketsPageProps>) {
  /* UserTicketsPage Variables */
  const applicationContext = useApplicationContext();
  const {
    data: { values: tickets, elementCountOfPage },
  } = usePaginationQuery(paginationQueryEndpoints.getAllTickets, {
    defaultValue: { values: [] },
    pageNumber: 1,
  });
  const columns = [
    {
      title: 'Baslik',
      itemRenderer: item => item.title,
    },
    {
      title: 'Durum',
      itemRenderer: item => item.status,
    },
    {
      title: 'Eklenme Tarihi',
      itemRenderer: item => item.addedTime,
    },
    {
      title: null,
      itemRenderer: item => <StyledLink to={`/ticket-replies/${item.id}`}>Detay</StyledLink>,
    },
  ];
  /* UserTicketsPage Callbacks */

  /* UserTicketsPage Lifecycle  */

  return (
    <Container>
      {applicationContext.user.isCustomer && <CategoryHorizontalListFetcher shouldUseProductsPageLink />}
      <StyledPageHeader>
        <h3>{applicationContext.user.isAdmin ? 'Kullanici Destek Talepleri' : 'Destek Taleplerim'}</h3>
      </StyledPageHeader>
      <StyledPageContainer>
        <UITable
          id="invoices-page-table"
          data={tickets}
          rowCount={elementCountOfPage > 0 ? elementCountOfPage : 15}
          columns={columns}
        />
      </StyledPageContainer>
    </Container>
  );
}
const PureUserTicketsPage = React.memo(UserTicketsPage);

export { PureUserTicketsPage as UserTicketsPage };
