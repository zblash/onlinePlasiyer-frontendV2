import * as React from 'react';
import lodashGet from 'lodash.get';
import { UIAutoComplete, UIIcon } from '~/components/ui';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { colors } from '~/styled';
import { StyledInput, commonInputStyle, inputIconStyle } from '.';
import { useTranslation } from '~/i18n';
import { UseQueryOptions } from '~/services/query-context/helpers';

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

const getAllCategoriesOptions: UseQueryOptions<typeof queryEndpoints['getCategories']> = {
  variables: { type: 'all' },
  defaultValue: [],
};

const CategoryInput: React.SFC<CategoryInputProps> = props => {
  const { t } = useTranslation();
  const [autocompleteValue, setAutoCompleteValue] = React.useState('');

  const { data: allCategories, loading: getParentCategoriesLoading, error: getParentCategoriesError } = useQuery(
    queryEndpoints.getCategories,
    getAllCategoriesOptions,
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
      items={allCategories}
      shouldItemRender={(item, value) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1}
      getItemValue={item => item.name}
      overrides={{ menuMaxHeight: 400 }}
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
      const foundCategory = Array.from(allCategories);
      setAutoCompleteValue(
        lodashGet(
          foundCategory.find(category => category.id === props.selectedCategoryId),
          'name',
          '',
        ),
      );
    }
  }, [allCategories, props.selectedCategoryId]);

  /*
  CategoryInput Functions
  */

  return __;
};

const _CategoryInput = React.memo(CategoryInput, (prevProps, newProps) => {
  if (
    prevProps.disabled !== newProps.disabled ||
    prevProps.isHighlighted !== newProps.isHighlighted ||
    prevProps.selectedCategoryId !== newProps.selectedCategoryId
  ) {
    return false;
  }

  return true;
});

export { _CategoryInput as CategoryInput };
