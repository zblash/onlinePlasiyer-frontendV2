import * as React from 'react';
import { ProductListComponentProps, ProductList } from '~/components/common/product-list';
import { usePaginationQuery } from '~/services/pagination-query-context/context';
import { paginationQueryEndpoints } from '~/services/pagination-query-context/pagination-query-endpoints';

/* ProductListFetcher Helpers */
interface ProductListFetcherProps extends ProductListComponentProps {}

function ProductListFetcher(props: React.PropsWithChildren<ProductListFetcherProps>) {
  const [expandProductId, setExpandProductId] = React.useState<string>(null);
  const { data: products } = usePaginationQuery(paginationQueryEndpoints.getAllProductsByCategoryId, {
    variables: { categoryId: props.selectedCategoryId },
    skip: !props.selectedCategoryId,
    defaultValue: [],
  });
  const { data: specifyProducts, next } = usePaginationQuery(
    paginationQueryEndpoints.getAllSpecifyProductsByProductId,
    {
      variables: { productId: expandProductId },
      defaultValue: [],
      skip: !expandProductId,
    },
  );
  const __ = (
    <ProductList
      products={products.map(product => ({
        id: product.id,
        name: product.name,
        taxRate: product.tax,
        img: product.photoUrl,
        barcode: product.barcode,
      }))}
      specifyProducts={specifyProducts}
      {...props}
      onChangeExpandProductId={id => {
        setExpandProductId(id);
        if (props.onChangeExpandProductId) {
          props.onChangeExpandProductId(id);
        }
      }}
      onChangeSpecifyProductPage={(pageIndex, pageCount) => {
        if (pageIndex + 2 === pageCount) {
          next();
        }
      }}
    />
  );

  /* ProductListFetcher Lifecycle  */

  /* ProductListFetcher Functions  */

  return __;
}

export { ProductListFetcher };
