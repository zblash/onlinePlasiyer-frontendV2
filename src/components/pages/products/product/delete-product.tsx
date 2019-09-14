import * as React from 'react';
import { Mutation } from '~/components/common';
import {mutationEndPoints, queryEndpoints} from '~/services';
import { Button } from 'react-bootstrap';
import {refetchFactory} from "~/services/endpoints/query-endpoints";

export default class DeleteProduct extends React.Component<DeleteProductProps, DeleteProductState> {
    public render() {
        const { closePopup, productId, categoryId } = this.props;

        return (
            <Mutation
                mutation={mutationEndPoints.deleteProduct}
                variables={{ id: productId }}
                refetchQueries={[
                    refetchFactory(queryEndpoints.getAllProducts),
                    refetchFactory(queryEndpoints.getAllProductsByCategoryId, { categoryId }),
                ]}
            >
                {(deleteProduct, { loading: deleteProductLoading, error: deleteProductError }) => {
                    if (deleteProductError) {
                        return <div>Error deleteProduct</div>;
                    }

                    return (
                        <button
                            className="btn btn-danger"
                            type="button"
                            disabled={deleteProductLoading || deleteProductError}
                            onClick={() => {
                                deleteProduct();
                            }}
                        >
                            Evet
                        </button>
                    );
                }}
            </Mutation>
        );
    }
}
interface DeleteProductState {}

interface DeleteProductProps {
    closePopup: Function;
    productId: string;
    categoryId: string;
}
