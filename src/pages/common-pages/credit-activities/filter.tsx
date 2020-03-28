import * as React from 'react';
import DatePicker from 'react-datepicker';
import styled, { colors, css } from '~/styled';
import { UIButton } from '~/components/ui';

/* CreditActivitiesFilterComponent Helpers */
interface CreditActivitiesFilterComponentProps {
  setLastDate: (e: Date) => void;
  setStartDate: (e: Date) => void;
}

/* CreditActivitiesFilterComponent Constants */

/* CreditActivitiesFilterComponent Styles */
const StyledFilterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const StyledNameInputBtn = styled(UIButton)`
  padding: 0 65px;
`;
const StyledNameLabel = styled.label`
  margin-right: 7px;
  padding: 3px;
  float: left;
`;
const DatePickerBtn = css`
  border: 2px solid ${colors.lightGray};
  border-radius: 4px;
  width: 99%;
  padding-left: 1%;
  height: 26px;
`;

/* CreditActivitiesFilterComponent Component  */
function CreditActivitiesFilterComponent(props: React.PropsWithChildren<CreditActivitiesFilterComponentProps>) {
  /* CreditActivitiesFilterComponent Variables */
  const [lastDate, setLastDate] = React.useState<Date>();
  const [startDate, setStartDate] = React.useState<Date>();
  /* CreditActivitiesFilterComponent Callbacks */
  const handleFilter = React.useCallback(() => {
    if (lastDate) {
      props.setLastDate(lastDate);
    }

    if (startDate) {
      props.setStartDate(startDate);
    }
  }, [lastDate, startDate, props]);
  /* CreditActivitiesFilterComponent Lifecycle  */

  return (
    <StyledFilterWrapper>
      <div>
        <StyledNameLabel>Baslangic Tarihi: </StyledNameLabel>
        <DatePicker
          selected={startDate}
          maxDate={new Date()}
          onChange={selectedDate => setStartDate(selectedDate)}
          locale="tr"
          dateFormat="dd-MM-yyyy"
          className={DatePickerBtn}
        />
      </div>
      <div>
        <StyledNameLabel>Son Tarih: </StyledNameLabel>
        <DatePicker
          selected={lastDate}
          maxDate={new Date()}
          onChange={selectedDate => setLastDate(selectedDate)}
          locale="tr"
          dateFormat="dd-MM-yyyy"
          className={DatePickerBtn}
        />
      </div>
      <StyledNameInputBtn disabled={!startDate || !lastDate} onClick={handleFilter}>
        Filtrele
      </StyledNameInputBtn>
    </StyledFilterWrapper>
  );
}
const PureCreditActivitiesFilterComponent = React.memo(CreditActivitiesFilterComponent);

export { PureCreditActivitiesFilterComponent as CreditActivitiesFilterComponent };
