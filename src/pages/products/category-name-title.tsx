import * as React from 'react';
import lodashGet from 'lodash.get';
import styled, { colors } from '~/styled';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';

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

/* CategoryNameTitle Component  */
function CategoryNameTitle(props: React.PropsWithChildren<CategoryNameTitleProps>) {
  const [selectedCategoryName, setSelectedCategoryName] = React.useState('');
  const { data: allCategories } = useQuery(queryEndpoints.getCategories, {
    variables: { type: 'all' },
    defaultValue: [],
  });

  const __ = <StyledSelectedCategoryName>{selectedCategoryName}</StyledSelectedCategoryName>;

  /* CategoryNameTitle Lifecycle  */
  React.useEffect(() => {
    setSelectedCategoryName(
      lodashGet(allCategories.find(category => category.id === props.selectedCategoryId), 'name'),
    );
  }, [props.selectedCategoryId, JSON.stringify(allCategories)]);

  /* CategoryNameTitle Functions  */

  return __;
}

const _CategoryNameTitle = CategoryNameTitle;

export { _CategoryNameTitle as CategoryNameTitle };
