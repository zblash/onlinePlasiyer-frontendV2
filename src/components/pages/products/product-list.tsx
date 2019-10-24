import * as React from 'react';
import { Query } from '~/cache-management/components/query';
import { queryEndpoints } from '~/services';
import { ProductList as ProductListComponent } from '~/components/common/product-list';

/*
  ProductList Helpers
*/
interface ProductListProps {
  selectedCategoryId: string;
}

const _ProductList: React.SFC<ProductListProps> = props => {
  return (
    <Query
      query={queryEndpoints.getAllProductsByCategoryId}
      variables={{ categoryId: props.selectedCategoryId }}
      skip={!props.selectedCategoryId}
    >
      {({ data: getProductsByCategory, loading: getProductsByCategoryLoading, error: getProductsByCategoryError }) => {
        if (getProductsByCategoryLoading) {
          return <div>Loading getProductsByCategory</div>;
        }
        if (getProductsByCategoryError) {
          return <div>Error getProductsByCategory</div>;
        }

        if (getProductsByCategory) {
          return (
            <ProductListComponent
              // onItemClick={id => setSelectedProductId(id)}
              // TODO : add query for specify component
              selectedProductSpecifies={[]}
              items={getProductsByCategory.map(product => ({
                id: product.id,
                name: product.name,
                img: product.photoUrl,
              }))}
            />
          );
        }
        return null;
      }}
    </Query>
  );
};

const ProductList = React.memo(_ProductList, (prevProps, nextProps) => {
  if (prevProps.selectedCategoryId !== nextProps.selectedCategoryId && nextProps.selectedCategoryId) {
    return false;
  }
  return true;
});

export { ProductList };
