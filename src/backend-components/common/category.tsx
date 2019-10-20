import React from 'react';
import { CategoryItem as CategoryItemComponent } from '~/components/common/category';
import { ICategoryResponse } from '~/backend-model-helpers';

const CategoryItem: React.SFC<ICategoryResponse> = props => (
  <CategoryItemComponent id={props.id} name={props.name} img={props.photoUrl} />
);

export { CategoryItem };
