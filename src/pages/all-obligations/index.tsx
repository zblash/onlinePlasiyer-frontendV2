import * as React from 'react';
import styled, { colors, css } from '~/styled';
import { usePopupContext } from '~/contexts/popup/context';
import { usePaginationQuery } from '~/services/query-context/use-pagination-quey';
import { paginationQueryEndpoints } from '~/services/query-context/pagination-query-endpoints';
import { refetchFactory } from '~/services/utils';
import { UIIcon, Container, UITable } from '~/components/ui';

/* AllObligationsPage Helpers */
interface AllObligationsPageProps {}

/* AllObligationsPage Constants */

/* AllObligationsPage Styles */
const StyledPageContainer = styled.div`
  margin-top: 48px;
`;
const StyledActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledPageHeader = styled.div`
  display: flex;
`;
const commonIconStyle = css`
  cursor: pointer;
  margin: 0 8px;
`;
/* AllObligationsPage Component  */
function AllObligationsPage(props: React.PropsWithChildren<AllObligationsPageProps>) {
  /* AllObligationsPage Variables */
  const sortList = [
    { value: 'id', label: 'Eklenme Sirasina Gore' },
    { value: 'debt', label: 'Borca Gore' },
    { value: 'receivable', label: 'Alacaga Gore' },
  ];
  const popupsContext = usePopupContext();
  const [sortBy, setSortBy] = React.useState();
  const [sortType, setSortType] = React.useState();
  const [allObligationsPageNumber, setAllObligationsPageNumber] = React.useState(1);
  const {
    data: { values: obligationsValues, totalPage },
    getDataByPage: obligationsByPage,
  } = usePaginationQuery(paginationQueryEndpoints.getAllObligations, {
    pageNumber: allObligationsPageNumber,
    variables: {
      sortBy,
      sortType,
    },
    defaultValue: { values: [], totalPage: 0 },
  });
  const refetchQuery = refetchFactory(paginationQueryEndpoints.getAllObligations);
  const obligations = React.useMemo(() => {
    return obligationsByPage(allObligationsPageNumber);
  }, [obligationsByPage, allObligationsPageNumber]);
  const TABLE_DATA_COLUMNS = [
    {
      title: 'Kullanici',
      itemRenderer: item => item.userName,
    },
    {
      title: 'Toplam Borc',
      itemRenderer: item => item.debt,
    },
    {
      title: 'Toplam Alacak',
      itemRenderer: item => item.receivable,
    },
    {
      title: 'Kullanici',
      itemRenderer: item => item.userName,
    },
    {
      title: null,
      itemRenderer: item => (
        <StyledActionsWrapper>
          <UIIcon
            name="edit"
            color={colors.primaryDark}
            className={commonIconStyle}
            size={16}
            onClick={() => {
              popupsContext.editObligation.show({ obligation: item, refetchQuery });
            }}
          />
        </StyledActionsWrapper>
      ),
    },
  ];
  /* AllObligationsPage Callbacks */
  const onChangePage = React.useCallback(
    (pageIndex: number, pageCount: number) => {
      if (allObligationsPageNumber <= totalPage && pageIndex <= pageCount) {
        setAllObligationsPageNumber(pageIndex);
      }
    },
    [allObligationsPageNumber, totalPage],
  );
  /* AllObligationsPage Lifecycle  */

  return (
    <Container>
      <StyledPageContainer>
        <StyledPageHeader>
          <h3>Satici Sistem Borclari</h3>
        </StyledPageHeader>
        <UITable
          onSortChange={e => setSortBy(e.value)}
          onSortTypeChange={value => setSortType(value)}
          sortList={sortList}
          id="all-obligations-page-table"
          data={obligationsValues}
          rowCount={obligations.elementCountOfPage > 0 ? obligations.elementCountOfPage : 15}
          columns={TABLE_DATA_COLUMNS}
          totalPageCount={totalPage}
          onChangePage={onChangePage}
        />
      </StyledPageContainer>
    </Container>
  );
}
const PureAllObligationsPage = React.memo(AllObligationsPage);

export { PureAllObligationsPage as AllObligationsPage };
