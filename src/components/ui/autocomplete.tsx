import * as React from 'react';
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
}

function _UIAutoComplete<T>(props: UIAutoCompleteProps<T>) {
  const __ = (
    <ReactAutocomplete
      items={props.items}
      shouldItemRender={props.shouldItemRender}
      getItemValue={props.getItemValue}
      renderItem={props.renderItem}
      value={props.value}
      menuStyle={{
        zIndex: 2,
        background: 'white',
        borderRadius: '3px',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
        padding: '2px 0',
        position: 'fixed',
        overflow: 'auto',
        maxHeight: '50%',
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
