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
  const [expandedCategoryId, setExpandedCategoryId] = React.useState(null);
  const { data: parentCategories } = useQuery(queryEndpoints.getParentCategories, {
    defaultValue: [],
  });
  const { data: subCategories } = useQuery(queryEndpoints.getSubCategoriesByParentId, {
    variables: { parentId: expandedCategoryId },
    defaultValue: [],
    skip: !expandedCategoryId,
  });
  const onExpandCategory = React.useCallback((id: string) => {
    setExpandedCategoryId(id);
  }, []);

  return (
    <CategoryHorizontalList
      {...props}
      expandedSubCategories={subCategories}
      parentCategories={parentCategories}
      expandedCategoryId={expandedCategoryId}
      onExpandCategory={onExpandCategory}
    />
  );
}

export { CategoryHorizontalListFetcher };
