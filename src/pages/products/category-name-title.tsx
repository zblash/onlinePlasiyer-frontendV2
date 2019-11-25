import * as React from 'react';
import lodashGet from 'lodash.get';
import styled, { colors } from '~/styled';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { UseQueryOptions } from '~/services/query-context/helpers';

/* CategoryNameTitle Helpers */
interface CategoryNameTitleProps {
  selectedCategoryId: string;
}

/* CategoryNameTitle Constants */

/* CategoryNameTitle Styles */

const StyledSelectedCategoryName = styled.h2`
  font-size: 20px;
  color: ${colors.darkGray};
`;

const getCategoriesOptions: UseQueryOptions<typeof queryEndpoints['getCategories']> = {
  variables: { type: 'all' },
  defaultValue: [],
};
/* CategoryNameTitle Component  */
function CategoryNameTitle(props: React.PropsWithChildren<CategoryNameTitleProps>) {
  const [selectedCategoryName, setSelectedCategoryName] = React.useState('');
  const { data: allCategories } = useQuery(queryEndpoints.getCategories, getCategoriesOptions);

  const __ = <StyledSelectedCategoryName>{selectedCategoryName}</StyledSelectedCategoryName>;

  /* CategoryNameTitle Lifecycle  */
  React.useEffect(() => {
    setSelectedCategoryName(
      lodashGet(allCategories.find(category => category.id === props.selectedCategoryId), 'name'),
    );
  }, [allCategories, props.selectedCategoryId]);

  /* CategoryNameTitle Functions  */

  return __;
}

const _CategoryNameTitle = CategoryNameTitle;

export { _CategoryNameTitle as CategoryNameTitle };
