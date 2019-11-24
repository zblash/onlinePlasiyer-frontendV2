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
  const {
    data: { values: products, totalPage: productPageTotalPage },
  } = usePaginationQuery(paginationQueryEndpoints.getAllProductsByCategoryId, {
    variables: { categoryId: props.selectedCategoryId, pageNumber: productPageNumber },
    skip: !props.selectedCategoryId,
    defaultValue: { values: [] },
  });
  const {
    data: { values: specifyProducts, totalPage: specifyProductsTotalPage },
  } = usePaginationQuery(paginationQueryEndpoints.getAllSpecifyProductsByProductId, {
    variables: { productId: expandProductId, pageNumber: sepicifyProductPageNumber },
    defaultValue: { values: [] },
    skip: !expandProductId,
  });

  const nextSpecifyProductPage = React.useCallback(() => {
    if (sepicifyProductPageNumber < specifyProductsTotalPage) {
      setSpecifyProductPageNumber(sepicifyProductPageNumber + 1);
    }
  }, [sepicifyProductPageNumber, specifyProductsTotalPage]);

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
  const __ = (
    <ProductList
      productsLastPageIndex={0}
      productsCurrentPage={productPageNumber}
      products={mappedArray}
      specifyProducts={specifyProducts}
      {...props}
      onChangeExpandProductId={id => {
        setExpandProductId(id);
        if (props.onChangeExpandProductId) {
          props.onChangeExpandProductId(id);
        }
      }}
      onChangeSpecifyProductPage={(pageIndex, pageCount) => {
        if (pageIndex + 2 >= pageCount) {
          nextSpecifyProductPage();
        }
      }}
    />
  );

  /* ProductListFetcher Lifecycle  */
  /* ProductListFetcher Functions  */

  return __;
}

export { ProductListFetcher };
