import * as React from 'react';
import {
  CategoryHorizontalList,
  CategoryHorizontalListComponentProps,
} from '~/components/common/category-horizontal-list';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { useQuery } from '~/services/query-context/context';

/* CategoryHorizontalListFetcher Helpers */
interface CategoryHorizontalListFetcherProps extends CategoryHorizontalListComponentProps {}

function CategoryHorizontalListFetcher(props: React.PropsWithChildren<CategoryHorizontalListFetcherProps>) {
  const { data: allCategories } = useQuery(queryEndpoints.getCategories, {
    variables: { type: 'all' },
    defaultValue: [],
  });
  const categoriesMap = allCategories
    .filter(category => !category.subCategory)
    .map(category => ({
      ...category,
      subCategories: allCategories.filter(subCategory => subCategory.parentId === category.id),
    }));

  return <CategoryHorizontalList {...props} categories={categoriesMap} />;
}

const _CategoryHorizontalListFetcher = CategoryHorizontalListFetcher;

export { _CategoryHorizontalListFetcher as CategoryHorizontalListFetcher };
