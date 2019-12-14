import * as React from 'react';
import styled, { colors } from '~/styled';
import { UIButton } from './button';

/* TableSort Helpers */
interface TableSortProps {
  sortList: any[];
  onSortChange: (e) => void;
  onSortTypeChange: (e) => void;
}

/* TableSort Constants */

/* TableSort Styles */
const StyledTableSortWrapper = styled.div`
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  align-items: center;
  justify-contents: flex-start;
  display: flex;
  margin-bottom: 10px;
`;
const StyledButton = styled(UIButton)`
  min-height: 38px;
  display: flex;
  border: 1px solid ${colors.gray};
  border-radius: 5px;
  margin-left: 10px;
  background-color: ${colors.white};
  color: ${colors.gray};
  :hover {
    color: ${colors.white};
    border: 1px solid ${colors.white};
  }
`;
/* TableSort Component  */
function TableSort(props: React.PropsWithChildren<TableSortProps>) {
  /* TableSort Variables */
  const sortTypes = [{ value: 'desc', label: 'Azalan' }, { value: 'asc', label: 'Artan' }];
  /* TableSort Callbacks */

  const handleSortChange = React.useCallback(
    (item, type) => {
      props.onSortChange(item);
      props.onSortTypeChange(type);
    },
    [props],
  );

  /* TableSort Lifecycle  */

  return (
    <StyledTableSortWrapper>
      {props.sortList.map(sortItem => {
        return sortTypes.map(sortType => {
          return (
            <StyledButton
              key={`${sortItem.value}-${sortType.value}`}
              onClick={e => handleSortChange(sortItem, sortType.value)}
            >
              {sortItem.label} {sortType.label}
            </StyledButton>
          );
        });
      })}
    </StyledTableSortWrapper>
  );
}
const PureTableSort = React.memo(TableSort);

export { PureTableSort as TableSort };
