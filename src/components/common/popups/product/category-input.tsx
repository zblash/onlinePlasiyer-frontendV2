import * as React from 'react';
import { useTranslation } from 'react-i18next';
import lodashGet from 'lodash.get';
import { UIAutoComplete, UIIcon } from '~/components/ui';
import { useKeepValue } from '~/utils/hooks';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { colors } from '~/styled';
import { StyledInput, commonInputStyle, inputIconStyle } from '.';

/*
  CategoryInput Helpers
*/

interface Category {
  id: string;
  name: string;
}

interface CategoryInputProps {
  disabled?: boolean;
  isHighlighted?: boolean;
  onSelect: (category: Category) => void;
  selectedCategoryId: string;
}

/*
  CategoryInput Styles
*/

const _CategoryInput: React.SFC<CategoryInputProps> = props => {
  const { t } = useTranslation();
  const [autocompleteValue, setAutoCompleteValue] = React.useState('');
  const isActivate = !useKeepValue(props.disabled, false);

  const { data: parentCategories, loading: getParentCategoriesLoading, error: getParentCategoriesError } = useQuery(
    queryEndpoints.getCategories,
    { variables: { type: 'parent' }, skip: !isActivate, defaultValue: [] },
  );

  const inputIconElement = (
    <UIIcon
      className={inputIconStyle}
      name={getParentCategoriesLoading ? 'loading' : 'maintenance'}
      size={20}
      color={props.isHighlighted ? colors.primary : colors.gray}
    />
  );
  const __ = (
    <UIAutoComplete
      items={parentCategories}
      value={autocompleteValue}
      shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
      getItemValue={item => item.name}
      renderInput={
        <StyledInput
          value={autocompleteValue}
          disabled={!!(props.disabled || getParentCategoriesLoading || getParentCategoriesError)}
          inputClassName={commonInputStyle}
          placeholder={t('product-popup.category-input-placeholder')}
          onChange={e => setAutoCompleteValue(e)}
          id="category-parentid"
          leftIcon={inputIconElement}
        />
      }
      renderItem={(item, highlighted) => (
        // TODO(0): update this element
        <div
          key={item.id}
          style={{ backgroundColor: highlighted ? '#eee' : 'transparent', padding: 5, cursor: 'pointer' }}
        >
          {item.name}
        </div>
      )}
      onSelect={item => {
        setAutoCompleteValue(item.name);
        props.onSelect(item);
      }}
    />
  );

  /*
  CategoryInput Lifecycle
  */
  React.useEffect(() => {
    if (props.selectedCategoryId) {
      setAutoCompleteValue(
        lodashGet(parentCategories.find(category => category.id === props.selectedCategoryId), 'name', ''),
      );
    }
  }, [parentCategories.length]);

  /*
  CategoryInput Functions
  */

  return __;
};

const CategoryInput = React.memo(_CategoryInput, (prevProps, newProps) => {
  if (prevProps.disabled !== newProps.disabled || prevProps.isHighlighted !== newProps.isHighlighted) {
    return false;
  }

  return true;
});

export { CategoryInput };
