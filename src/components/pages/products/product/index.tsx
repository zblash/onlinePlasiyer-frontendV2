import './style-product.scss';
import * as React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Img, Popup } from '~/components/ui';
import { withAuthUser, IWithAuthUserComponentProps } from '~/components/hoc/with-auth-user';
import { isUserCustomer, isUserAdmin } from '~/utils';
import SpecifyProducts from './customer-specify-products';
import { IProductResponse } from '~/__types';
import DeleteProduct from './delete-product';

const Product: React.SFC<IProductProps> = props => {
  const { product, user, categoryId } = props;
  const [shouldShowSpecifyProductPopup, setShouldShowSpecifyProductPopup] = React.useState(false);

  const [shouldShowDeletePopup, setShouldShowDeletePopup] = React.useState(false);

  const closeDeletePopup = () => setShouldShowDeletePopup(false);
  const openDeletePopup = () => setShouldShowDeletePopup(true);

  return (
    <div className="view-product">
      <div className="start-items">
        <Img src={product.photoUrl} alt={product.name} extraWrapperClassName="product-image" />
        <div className="item-config">
          <p>Name : {product.name}</p>
          <p>Category Name : {product.categoryName}</p>
          <p>Status: {product.active ? 'Active' : 'Passive'}</p>
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
              <button className="btn btn-danger" type="button" onClick={openDeletePopup}>
                Sil
              </button>
            </>
          )}
          {isUserCustomer(user) && (
            <button
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
      {/* remove product popup */}
      <Modal show={shouldShowDeletePopup} onHide={closeDeletePopup}>
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">Emin misin ?</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-dark">{product.name} tekrar geri getirilemez</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeletePopup}>
            Hayir
          </Button>
          <DeleteProduct categoryId={categoryId} productId={product.id} closePopup={closeDeletePopup} />
        </Modal.Footer>
      </Modal>
    </div>
  );
};
interface IProductProps extends IWithAuthUserComponentProps {
  product: IProductResponse;
  categoryId: string;
}

export default withAuthUser(Product);
