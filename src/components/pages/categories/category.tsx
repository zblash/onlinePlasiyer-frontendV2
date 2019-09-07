import * as React from 'react';
import { CategoryResponse } from '~/__types';
import { NavLink } from 'react-router-dom';
import { Img } from '~/components/ui';
export default class Category extends React.Component<
  CategoryProps,
  CategoryState
> {
  render() {
    const {
      id,
      name: categoryName,
      parentId,
      photoUrl,
      subCategory,
    } = this.props;
    return (
      <div className='category-wrapper'>
        <p>{categoryName}</p>
        <Img src={photoUrl} alt={categoryName} zoomable />
        <p>{subCategory ? 'Sub category' : 'Main category'}</p>
        <NavLink to={`/admin/category/${id}`}>Go</NavLink>
      </div>
    );
  }
}
type CategoryState = {};
type CategoryProps = {} & CategoryResponse;
