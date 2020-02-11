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
const StyledPageHeader = styled.div`
  display: flex;
`;
const commonIconStyle = css`
  cursor: pointer;
  margin: 0 8px;
`;
const addIconStyle = css`
  margin-left: 8px;
`;
const addBtnWrapper = css`
  width: 100%;
  display: inline-block;
`;
/* AllProductPage Component  */

function AllProductPage(props: React.PropsWithChildren<AllProductPageProps>) {
  /* AllProductPage Variables */
  const { t } = useTranslation();
  const popupsContext = usePopupContext();
  const applicationContext = useApplicationContext();
  const sortList = [
    { value: 'id', label: 'Eklenme Sirasina Gore' },
    { value: 'name', label: 'Isme Gore' },
    { value: 'status', label: 'Aktiflik Durumuna Gore' },
  ];
  const [sortBy, setSortBy] = React.useState();
  const [sortType, setSortType] = React.useState();
  const [allProductsPageNumber, setAllProductPageNumber] = React.useState(1);
  const {
    data: { values: productsValues, totalPage },
    getDataByPage: productsByPage,
  } = usePaginationQuery(paginationQueryEndpoints.getAllProducts, {
    pageNumber: allProductsPageNumber,
    variables: {
      sortBy,
      sortType,
    },
    defaultValue: { values: [], totalPage: 0 },
  });
  const products = React.useMemo(() => {
    return productsByPage(allProductsPageNumber);
  }, [productsByPage, allProductsPageNumber]);
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
        title: 'Vergi orani',
        itemRenderer: item => <span>{item.tax} %</span>,
      },
      {
        title: 'Komisyon orani',
        itemRenderer: item => <span>{item.commission} %</span>,
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
            <UIIcon
              name="add"
              color={colors.primaryDark}
              className={commonIconStyle}
              size={16}
              onClick={() => {
                popupsContext.addBarcode.show({ productId: item.id });
              }}
            />
            <UIIcon
              name="rightArrow"
              color={colors.dangerDark}
              className={commonIconStyle}
              size={16}
              onClick={() => {
                popupsContext.removeBarcode.show({ productId: item.id, barcodeList: item.barcodeList });
              }}
            />
          </StyledActionsWrapper>
        ),
      });
    }

    return table;
  }, [
    refetchQuery,
    applicationContext.user.isAdmin,
    popupsContext.deleteProduct,
    popupsContext.updateProduct,
    t,
    popupsContext.addBarcode,
    popupsContext.removeBarcode,
  ]);

  /* AllProductPage Callbacks */
  const onChangePage = React.useCallback(
    (pageIndex: number, pageCount: number) => {
      if (allProductsPageNumber <= totalPage && pageIndex <= pageCount) {
        setAllProductPageNumber(pageIndex);
      }
    },
    [allProductsPageNumber, totalPage],
  );

  /* AllProductPage Lifecycle  */

  return (
    <Container>
      <StyledPageContainer>
        {applicationContext.user.isAdmin && (
          <div className={addBtnWrapper}>
            <StyledAddButton onClick={() => popupsContext.createProduct.show({})}>
              {t('common.add')} <UIIcon name="add" color={colors.white} size={10} className={addIconStyle} />
            </StyledAddButton>
          </div>
        )}
        <StyledPageHeader>
          <h3>Tum Urunler</h3>
        </StyledPageHeader>
        <UITable
          onSortChange={e => setSortBy(e.value)}
          onSortTypeChange={value => setSortType(value)}
          sortList={sortList}
          id="all-products-page-table"
          data={productsValues}
          rowCount={products.elementCountOfPage > 0 ? products.elementCountOfPage : 5}
          columns={TABLE_DATA_COLUMNS}
          totalPageCount={totalPage}
          onChangePage={onChangePage}
        />
      </StyledPageContainer>
    </Container>
  );
}
const PureAllProductPage = React.memo(AllProductPage);

export { PureAllProductPage as AllProductPage };
