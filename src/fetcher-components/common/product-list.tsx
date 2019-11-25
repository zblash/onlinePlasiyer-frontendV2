import * as React from 'react';
import { ProductListComponentProps, ProductList } from '~/components/common/product-list';
import { usePaginationQuery } from '~/services/query-context/use-pagination-quey';
import { paginationQueryEndpoints } from '~/services/query-context/pagination-query-endpoints';

/* ProductListFetcher Helpers */
interface ProductListFetcherProps extends ProductListComponentProps {}

function ProductListFetcher(props: React.PropsWithChildren<ProductListFetcherProps>) {
  const [expandProductId, setExpandProductId] = React.useState<string>(null);
  const [productPageNumber, setProductPageNumber] = React.useState(1);
  const [sepicifyProductPageNumber, setSpecifyProductPageNumber] = React.useState(1);
  const [products, setProducts] = React.useState<any>([]);
  const { totalPage: productPageTotalPage, values: productsValues } = usePaginationQuery(
    paginationQueryEndpoints.getAllProductsByCategoryId,
    {
      variables: { categoryId: props.selectedCategoryId },
      skip: !props.selectedCategoryId,
      defaultValue: { values: [] },
      pageNumber: productPageNumber,
    },
  ).getDataByPage(productPageNumber);
  const {
    data: { values: specifyProducts, totalPage: specifyProductsTotalPage },
  } = usePaginationQuery(paginationQueryEndpoints.getAllSpecifyProductsByProductId, {
    variables: { productId: expandProductId },
    defaultValue: { values: [] },
    skip: !expandProductId,
    pageNumber: sepicifyProductPageNumber,
  });

  const mappedArray = React.useMemo(
    () =>
      products.map(product => ({
        id: product.id,
        name: product.name,
        taxRate: product.tax,
        img: product.photoUrl,
        barcode: product.barcode,
      })),
    [products],
  );

  /* ProductListFetcher Functions  */

  const nextSpecifyProductPage = React.useCallback(() => {
    if (sepicifyProductPageNumber < specifyProductsTotalPage) {
      setSpecifyProductPageNumber(sepicifyProductPageNumber + 1);
    }
  }, [sepicifyProductPageNumber, specifyProductsTotalPage]);
  const onChangeExpandProductId = React.useCallback(
    id => {
      setExpandProductId(id);
      setSpecifyProductPageNumber(1);
      if (props.onChangeExpandProductId) {
        props.onChangeExpandProductId(id);
      }
    },
    [props],
  );

  const onChangeSpecifyProductPage = React.useCallback(
    (pageIndex, pageCount) => {
      if (pageIndex + 2 >= pageCount) {
        nextSpecifyProductPage();
      }
    },
    [nextSpecifyProductPage],
  );
  const onChangePage = React.useCallback(
    pageNumber => {
      if (pageNumber <= productPageTotalPage) {
        setProductPageNumber(pageNumber);
      }
    },
    [productPageTotalPage],
  );

  React.useEffect(() => {
    if (productsValues.length > 0) {
      setProducts(productsValues);
    }
  }, [productsValues]);

  return (
    <ProductList
      productsPageCount={productPageTotalPage}
      productsLastPageIndex={0}
      productsCurrentPage={productPageNumber}
      products={mappedArray}
      specifyProducts={specifyProducts}
      {...props}
      onChangeExpandProductId={onChangeExpandProductId}
      onChangeSpecifyProductPage={onChangeSpecifyProductPage}
      onChangePage={onChangePage}
    />
  );
}

export { ProductListFetcher };
