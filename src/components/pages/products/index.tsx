import * as React from 'react';
import { Query } from '~/cache-management/components/query';
import { queryEndpoints } from '~/services';
import { RouteComponentProps } from 'react-router';
import { ProductsPageComponent } from '~/components/pages/products/products-page-component';

/*
  ProductsPage Helpers
*/

interface RouteParams {
  categoryId?: string;
}

interface ProductsPageProps extends RouteComponentProps<RouteParams> {}

const _ProductsPage: React.SFC<ProductsPageProps> = props => {
  const { categoryId: categoryIdParam } = props.match.params;
  const __ = (
    <Query query={queryEndpoints.getCategories} variables={{ type: 'all' }}>
      {({ data: categories, loading, error }) => {
        if (categories) {
          return (
            <ProductsPageComponent
              selectedCategoryId={categoryIdParam}
              categories={categories.map(category => ({
                id: category.id,
                parentId: category.parentId,
                isSubCategory: false,
                name: category.name,
                photoUrl: category.photoUrl,
              }))}
            />
          );
        }
        return null;
      }}
    </Query>
  );

  return __;
};

const ProductsPage = _ProductsPage;

export { ProductsPage };
