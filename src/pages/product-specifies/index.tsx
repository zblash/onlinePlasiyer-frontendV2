import * as React from 'react';
import { useParams } from 'react-router';
import styled, { colors, css } from '~/styled';
import { useTranslation } from '~/i18n';
import { CategoryHorizontalListFetcher } from '~/fetcher-components/common/category-horizontal-list';
import { paginationQueryEndpoints } from '~/services/query-context/pagination-query-endpoints';
import { usePaginationQuery } from '~/services/query-context/use-pagination-quey';
import { refetchFactory } from '~/services/utils';
import { ISpecifyProductResponse } from '~/services/helpers/backend-models';
import { UITableColumns, UITable } from '~/components/ui/table';
import { usePopupContext } from '~/contexts/popup/context';
import { Container, UIIcon } from '~/components/ui';

/* ProductSpecifiesPage Helpers */
interface ProductSpecifiesPageProps {}
interface RouteParams {
  userId?: string;
}

/* ProductSpecifiesPage Constants */

/* ProductSpecifiesPage Styles */
const StyledPageContainer = styled.div`
  margin-top: 48px;
`;
const StyledActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const commonIconStyle = css`
  cursor: pointer;
  margin: 0 8px;
`;

/* ProductSpecifiesPage Component  */
function ProductSpecifiesPage(props: React.PropsWithChildren<ProductSpecifiesPageProps>) {
  /* ProductSpecifiesPage Variables */
  const { t } = useTranslation();
  const popupsContext = usePopupContext();
  const { userId } = useParams<RouteParams>();
  const [allProductsPageNumber, setAllProductPageNumber] = React.useState(1);
  const {
    data: { values: productSpecifies, totalPage, elementCountOfPage },
  } = usePaginationQuery(paginationQueryEndpoints.getAllSpecifies, {
    variables: {
      userId,
    },
    pageNumber: allProductsPageNumber,
    defaultValue: { values: [], totalPage: 0 },
  });
  const refetchQuery = React.useMemo(
    () =>
      refetchFactory(paginationQueryEndpoints.getAllSpecifies, {
        userId,
      }),
    [userId],
  );

  /* ProductSpecifiesPage Callbacks */
  const onChangePage = React.useCallback(
    (pageIndex: number, pageCount: number) => {
      if (allProductsPageNumber < totalPage && pageIndex + 2 >= pageCount) {
        setAllProductPageNumber(allProductsPageNumber + 1);
      }
    },
    [allProductsPageNumber, totalPage],
  );

  const onDeleteClick = React.useCallback(
    id => {
      popupsContext.deleteProductSpecify.show({
        id,
        refetchQuery,
      });
    },
    [popupsContext.deleteProductSpecify, refetchQuery],
  );
  /* ProductSpecifiesPage Lifecycle  */

  const TABLE_DATA_COLUMNS = React.useMemo<UITableColumns<ISpecifyProductResponse>[]>(
    () => [
      {
        title: t('common.product-name'),
        itemRenderer: item => item.productName,
      },
      {
        title: t('common.merchant'),
        itemRenderer: item => item.sellerName,
      },
      {
        title: t('common.quantity'),
        itemRenderer: item => item.quantity,
      },
      {
        title: t('common.contents'),
        itemRenderer: item => item.contents,
      },
      {
        title: t('cart.recommended-sales-price'),
        itemRenderer: item => item.recommendedRetailPrice,
      },
      {
        title: t('common.total-price'),
        itemRenderer: item => item.totalPrice,
      },
      {
        title: t('common.unit-price'),
        itemRenderer: item => item.unitPrice,
      },
      {
        title: t('common.unit-type'),
        itemRenderer: item => item.unitType,
      },
      {
        title: t('product-specify.active-states'),
        itemRenderer: item => item.states.map(x => `${x.cityTitle} - ${x.title}`).join(','),
      },
      {
        title: null,
        itemRenderer: item => (
          <StyledActionsWrapper>
            <UIIcon
              name="trash"
              color={colors.dangerDark}
              className={commonIconStyle}
              size={16}
              onClick={x => onDeleteClick(item.id)}
            />
            <UIIcon name="edit" color={colors.primaryDark} className={commonIconStyle} size={16} />
          </StyledActionsWrapper>
        ),
      },
    ],
    [t, onDeleteClick],
  );

  return (
    <Container>
      <CategoryHorizontalListFetcher shouldUseProductsPageLink />
      <StyledPageContainer>
        <UITable
          id="all-product-specifies-page-table"
          data={productSpecifies}
          rowCount={elementCountOfPage > 0 ? elementCountOfPage : 15}
          columns={TABLE_DATA_COLUMNS}
          onChangePage={onChangePage}
        />
      </StyledPageContainer>
    </Container>
  );
}
const PureProductSpecifiesPage = React.memo(ProductSpecifiesPage);

export { PureProductSpecifiesPage as ProductSpecifiesPage };
