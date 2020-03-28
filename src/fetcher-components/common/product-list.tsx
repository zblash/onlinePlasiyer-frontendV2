import * as React from 'react';
import { ProductListComponentProps, ProductList } from '~/components/common/product-list';
import { usePaginationQuery } from '~/services/query-context/use-pagination-quey';
import { paginationQueryEndpoints } from '~/services/query-context/pagination-query-endpoints';
import { useMemoWithPrevDeps } from '~/utils/hooks';
import { scrollToRef } from '~/utils/node';

/* ProductListFetcher Helpers */
interface ProductListFetcherProps extends ProductListComponentProps {
  selectedUserId?: string;
  isMerchantProfile?: boolean;
}

function ProductListFetcher(props: React.PropsWithChildren<ProductListFetcherProps>) {
  const [expandProductId, setExpandProductId] = React.useState<string>(null);
  const wrapperRef = React.useRef();
  const [productPageNumber, setProductPageNumber] = React.useState(1);
  const [specifyProductPageNumber, setSpecifyProductPageNumber] = React.useState(1);

  const query = React.useMemo(
    () =>
      props.isMerchantProfile
        ? paginationQueryEndpoints.getAllProducts
        : paginationQueryEndpoints.getAllProductsByCategoryId,
    [props.isMerchantProfile],
  );

  const queryOptions = React.useMemo(
    () =>
      props.isMerchantProfile
        ? {
            variables: { userId: props.selectedUserId },
            defaultValue: { values: [] },
            pageNumber: productPageNumber,
          }
        : {
            variables: { categoryId: props.selectedCategoryId, userId: props.selectedUserId },
            skip: !props.selectedCategoryId,
            defaultValue: { values: [] },
            pageNumber: productPageNumber,
          },
    [productPageNumber, props.isMerchantProfile, props.selectedCategoryId, props.selectedUserId],
  );

  const { totalPage: productPageTotalPage, values: productsValues } = usePaginationQuery(
    query,
    queryOptions,
  ).getDataByPage(productPageNumber);
  const {
    data: { values: specifyProductsData, totalPage: specifyProductsTotalPage },
    getDataByPage: specifyProductsPage,
  } = usePaginationQuery(paginationQueryEndpoints.getAllSpecifyProductsByProductId, {
    variables: { productId: expandProductId, userId: props.selectedUserId },
    defaultValue: { values: [] },
    skip: !expandProductId,
    pageNumber: specifyProductPageNumber,
  });
  const specifyProducts = React.useMemo(() => {
    return specifyProductsPage(specifyProductPageNumber);
  }, [specifyProductPageNumber, specifyProductsPage]);
  const mappedArray = useMemoWithPrevDeps(
    ([prevProductValues]) => {
      if (prevProductValues && productsValues.length === 0) {
        return prevProductValues;
      }

      return productsValues;
    },
    [productsValues],
  );

  /* ProductListFetcher Functions  */

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
      if (specifyProductPageNumber <= specifyProductsTotalPage && pageIndex <= pageCount) {
        setSpecifyProductPageNumber(pageIndex);
      }
    },
    [specifyProductPageNumber, specifyProductsTotalPage],
  );
  const onChangePage = React.useCallback(
    pageNumber => {
      if (pageNumber <= productPageTotalPage) {
        setProductPageNumber(pageNumber);
        setTimeout(() => {
          scrollToRef(wrapperRef);
        }, 150);
      }
    },
    [productPageTotalPage],
  );

  React.useEffect(() => {
    setProductPageNumber(1);
  }, [props.selectedCategoryId]);

  return (
    <div ref={wrapperRef}>
      <ProductList
        productsPageCount={productPageTotalPage}
        productsLastPageIndex={0}
        productsCurrentPage={productPageNumber}
        products={mappedArray}
        specifyProducts={specifyProductsData}
        specifyProductsElementCountOfPage={specifyProducts.elementCountOfPage}
        specifyProductsTotalPage={specifyProductsTotalPage}
        {...props}
        onChangeExpandProductId={onChangeExpandProductId}
        onChangeSpecifyProductPage={onChangeSpecifyProductPage}
        onChangePage={onChangePage}
      />
    </div>
  );
}

export { ProductListFetcher };
