import * as React from 'react';
import {
  CategoryHorizontalList,
  CategoryHorizontalListComponentProps,
} from '~/components/common/category-horizontal-list';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { useQuery } from '~/services/query-context/context';
import { UseQueryOptions } from '~/services/query-context/helpers';

/* CategoryHorizontalListFetcher Helpers */
interface CategoryHorizontalListFetcherProps extends CategoryHorizontalListComponentProps {}

const getCategoriesOptions: UseQueryOptions<typeof queryEndpoints['getCategories']> = {
  variables: { type: 'all' },
  defaultValue: [],
};

function CategoryHorizontalListFetcher(props: React.PropsWithChildren<CategoryHorizontalListFetcherProps>) {
  const { data: allCategories } = useQuery(queryEndpoints.getCategories, getCategoriesOptions);

  const categoriesMap = React.useMemo(
    () =>
      allCategories
        .filter(category => !category.subCategory)
        .map(category => ({
          ...category,
          subCategories: allCategories.filter(subCategory => subCategory.parentId === category.id),
        })),
    [allCategories],
  );

  return <CategoryHorizontalList {...props} categories={categoriesMap} />;
}

export { CategoryHorizontalListFetcher };
