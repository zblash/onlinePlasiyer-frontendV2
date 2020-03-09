import * as React from 'react';
import { useParams } from 'react-router';
import styled from '~/styled';
import { Container, UITable } from '~/components/ui';
import { usePaginationQuery } from '~/services/query-context/use-pagination-quey';
import { paginationQueryEndpoints } from '~/services/query-context/pagination-query-endpoints';
import { useApplicationContext } from '~/app/context';
import { ICreditActivityResponse } from '~/services/helpers/backend-models';
import { UITableColumns } from '~/components/ui/table';
import { CreditActivitiesFilterComponent } from './filter';

/* CreditActivities Helpers */
interface CreditActivitiesProps {}
interface RouteParams {
  userId?: string;
}
/* CreditActivities Constants */

/* CreditActivities Styles */
const StyledPageContainer = styled.div``;
const StyledPageHeader = styled.div`
  display: flex;
`;

/* CreditActivities Component  */
function CreditActivities(props: React.PropsWithChildren<CreditActivitiesProps>) {
  /* CreditActivities Variables */
  const applicationContext = useApplicationContext();
  const { userId } = useParams<RouteParams>();
  const sortList = [
    { value: 'id', label: 'Eklenme Sirasina Gore' },
    { value: 'date', label: 'Tarihe Gore' },
    { value: 'priceValue', label: 'Fiyata' },
  ];
  const [sortBy, setSortBy] = React.useState();
  const [sortType, setSortType] = React.useState();
  const [userName, setUserName] = React.useState<string>();
  const [lastDate, setLastDate] = React.useState<string>();
  const [startDate, setStartDate] = React.useState<string>();
  const [allCreditActivityPageNumber, setAllCreditActivityPageNumber] = React.useState(1);

  const query = React.useMemo(() => {
    if (applicationContext.user.isAdmin) {
      return paginationQueryEndpoints.getAllCreditActivities;
    }

    return paginationQueryEndpoints.getAllUsersCreditActivities;
  }, [applicationContext.user]);

  const {
    data: { values: creditsValues, totalPage },
    getDataByPage: creditsByPage,
  } = usePaginationQuery(query, {
    pageNumber: allCreditActivityPageNumber,
    variables: {
      sortBy,
      sortType,
      userId,
      userName,
      startDate,
      lastDate,
    },
    defaultValue: { values: [], totalPage: 0 },
  });
  const creditActivities = React.useMemo(() => {
    return creditsByPage(allCreditActivityPageNumber);
  }, [creditsByPage, allCreditActivityPageNumber]);
  const TABLE_DATA_COLUMNS = React.useMemo<UITableColumns<ICreditActivityResponse>[]>(() => {
    const columns = [
      {
        title: 'Belge No',
        itemRenderer: item => item.documentNo,
      },
      {
        title: 'Kreditor',
        itemRenderer: item => (item.creditType === 'MERCHANT_CREDIT' ? item.merchantName : 'Sistem'),
      },
      {
        title: 'Tarih',
        itemRenderer: item => item.date,
      },
      {
        title: 'Islem Tipi',
        itemRenderer: item => item.creditActivityType,
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
        itemRenderer: item => item.creditLimit,
      },
    ];
    if (applicationContext.user.isMerchant) {
      columns.push({
        title: 'Musteri',
        itemRenderer: item => item.customerName,
      });
    }

    return columns;
  }, [applicationContext.user]);

  /* CreditActivities Callbacks */
  const onChangePage = React.useCallback(
    (pageIndex: number, pageCount: number) => {
      if (allCreditActivityPageNumber <= totalPage && pageIndex <= pageCount) {
        setAllCreditActivityPageNumber(pageIndex);
      }
    },
    [allCreditActivityPageNumber, totalPage],
  );

  const handleUserFilterChange = React.useCallback((e: string) => {
    setUserName(e);
  }, []);
  const handleLastDateFilterChange = React.useCallback((e: Date) => {
    setLastDate(`${e.getDate()}-${e.getMonth() + 1}-${e.getFullYear()}`);
  }, []);
  const handleStartDateFilterChange = React.useCallback((e: Date) => {
    setStartDate(`${e.getDate()}-${e.getMonth() + 1}-${e.getFullYear()}`);
  }, []);
  /* CreditActivities Lifecycle  */

  return (
    <Container>
      <StyledPageContainer>
        <StyledPageHeader>
          <h3>Cari Ekstralar</h3>
        </StyledPageHeader>
        <CreditActivitiesFilterComponent
          setCustomer={handleUserFilterChange}
          setLastDate={handleLastDateFilterChange}
          setStartDate={handleStartDateFilterChange}
        />
        <UITable
          id="credit-activities-page-table"
          onSortChange={e => setSortBy(e.value)}
          onSortTypeChange={value => setSortType(value)}
          sortList={sortList}
          data={creditsValues}
          rowCount={creditActivities.elementCountOfPage > 0 ? creditActivities.elementCountOfPage : 5}
          columns={TABLE_DATA_COLUMNS}
          totalPageCount={totalPage}
          onChangePage={onChangePage}
        />
      </StyledPageContainer>
    </Container>
  );
}
const PureCreditActivities = React.memo(CreditActivities);

export { PureCreditActivities as CreditActivities };
