import * as React from 'react';
import { queryEndpoints } from '~/services';
import { ProductList as ProductListComponent } from '~/components/common/product-list';
import { DefaultLoading } from '~/components/common/default-loading';
import { useQuery } from '~/cache-management/hooks';

/*
  ProductList Helpers
*/
interface ProductListProps {
  selectedCategoryId: string;
}

const _ProductList: React.SFC<ProductListProps> = props => {
  const [selectedProductId, setSelectedProductId] = React.useState<string>(null);
  const [products, getProductsLoading] = useQuery(queryEndpoints.getAllProductsByCategoryId, {
    variables: { categoryId: props.selectedCategoryId },
    skip: !props.selectedCategoryId,
  });
  const [specifyProducts] = useQuery(queryEndpoints.getAllSpecifyProductsByProductId, {
    variables: { productId: selectedProductId },
    skip: !selectedProductId,
  });
  if (getProductsLoading) {
    return <DefaultLoading />;
  }
  if (products) {
    return (
      <ProductListComponent
        onItemClick={id => setSelectedProductId(id)}
        selectedProductSpecifies={specifyProducts || []}
        items={products.map(product => ({
          id: product.id,
          name: product.name,
          img: product.photoUrl,
        }))}
      />
    );
  }

  return null;
};

const ProductList = React.memo(_ProductList, (prevProps, nextProps) => {
  if (prevProps.selectedCategoryId !== nextProps.selectedCategoryId && nextProps.selectedCategoryId) {
    return false;
  }

  return true;
});

export { ProductList };
