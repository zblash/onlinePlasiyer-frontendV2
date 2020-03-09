import * as React from 'react';
import styled, { colors, css } from '~/styled';
import { usePopupContext } from '~/contexts/popup/context';
import { usePaginationQuery } from '~/services/query-context/use-pagination-quey';
import { paginationQueryEndpoints } from '~/services/query-context/pagination-query-endpoints';
import { refetchFactory } from '~/services/utils';
import { UIIcon, Container, UITable } from '~/components/ui';
import { CreditsFilterComponent } from '../all-credits/filter';

/* MerchantCredits Helpers */
interface MerchantCreditsProps {}

/* MerchantCredits Constants */

/* MerchantCredits Styles */
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

/* MerchantCredits Component  */
function MerchantCredits(props: React.PropsWithChildren<MerchantCreditsProps>) {
  /* MerchantCredits Variables */
  const sortList = [
    { value: 'id', label: 'Eklenme Sirasina Gore' },
    { value: 'totalDebt', label: 'Borca Gore' },
    { value: 'creditLimit', label: 'Kredi Limitine Gore' },
  ];
  const popupsContext = usePopupContext();
  const [sortBy, setSortBy] = React.useState();
  const [sortType, setSortType] = React.useState();
  const [username, setUsername] = React.useState();
  const [allCreditsPageNumber, setAllCreditsPageNumber] = React.useState(1);
  const {
    data: { values: creditsValues, totalPage },
    getDataByPage: creditsByPage,
  } = usePaginationQuery(paginationQueryEndpoints.getAllUserCredits, {
    pageNumber: allCreditsPageNumber,
    variables: {
      sortBy,
      sortType,
      userName: username,
    },
    defaultValue: { values: [], totalPage: 0 },
  });
  const refetchQuery = refetchFactory(paginationQueryEndpoints.getAllUserCredits);
  const credits = React.useMemo(() => {
    return creditsByPage(allCreditsPageNumber);
  }, [creditsByPage, allCreditsPageNumber]);
  const TABLE_DATA_COLUMNS = [
    {
      title: 'Kullanici',
      itemRenderer: item => item.customerName,
    },
    {
      title: 'Toplam Borc',
      itemRenderer: item => item.totalDebt,
    },
    {
      title: 'Kredi Limiti',
      itemRenderer: item => item.creditLimit,
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
              popupsContext.editCredit.show({ credit: item, refetchQuery });
            }}
          />
        </StyledActionsWrapper>
      ),
    },
  ];
  /* MerchantCredits Callbacks */
  const onChangePage = React.useCallback(
    (pageIndex: number, pageCount: number) => {
      if (allCreditsPageNumber <= totalPage && pageIndex <= pageCount) {
        setAllCreditsPageNumber(pageIndex);
      }
    },
    [allCreditsPageNumber, totalPage],
  );
  /* MerchantCredits Lifecycle  */

  return (
    <Container>
      <StyledPageContainer>
        <StyledPageHeader>
          <h3>Krediler</h3>
        </StyledPageHeader>
        <CreditsFilterComponent setCustomer={e => setUsername(e)} />
        <UITable
          onSortChange={e => setSortBy(e.value)}
          onSortTypeChange={value => setSortType(value)}
          sortList={sortList}
          id="merchant-credits-page-table"
          data={creditsValues}
          rowCount={credits.elementCountOfPage > 0 ? credits.elementCountOfPage : 15}
          columns={TABLE_DATA_COLUMNS}
          totalPageCount={totalPage}
          onChangePage={onChangePage}
        />
      </StyledPageContainer>
    </Container>
  );
}
const PureMerchantCredits = React.memo(MerchantCredits);

export { PureMerchantCredits as MerchantCredits };
