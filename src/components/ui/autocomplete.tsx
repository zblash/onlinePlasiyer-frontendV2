import * as React from 'react';
import lodashGet from 'lodash.get';
import ReactAutocomplete from 'react-autocomplete';

/*
  UIAutoComplete Helpers
*/
interface UIAutoCompleteProps<T> {
  items: T[];
  getItemValue: (item: T) => string;
  renderItem: (item: T, isHighlighted: boolean) => React.ReactElement;
  renderInput: React.ReactElement;
  onSelect: (item: T) => void;
  shouldItemRender: (item: T, value: string) => boolean;
  value?: string;
  overrides?: Partial<{
    menuHeight: number;
    menuMaxHeight: number;
  }>;
}

function _UIAutoComplete<T>(props: UIAutoCompleteProps<T>) {
  const overrides: UIAutoCompleteProps<T>['overrides'] = lodashGet(props, 'overrides', {});
  const __ = (
    <ReactAutocomplete
      items={props.items}
      shouldItemRender={props.shouldItemRender}
      getItemValue={props.getItemValue}
      renderItem={props.renderItem}
      value={props.value}
      wrapperStyle={{ width: '100%' }}
      menuStyle={{
        zIndex: 2,
        background: 'white',
        borderRadius: '3px',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
        padding: '2px 0',
        position: 'fixed',
        overflow: 'auto',
        height: overrides.menuHeight || 'auto',
        maxHeight: overrides.menuMaxHeight || '50%',
      }}
      renderInput={p => (
        <div {...p} style={{ position: 'relative' }} ref={null}>
          <input
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              visibility: 'hidden',
              pointerEvents: 'none',
              width: '100%',
            }}
            ref={p.ref}
          />
          {props.renderInput}
        </div>
      )}
      onSelect={(value, item) => props.onSelect(item)}
    />
  );

  /*
  UIAutoComplete Lifecycle
  */

  /*
  UIAutoComplete Functions
  */

  return __;
}

const UIAutoComplete = _UIAutoComplete;

export { UIAutoComplete };
