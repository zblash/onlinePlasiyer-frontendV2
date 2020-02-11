import * as React from 'react';
import { useParams } from 'react-router';
import styled from '~/styled';
import { Container, UITable } from '~/components/ui';
import { useApplicationContext } from '~/app/context';
import { usePaginationQuery } from '~/services/query-context/use-pagination-quey';
import { paginationQueryEndpoints } from '~/services/query-context/pagination-query-endpoints';
import { UITableColumns } from '~/components/ui/table';
import { IObligationActivityResponse } from '~/services/helpers/backend-models';

/* ObligationsPage Helpers */
interface ObligationsPageProps {}
interface RouteParams {
  userId?: string;
}
/* ObligationsPage Constants */

/* ObligationsPage Styles */
const StyledPageContainer = styled.div``;
const StyledPageHeader = styled.div`
  display: flex;
`;

/* ObligationsPage Component  */
function ObligationsPage(props: React.PropsWithChildren<ObligationsPageProps>) {
  /* ObligationsPage Variables */
  const applicationContext = useApplicationContext();
  const { userId } = useParams<RouteParams>();
  const sortList = [
    { value: 'id', label: 'Eklenme Sirasina Gore' },
    { value: 'date', label: 'Tarihe Gore' },
    { value: 'priceValue', label: 'Fiyata' },
  ];
  const [sortBy, setSortBy] = React.useState();
  const [sortType, setSortType] = React.useState();
  const [allObligationsPageNumber, setAllObligationsPageNumber] = React.useState(1);
  const {
    data: { values: obligationsValues, totalPage },
    getDataByPage: obligationsByPage,
  } = usePaginationQuery(paginationQueryEndpoints.getAllObligationActivities, {
    pageNumber: allObligationsPageNumber,
    variables: {
      sortBy,
      sortType,
      userId: applicationContext.user.isAdmin ? userId : undefined,
    },
    defaultValue: { values: [], totalPage: 0 },
  });
  const allObligations = React.useMemo(() => {
    return obligationsByPage(allObligationsPageNumber);
  }, [obligationsByPage, allObligationsPageNumber]);
  const TABLE_DATA_COLUMNS = React.useMemo<UITableColumns<IObligationActivityResponse>[]>(() => {
    const columns = [
      {
        title: 'Belge No',
        itemRenderer: item => item.documentNo,
      },
      {
        title: 'Tarih',
        itemRenderer: item => item.date,
      },
      {
        title: 'Islem Tipi',
        itemRenderer: item => item.obligationActivityType,
      },
      {
        title: 'Islem Tutari',
        itemRenderer: item => item.price,
      },
      {
        title: 'Borc',
        itemRenderer: item => item.totalDebt,
      },
      {
        title: 'Toplam Bakiye',
        itemRenderer: item => item.totalReceivable,
      },
    ];
    if (applicationContext.user.isAdmin) {
      columns.push({
        title: 'Kullanici',
        itemRenderer: item => item.userName,
      });
    }

    return columns;
  }, [applicationContext.user]);

  /* CreditActivities Callbacks */
  const onChangePage = React.useCallback(
    (pageIndex: number, pageCount: number) => {
      if (allObligationsPageNumber <= totalPage && pageIndex <= pageCount) {
        setAllObligationsPageNumber(pageIndex);
      }
    },
    [allObligationsPageNumber, totalPage],
  );
  /* ObligationsPage Callbacks */

  /* ObligationsPage Lifecycle  */

  return (
    <Container>
      <StyledPageContainer>
        <StyledPageHeader>
          <h3>Sistem Borclari</h3>
        </StyledPageHeader>
        <UITable
          id="obligations-page-table"
          onSortChange={e => setSortBy(e.value)}
          onSortTypeChange={value => setSortType(value)}
          sortList={sortList}
          data={obligationsValues}
          rowCount={allObligations.elementCountOfPage > 0 ? allObligations.elementCountOfPage : 5}
          columns={TABLE_DATA_COLUMNS}
          totalPageCount={totalPage}
          onChangePage={onChangePage}
        />
      </StyledPageContainer>
    </Container>
  );
}
const PureObligationsPage = React.memo(ObligationsPage);

export { PureObligationsPage as ObligationsPage };
