import * as React from 'react';
import { Mutation } from '~/components/common';
import { queryEndpoints, mutationEndPoints } from '~/services';
import { Img, Popup } from '~/components/ui';
import './style-product.scss';
import { withAuthUser, IWithAuthUserComponentProps } from '~/components/hoc/with-auth-user';
import { isUserCustomer, isUserAdmin } from '~/utils';
import SpecifyProducts from './customer-specify-products';
import {IProductResponse} from '~/__types';
import {Button, Modal} from "react-bootstrap";
import DeleteProduct from "~/components/pages/products/product/delete-product";

class Product extends React.Component<ProductProps, IProductState> {
    public constructor(props: ProductProps) {
        super(props);
        this.state = {
            shouldShowUpdatePopup: false,
            shouldShowDeletePopup: false,
        };
    }

    public closeUpdatePopup = () => this.setState({ shouldShowUpdatePopup: false });

    public openUpdatePopup = () => this.setState({ shouldShowUpdatePopup: true });

    public closeDeletePopup = () => this.setState({ shouldShowDeletePopup: false });

    public openDeletePopup = () => this.setState({ shouldShowDeletePopup: true });

    public render() {
        const [shouldShowSpecifyProductPopup, setShouldShowSpecifyProductPopup] = React.useState(false);
        const { shouldShowDeletePopup, shouldShowUpdatePopup } = this.state;
        const { product, user, categoryId } = this.props;
        return (
        <div className="view-product">
            <div className="start-items">
                <Img src={product.photoUrl} alt={product.name} extraWrapperClassName="product-image" />
                <div className="item-config">
                    <p>Name : {product.name}</p>
                    <p>Category Name : {product.categoryName}</p>-<p>Status: {product.active ? 'Active' : 'Passive'}</p>
                    <p>barcode : {product.barcode}</p>
                    <p>Tax : {product.tax}</p>
                </div>
            </div>
            <div className="end-items">
                <div className="buttons">
                    {isUserAdmin(user) && (
                        <>
                            <button className="btn btn-primary" type="button">
                                Duzenle (invalid)
                            </button>
                            <Button variant="danger" onClick={this.openDeletePopup} style={{ marginLeft: '8px' }}>
                                Sil
                            </Button>
                            <Modal show={shouldShowDeletePopup} onHide={this.closeDeletePopup}>
                                <Modal.Header closeButton>
                                    <Modal.Title className="text-dark">Emin misin ?</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="text-dark">
                                    {product.name} kategorisi ve alt kategorileri tekrar geri getirilemez
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.closeDeletePopup}>
                                        Hayir
                                    </Button>
                                    <DeleteProduct productId={product.id} categoryId={categoryId} closePopup={this.closeDeletePopup} />
                                </Modal.Footer>
                            </Modal>
                        </>
                    )}
                    {isUserCustomer(user) && (
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => {
                                setShouldShowSpecifyProductPopup(true);
                            }}
                        >
                            Fiyatlari Gor
                        </button>
                    )}
                </div>
            </div>
            {isUserCustomer(user) && (
                <>
                    <Popup show={shouldShowSpecifyProductPopup} onClose={setShouldShowSpecifyProductPopup}>
                        <SpecifyProducts productId={product.id} productName={product.name} />
                    </Popup>
                </>
            )}
        </div>
        )
    }
}

interface IProductProps extends IWithAuthUserComponentProps {
  product: IProductResponse;
  categoryId: string;
}
interface IProductState {
    shouldShowDeletePopup: boolean;
    shouldShowUpdatePopup: boolean;
}
type ProductProps = {} & IProductProps;

export default withAuthUser(Product);
