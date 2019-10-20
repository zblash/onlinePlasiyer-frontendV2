import React from 'react';
import { ICategoryResponse } from '~/backend-model-helpers';
import {
  CategoryHorizontalList as CategoryHorizontalListComponent,
  CategoryHorizontalListComponentProps,
} from '~/components/common/category-horizontal-list';

const CategoryHorizontalList: React.SFC<
  { categories: ICategoryResponse[] } & CategoryHorizontalListComponentProps
> = props => {
  const modifiedCategories = props.categories
    .filter(c => !c.subCategory)
    .map(category => ({
      id: category.id,
      img: category.photoUrl,
      name: category.name,
      subCategories: props.categories
        .filter(c => c.parentId === category.id)
        .map(c => ({
          id: c.id,
          img: c.photoUrl,
          name: c.name,
        })),
    }));

  return <CategoryHorizontalListComponent {...props} categories={modifiedCategories} />;
};

export { CategoryHorizontalList };
