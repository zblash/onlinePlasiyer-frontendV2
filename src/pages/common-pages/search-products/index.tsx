import * as React from 'react';
import { useParams } from 'react-router';
import { css } from '~/styled';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { Container, UITable } from '~/components/ui';
import { CategoryHorizontalListFetcher } from '~/fetcher-components/common/category-horizontal-list';
import { usePaginationQuery } from '~/services/query-context/use-pagination-quey';
import { paginationQueryEndpoints } from '~/services/query-context/pagination-query-endpoints';
import { UITableColumns } from '~/components/ui/table';
import { SpecifyProductData } from '~/components/common/product-list';
import { useApplicationContext } from '~/app/context';
import { ProductCard } from '~/components/common/product-card';
import { SpecifyAddtoCart } from '~/components/common/product-list/specify-add-to-cart';

/* SearchProductsPage Helpers */
interface RouteParams {
  productId: string;
}
interface SearchProductsPageProps {}

/* SearchProductsPage Constants */
const TABLE_SHOWN_DATA: UITableColumns<SpecifyProductData>[] = [
  {
    itemRenderer: specifyProduct => specifyProduct.sellerName,
    title: 'Satici',
  },
  {
    itemRenderer: specifyProduct => specifyProduct.quantity,
    title: 'Stok Durumu',
  },
  {
    itemRenderer: specifyProduct => specifyProduct.unitType,
    title: 'Birim',
  },
  {
    itemRenderer: specifyProduct => specifyProduct.unitPrice,
    title: 'Birim Fiyati',
  },
  {
    itemRenderer: specifyProduct => specifyProduct.contents,
    title: 'Birim Icerigi',
  },
  {
    itemRenderer: specifyProduct => specifyProduct.recommendedRetailPrice,
    title: 'T.E.S. Tutari',
  },
  {
    itemRenderer: specifyProduct => specifyProduct.totalPrice,
    title: 'Toplam fiyat',
  },
];
/* SearchProductsPage Styles */
const tableStyle = css`
  margin-bottom: 16px;
`;

/* SearchProductsPage Component  */
function SearchProductsPage(props: React.PropsWithChildren<SearchProductsPageProps>) {
  /* SearchProductsPage Variables */
  const applicationContext = useApplicationContext();
  const [specifyProductPageNumber, setSpecifyProductPageNumber] = React.useState(1);
  const { productId } = useParams<RouteParams>();
  const { data: product, loading: productLoading } = useQuery(queryEndpoints.getProductById, {
    defaultValue: {},
    variables: { id: productId },
  });
  const {
    data: { values: specifyProductsData, totalPage: specifyProductsTotalPage },
    getDataByPage: specifyProductsPage,
  } = usePaginationQuery(paginationQueryEndpoints.getAllSpecifyProductsByProductId, {
    variables: { productId },
    defaultValue: { values: [] },
    pageNumber: specifyProductPageNumber,
  });
  const specifyProducts = React.useMemo(() => {
    return specifyProductsPage(specifyProductPageNumber);
  }, [specifyProductPageNumber, specifyProductsPage]);
  React.useEffect(() => {
    if (applicationContext.user.isCustomer && !TABLE_SHOWN_DATA.find(e => e.title === 'Sepete Ekle')) {
      TABLE_SHOWN_DATA.push({
        itemRenderer: specifyProduct => <SpecifyAddtoCart key={specifyProduct.id} specifyProduct={specifyProduct} />,
        title: 'Sepete Ekle',
      });
    }
  }, []); // eslint-disable-line

  /* SearchProductsPage Callbacks */
  const onChangeSpecifyProductPage = React.useCallback(
    (pageIndex, pageCount) => {
      if (specifyProductPageNumber <= specifyProductsTotalPage && pageIndex <= pageCount) {
        setSpecifyProductPageNumber(pageIndex);
      }
    },
    [specifyProductPageNumber, specifyProductsTotalPage],
  );
  /* SearchProductsPage Lifecycle  */

  return (
    <Container>
      <CategoryHorizontalListFetcher shouldUseProductsPageLink />
      {!productLoading && (
        <>
          <ProductCard isExpand {...product} />
          <UITable
            id={product.id}
            data={specifyProductsData}
            rowCount={specifyProducts.elementCountOfPage > 0 ? specifyProducts.elementCountOfPage : 20}
            totalPageCount={specifyProductsTotalPage}
            columns={TABLE_SHOWN_DATA}
            onChangePage={onChangeSpecifyProductPage}
            className={tableStyle}
          />
        </>
      )}
    </Container>
  );
}
const PureSearchProductsPage = React.memo(SearchProductsPage);

export { PureSearchProductsPage as SearchProductsPage };
