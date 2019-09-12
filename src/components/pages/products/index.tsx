import * as React from 'react';
import { Query } from '~/components/common';
import { queryEndpoints } from '~/services';
import Product from './product';

const Products: React.SFC<IAdminProductsProps> = props => {
  const [categoryId, setCategoryId] = React.useState(null);

  return (
    <div>
      <Query
        query={queryEndpoints.getCategories}
        onComplated={data => {
          if (data.length > 0) {
            setCategoryId(data[0].id);
          }
        }}
      >
        {({ data: categories, loading: categoriesLoading, error: categoriesError }) => {
          if (categoriesLoading) {
            return <div>Loading categories</div>;
          }
          if (categoriesError) {
            return <div>Error categories</div>;
          }

          return (
            <select
              onChange={e => {
                setCategoryId(e.target.value);
              }}
            >
              {categories.map(city => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          );
        }}
      </Query>
      {categoryId && (
        <Query query={queryEndpoints.getAllProductsByCategoryId} variables={{ categoryId }}>
          {({ data: getAllProducts, loading: getAllProductsLoading, error: getAllProductsError }) => {
            if (getAllProductsLoading) {
              return <div>Loading getAllProducts</div>;
            }
            if (getAllProductsError) {
              return <div>Error getAllProducts</div>;
            }

            return (
              <div>
                {getAllProducts.map(product => {
                  return <Product key={product.id} productId={product.id} categoryId={categoryId} />;
                })}
              </div>
            );
          }}
        </Query>
      )}
    </div>
  );
};
interface IAdminProductsProps {}

export default Products;
