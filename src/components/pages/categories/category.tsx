import * as React from 'react';
import { CategoryResponse } from '~/__types';
import { Img, Popup } from '~/components/ui';
import UpdateCategory from './update-category';
import DeleteCategory from './delete-category';

// eslint-disable-next-line
export default class Category extends React.Component<CategoryProps, ICategoryState> {
  constructor(props: CategoryProps) {
    super(props);
    this.state = {
      shouldShowUpdatePopup: false,
      shouldShowDeletePopup: false,
    };
  }

  closeUpdatePopup = () => this.setState({ shouldShowUpdatePopup: false });

  openUpdatePopup = () => this.setState({ shouldShowUpdatePopup: true });

  closeDeletePopup = () => this.setState({ shouldShowDeletePopup: false });

  openDeletePopup = () => this.setState({ shouldShowDeletePopup: true });

  public render() {
    const { shouldShowDeletePopup, shouldShowUpdatePopup } = this.state;
    const { id, name: categoryName, photoUrl, subCategory } = this.props;

    return (
      <div className="category-wrapper">
        <p>{categoryName}</p>
        <Img src={photoUrl} alt={categoryName} zoomable extraClassName="w-10 h-10" />
        <p>{subCategory ? 'Sub category' : 'Main category'}</p>
        <button onClick={this.openUpdatePopup} type="button">
          Duzenle
        </button>
        <button onClick={this.openDeletePopup} type="button">
          Sil
        </button>

        <Popup show={shouldShowUpdatePopup} onClose={this.closeUpdatePopup}>
          <UpdateCategory categoryId={id} closePopup={this.closeUpdatePopup} />
        </Popup>
        <Popup show={shouldShowDeletePopup} onClose={this.closeDeletePopup}>
          <DeleteCategory closePopup={this.closeDeletePopup} categoryId={id} />
        </Popup>
      </div>
    );
  }
}
interface ICategoryState {
  shouldShowDeletePopup: boolean;
  shouldShowUpdatePopup: boolean;
}
type CategoryProps = {} & CategoryResponse;
