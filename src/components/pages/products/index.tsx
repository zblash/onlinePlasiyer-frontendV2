import * as React from 'react';
import { Query } from '~/components/common';
import { queryEndpoints } from '~/services';
import Product from './product';
import {RouteComponentProps} from "react-router";

export default class Products extends React.Component<IAdminProductsProps, AdminProductsProps> {
    public constructor(props: AdminProductsProps) {
        super(props);
    }

    public render() {
        const [categoryId, setCategoryId] = React.useState(null);
        return (
        <div className="container-fluid">
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
                        <div className="form-group product-category-select">
                            <label>Category</label>
                            <select
                                className="form-control"
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
                        </div>
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
                                    return <Product key={product.id} product={product} categoryId={categoryId} />;
                                })}
                            </div>
                        );
                    }}
                </Query>
            )}
        </div>
    )
    }
}

interface IAdminProductsProps {}

type AdminProductsProps = {} & RouteComponentProps<{}>;