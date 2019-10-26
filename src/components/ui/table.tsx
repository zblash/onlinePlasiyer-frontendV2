import * as React from 'react';
import styled, { css } from '~/styled';
import { objectKeys } from '~/utils';
import { UIIcon } from '~/components/ui';

/*
  UiTable Helpers
*/

export interface UITableColumns<T> {
  text: string;
  props: keyof T;
}

interface UiTableProps<T> {
  columns: UITableColumns<T>[];
  data: T[];
  rowCount?: number;
}

/*
  UiTable Colors
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
`;

const StyledBodyTd = styled.td`
  font-size: 15px;
  padding-left: 8px;
  text-align: left;
  :first-child {
    padding-left: 40px;
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

function _UITable<T>(props: UiTableProps<T>) {
  const hasRowCount = typeof props.rowCount === 'number';
  const rowCount = hasRowCount ? props.rowCount : props.data.length;
  const [pageIndex, setPageIndex] = React.useState(0);
  const tableData = React.useMemo(() => {
    const data = Array.from(props.data);
    if (hasRowCount) {
      while (data.length % rowCount !== 0) {
        const empty = {};
        objectKeys(data[data.length - 1]).forEach(key => {
          empty[key] = ' ' as never;
        });
        data.push(empty as T);
      }

      return data.slice(pageIndex * rowCount, (pageIndex + 1) * props.rowCount);
    }

    return data;
  }, [props.data, props.rowCount, hasRowCount, rowCount, pageIndex]);

  const pageCount = Math.floor(props.data.length / rowCount);

  const __ = (
    <UiTableWrapper>
      <StyledUiTable>
        <StyledTHead>
          <StyledHeadTr>
            {props.columns.map(({ text }) => (
              <StyledHeadTh key={text}>{text}</StyledHeadTh>
            ))}
          </StyledHeadTr>
        </StyledTHead>
        <StyledTableBody>
          {tableData.map((item, index) => (
            <StyledBodyTr key={index}>
              {props.columns.map(({ text, props }) => (
                <StyledBodyTd key={text}>{item[props]}</StyledBodyTd>
              ))}
            </StyledBodyTr>
          ))}
        </StyledTableBody>
      </StyledUiTable>
      {hasRowCount && (
        <PaginationButtonsWrapper>
          <UIIcon
            name="chevronLeft"
            size={24}
            className={iconStyle}
            color={UiTableColors.white}
            onClick={() => setPageIndexCallback(pageIndex - 1)}
          />
          <StyledPageInfoSpan>
            {pageIndex + 1} / {pageCount + 1}
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

  /*
  UiTable Lifecycle
  */

  /*
  UiTable Functions
  */

  function setPageIndexCallback(index: number) {
    setPageIndex(Math.max(0, Math.min(pageCount, index)));
  }

  return __;
}

const UITable = _UITable;

export { UITable };
