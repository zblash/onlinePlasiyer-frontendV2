import * as React from 'react';
import { ICategoryResponse } from '~/__types';
import { Img, Popup } from '~/components/ui';
import { Card, Button, Modal } from 'react-bootstrap';
import UpdateCategory from './update-category';
import DeleteCategory from './delete-category';

// eslint-disable-next-line
export default class Category extends React.Component<CategoryProps, ICategoryState> {
  public constructor(props: CategoryProps) {
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
    const { shouldShowDeletePopup, shouldShowUpdatePopup } = this.state;
    const { id, name: categoryName, photoUrl, subCategory } = this.props;

    return (
      <Card style={{ width: '18rem', marginBottom: '8px' }}>
        <Card.Img variant="top" src={photoUrl} />
        <Card.Body>
          <Card.Title className="text-dark">{categoryName}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{subCategory ? 'Alt Kategori' : 'Ana Katagori'}</Card.Subtitle>
          <Button variant="primary" onClick={this.openUpdatePopup}>
            Duzenle
          </Button>
          <Button variant="danger" onClick={this.openDeletePopup} style={{ marginLeft: '8px' }}>
            Sil
          </Button>
          {/* remove category modal */}
          <Modal show={shouldShowDeletePopup} onHide={this.closeDeletePopup}>
            <Modal.Header closeButton>
              <Modal.Title className="text-dark">Eminmisin ?</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-dark">
              {categoryName} kategorisi ve alt kategorileri tekrar geri getirilemez
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.closeDeletePopup}>
                Close
              </Button>
              <DeleteCategory categoryId={id} closePopup={this.closeDeletePopup} />
            </Modal.Footer>
          </Modal>
          {/* update category modal */}
          <Modal show={shouldShowUpdatePopup} onHide={this.closeUpdatePopup}>
            <UpdateCategory categoryId={id} closePopup={this.closeUpdatePopup} />
          </Modal>
        </Card.Body>
      </Card>
    );
  }
}
interface ICategoryState {
  shouldShowDeletePopup: boolean;
  shouldShowUpdatePopup: boolean;
}
type CategoryProps = {} & ICategoryResponse;
