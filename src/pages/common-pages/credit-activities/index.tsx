/* eslint-disable dot-notation */
import * as React from 'react';
import { useParams, useLocation } from 'react-router';
import styled from '~/styled';
import { Container, UITable } from '~/components/ui';
import { usePaginationQuery } from '~/services/query-context/use-pagination-quey';
import { paginationQueryEndpoints } from '~/services/query-context/pagination-query-endpoints';
import { useApplicationContext } from '~/app/context';
import { ICreditActivityResponse } from '~/services/helpers/backend-models';
import { UITableColumns } from '~/components/ui/table';
import { CreditActivitiesFilterComponent } from './filter';
import { twoDigit } from '~/utils';

/* CreditActivities Helpers */
interface CreditActivitiesProps {}
interface RouteParams {
  creditId?: string;
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
  const locationState = useLocation().state;
  const [activityType, setActivityType] = React.useState(
    locationState && locationState['activityType'] ? locationState['activityType'] : undefined,
  );
  const { creditId } = useParams<RouteParams>();

  const sortList = [
    { value: 'id', label: 'Eklenme Sirasina Gore' },
    { value: 'date', label: 'Tarihe Gore' },
    { value: 'priceValue', label: 'Fiyata' },
  ];
  const [sortBy, setSortBy] = React.useState();
  const [sortType, setSortType] = React.useState();
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
      startDate,
      lastDate,
      userId: creditId,
      activityType,
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
        title: 'Tarih',
        itemRenderer: item => item.date,
      },
      {
        title: 'Islem Tipi',
        itemRenderer: item => item.activityType,
      },
      {
        title: 'Odeme Yontemi',
        itemRenderer: item => item.paymentType,
      },
      {
        title: 'Fatura Tutari',
        itemRenderer: item => item.price,
      },
      {
        title: 'Odenen Tutar',
        itemRenderer: item => item.paidPrice,
      },
      {
        title: 'Kalan Borc',
        itemRenderer: item => item.currentDebt,
      },
    ];
    if (applicationContext.user.isMerchant || applicationContext.user.isAdmin) {
      columns.unshift({
        title: 'Musteri',
        itemRenderer: item => item.customerName,
      });
    }
    if (applicationContext.user.isCustomer || applicationContext.user.isAdmin) {
      columns.unshift({
        title: 'Kreditor',
        itemRenderer: item => (item.merchantName ? item.merchantName : 'Sistem'),
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

  const handleLastDateFilterChange = React.useCallback((e: Date) => {
    setLastDate(`${twoDigit(e.getDate())}-${twoDigit(e.getMonth() + 1)}-${e.getFullYear()}`);
  }, []);
  const handleStartDateFilterChange = React.useCallback((e: Date) => {
    setStartDate(`${twoDigit(e.getDate())}-${twoDigit(e.getMonth() + 1)}-${e.getFullYear()}`);
  }, []);

  /* CreditActivities Lifecycle  */

  return (
    <Container>
      <StyledPageContainer>
        <StyledPageHeader>
          <h3>Cari Ekstralar</h3>
        </StyledPageHeader>
        <CreditActivitiesFilterComponent
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
