import * as React from 'react';
import styled, { colors, css } from '~/styled';
import { useTranslation } from '~/i18n';
import { usePaginationQuery } from '~/services/query-context/use-pagination-quey';
import { paginationQueryEndpoints } from '~/services/query-context/pagination-query-endpoints';
import { Container, UIIcon, UIButton } from '~/components/ui';
import { UITableColumns, UITable } from '~/components/ui/table';
import { IProductResponse } from '~/services/helpers/backend-models';
import { usePopupContext } from '~/contexts/popup/context';
import { refetchFactory } from '~/services/utils';
import { useApplicationContext } from '~/app/context';

/* AllProductPage Helpers */
interface AllProductPageProps {}

/* AllProductPage Constants */

/* AllProductPage Styles */
const StyledPageContainer = styled.div`
  margin-top: 48px;
`;
const ProductImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${colors.gray};
`;
const StyledActiveStatusSpan = styled.span``;
const StyledActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledAddButton = styled(UIButton)`
  float: right;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
  background-color: ${colors.lightGray};
  color: ${colors.white};
  padding: 4px 8px;
  border-radius: 8px;
  :active {
    background-color: ${colors.primaryDark} !important;
  }
  :hover {
    background-color: ${colors.primary};
  }
`;
const commonIconStyle = css`
  cursor: pointer;
  margin: 0 8px;
`;
const addIconStyle = css`
  margin-left: 8px;
`;
/* AllProductPage Component  */

function AllProductPage(props: React.PropsWithChildren<AllProductPageProps>) {
  /* AllProductPage Variables */
  const { t } = useTranslation();
  const popupsContext = usePopupContext();
  const applicationContext = useApplicationContext();
  const [allProductsPageNumber, setAllProductPageNumber] = React.useState(1);
  const {
    data: { values: products, totalPage },
  } = usePaginationQuery(paginationQueryEndpoints.getAllProducts, {
    pageNumber: allProductsPageNumber,
    defaultValue: { values: [], totalPage: 0 },
  });
  const refetchQuery = React.useMemo(() => refetchFactory(paginationQueryEndpoints.getAllProducts, null), []);
  const TABLE_DATA_COLUMNS = React.useMemo<UITableColumns<IProductResponse>[]>(() => {
    const table = [
      {
        title: null,
        itemRenderer: item => <ProductImage src={item.photoUrl} />,
      },
      {
        title: t('all-products-page.table.name'),
        itemRenderer: item => item.name,
      },
      {
        title: t('all-products-page.table.category-name'),
        itemRenderer: item => item.categoryName,
      },
      {
        title: t('all-products-page.table.active-status'),
        itemRenderer: item => (
          <StyledActiveStatusSpan>
            {item.active ? t('all-products-page.table.active') : t('all-products-page.table.passive')}
          </StyledActiveStatusSpan>
        ),
      },
      {
        title: t('all-products-page.table.barcode'),
        itemRenderer: item => item.barcodeList[0],
      },
    ];
    if (applicationContext.user.isAdmin) {
      table.push({
        title: null,
        itemRenderer: item => (
          <StyledActionsWrapper>
            <UIIcon
              name="trash"
              color={colors.dangerDark}
              className={commonIconStyle}
              size={16}
              onClick={() =>
                popupsContext.deleteProduct.show({
                  id: item.id,
                  name: item.name,
                  refetchQuery,
                })
              }
            />
            <UIIcon
              name="edit"
              color={colors.primaryDark}
              className={commonIconStyle}
              size={16}
              onClick={() => {
                popupsContext.updateProduct.show({ categoryId: item.categoryId, initialValue: item });
              }}
            />
          </StyledActionsWrapper>
        ),
      });
    }

    return table;
  }, [refetchQuery, applicationContext.user.isAdmin, popupsContext.deleteProduct, popupsContext.updateProduct, t]);

  /* AllProductPage Callbacks */
  const onChangePage = React.useCallback(
    (pageIndex: number, pageCount: number) => {
      if (allProductsPageNumber < totalPage && pageIndex + 2 >= pageCount) {
        setAllProductPageNumber(allProductsPageNumber + 1);
      }
    },
    [allProductsPageNumber, totalPage],
  );

  /* AllProductPage Lifecycle  */

  return (
    <Container>
      <StyledPageContainer>
        <StyledAddButton onClick={() => popupsContext.createProduct.show({})}>
          {t('common.add')} <UIIcon name="add" color={colors.white} size={10} className={addIconStyle} />
        </StyledAddButton>
        <UITable
          id="all-products-page-table"
          data={products}
          rowCount={14}
          columns={TABLE_DATA_COLUMNS}
          onChangePage={onChangePage}
        />
      </StyledPageContainer>
    </Container>
  );
}
const PureAllProductPage = React.memo(AllProductPage);

export { PureAllProductPage as AllProductPage };
