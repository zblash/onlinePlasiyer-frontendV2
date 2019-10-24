import * as React from 'react';
import CollapsibleLibrary from 'react-collapsible';

/*
  Collapsible Helpers
*/
interface CollapsibleProps {
  content: (handler: (isOpen: boolean) => void, isOpen: boolean) => React.ReactElement;
}
const _Collapsible: React.SFC<CollapsibleProps> = props => {
  const [isOpen, setIsOpen] = React.useState(false);
  const trigger = props.content(p => {
    if (p !== isOpen) {
      setIsOpen(p);
    }
  }, isOpen);
  const __ = (
    <CollapsibleLibrary open={isOpen} triggerDisabled trigger={trigger} triggerTagName="div">
      {props.children}
    </CollapsibleLibrary>
  );

  /*
  Collapsible Lifecycle
  */

  /*
  Collapsible Functions
  */

  return __;
};

const Collapsible = _Collapsible;

export { Collapsible };
