import * as React from 'react';
import {
  CategoryHorizontalList as CategoryHorizontalListComponent,
  CategoryHorizontalListComponentProps,
} from '~/components/common/category-horizontal-list';
import { DefaultLoading } from '~/components/common/default-loading';
import { queryEndpoints } from '~/services';
import { CategoryFields } from '~/components/common/category';
import { useQuery } from '~/cache-management/hooks';

/*
  CategoryHorizontalList Helpers
*/
interface CategoryHorizontalListProps extends CategoryHorizontalListComponentProps {
  onLoadData?: (d: CategoryFields[]) => void;
}

const CategoryHorizontalList: React.SFC<CategoryHorizontalListProps> = props => {
  const [allCategories, getallCategoriesLoading, getallCategoriesError] = useQuery(queryEndpoints.getCategories, {
    variables: { type: 'all' },
    onCompleted: categories => {
      if (props.onLoadData) {
        props.onLoadData(categories);
      }
    },
  });
  if (getallCategoriesLoading) {
    return <DefaultLoading />;
  }
  if (getallCategoriesError) {
    return <div>Error allCategories</div>;
  }

  const categoriesMap = allCategories
    .filter(category => !category.subCategory)
    .map(category => ({
      ...category,
      subCategories: allCategories.filter(subCategory => subCategory.parentId === category.id),
    }));

  return <CategoryHorizontalListComponent {...props} categories={categoriesMap} />;
};

export { CategoryHorizontalList };
