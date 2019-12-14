import * as React from 'react';
import styled, { css, StylableProps } from '~/styled';
import { UIIcon } from '~/components/ui';
import { TableSort } from './table-sort';

/*
  UiTable Helpers
*/

export type UITableColumns<T> = {
  title: string | React.ReactElement;
  itemRenderer: string | number | ((item: T) => React.ReactElement | string | number);
};

interface UiTableProps<T> extends StylableProps {
  data: T[];
  columns: UITableColumns<T>[];
  totalPageCount?: number;
  rowCount?: number;
  id: string;
  hidePagination?: boolean;
  onChangePage?: (pageIndex: number, totalPageCount: number) => void;
  onSortChange?: (e) => void;
  onSortTypeChange?: (value) => void;
  sortList?: any[];
}

/*
  UiTable Colors // TODO : move theme.json
*/
export const UiTableColors = {
  primary: '#0075ff',
  white: '#fff',
  text: '#808080',
  tableBoxShadow: '#ccc',
  tableBodyEvenChild: '#f5f5f5',
};

/*
  UiTable Styles
*/

const StyledUiTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  width: 100%;
  margin: 0 auto;
  position: relative;
  max-height: 150px;
`;
const StyledHeadTr = styled.tr`
  height: 50px;
  background: ${UiTableColors.primary};
  color: ${UiTableColors.white};
`;

const StyledHeadTh = styled.th`
  text-align: left;
  font-size: 18px;
  padding-left: 8px;
  :first-child {
    padding-left: 40px;
  }
  :last-child {
    padding-right: 40px;
  }
`;

const StyledBodyTd = styled.td`
  font-size: 15px;
  padding-left: 8px;
  text-align: left;
  :first-child {
    padding-left: 40px;
  }
  :last-child {
    padding-right: 40px;
  }
`;

const StyledBodyTr = styled(StyledHeadTr)`
  background: ${UiTableColors.white};
  color: ${UiTableColors.text};
  height: 50px;
`;

const StyledTHead = styled.thead`
  > tr th {
    :first-child {
      border-top-left-radius: 10px;
    }
    :last-child {
      border-top-right-radius: 10px;
    }
  }
`;

const StyledTableBody = styled.tbody`
  ${StyledBodyTr} {
    :nth-child(even) {
      background-color: ${UiTableColors.tableBodyEvenChild};
    }
    :last-child {
      ${StyledBodyTd} {
        :first-child {
          border-bottom-left-radius: 10px;
        }
        :last-child {
          border-bottom-right-radius: 10px;
        }
      }
    }
  }
`;

const UiTableWrapper = styled.div``;
const PaginationButtonsWrapper = styled.div`
  color: ${UiTableColors.text};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 8px 0;
`;

const StyledPageInfoSpan = styled.span`
  user-select: none;
`;

const iconStyle = css`
  background-color: ${UiTableColors.primary};
  border-radius: 50%;
  cursor: pointer;
  padding: 2px;
  margin: 0 8px;
`;

function UITable<T>(props: UiTableProps<T>) {
  const hasRowCount = typeof props.rowCount === 'number';
  const elementCount = hasRowCount ? props.rowCount : props.data.length;

  const [pageIndex, setPageIndex] = React.useState(1);
  const dataWithEmptyRow = React.useMemo(() => {
    if (hasRowCount && props.data.length) {
      const data = Array.from(props.data);
      while (data.length % elementCount !== 0 || data.length === 0) {
        data.push(null as T);
      }

      return data;
    }
    if (props.data.length === 0 && hasRowCount) {
      const data = [];
      for (let i = 0; i < elementCount; i++) {
        data.push(null as T);
      }

      return data;
    }

    return [];
  }, [hasRowCount, props.data, elementCount]);

  const needAdd = React.useMemo(() => {
    return elementCount - (dataWithEmptyRow.length - elementCount * (props.totalPageCount - 1));
  }, [elementCount, props.totalPageCount, dataWithEmptyRow]);

  const tableData = React.useMemo(() => {
    for (let i = 0; i < needAdd; i++) {
      dataWithEmptyRow.push(null as T);
    }

    return dataWithEmptyRow.slice((pageIndex - 1) * elementCount, pageIndex * elementCount);
  }, [dataWithEmptyRow, pageIndex, elementCount, needAdd]);

  /*
  UiTable Lifecycle
  */
  function setPageIndexCallback(index: number) {
    const nextPage = Math.max(1, Math.min(props.totalPageCount || 1, index));
    if (props.totalPageCount && nextPage <= props.totalPageCount) {
      setPageIndex(nextPage);

      if (props.onChangePage) {
        props.onChangePage(nextPage, props.totalPageCount);
      }
    }
  }

  React.useEffect(() => {
    setPageIndex(1);
  }, [props.id]);

  return (
    <UiTableWrapper className={props.className}>
      {props.sortList && props.onSortChange && props.onSortTypeChange && (
        <TableSort
          onSortChange={props.onSortChange}
          sortList={props.sortList}
          onSortTypeChange={props.onSortTypeChange}
        />
      )}
      <StyledUiTable>
        <StyledTHead>
          <StyledHeadTr>
            {props.columns.map(({ title }, index) => (
              <StyledHeadTh key={index}>{title}</StyledHeadTh>
            ))}
          </StyledHeadTr>
        </StyledTHead>
        <StyledTableBody>
          {tableData.map((item, index) => (
            <StyledBodyTr key={index}>
              {props.columns.map(({ itemRenderer }, indexNested) => {
                if (!item) {
                  return <StyledBodyTd key={indexNested} />;
                }

                return (
                  <StyledBodyTd key={indexNested}>
                    {typeof itemRenderer === 'function' ? itemRenderer(item) : itemRenderer}
                  </StyledBodyTd>
                );
              })}
            </StyledBodyTr>
          ))}
        </StyledTableBody>
      </StyledUiTable>
      {hasRowCount && !props.hidePagination && (
        <PaginationButtonsWrapper>
          <UIIcon
            name="chevronLeft"
            size={24}
            className={iconStyle}
            color={UiTableColors.white}
            onClick={() => setPageIndexCallback(pageIndex - 1)}
          />
          <StyledPageInfoSpan>
            {pageIndex} / {props.totalPageCount || 1}
          </StyledPageInfoSpan>
          <UIIcon
            name="chevronRight"
            size={24}
            className={iconStyle}
            color={UiTableColors.white}
            onClick={() => setPageIndexCallback(pageIndex + 1)}
          />
        </PaginationButtonsWrapper>
      )}
    </UiTableWrapper>
  );
}

// TODO: add memo
export { UITable };
