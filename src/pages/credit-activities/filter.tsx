import * as React from 'react';
import DatePicker from 'react-datepicker';
import styled, { colors, css } from '~/styled';
import { UIButton } from '~/components/ui';

/* CreditActivitiesFilterComponent Helpers */
interface CreditActivitiesFilterComponentProps {
  setCustomer: (e: string) => void;
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
const StyledNameInput = styled.input`
  float: left;  
  border: 1px solid ${colors.lightGray};
  border-radius: 6px;
  padding 7px 9px;
  margin-right: 5px;
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
  const [user, setUser] = React.useState<string>('');
  const [lastDate, setLastDate] = React.useState<Date>();
  const [startDate, setStartDate] = React.useState<Date>();
  /* CreditActivitiesFilterComponent Callbacks */
  const handleFilterNameChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUser(e.target.value);
  }, []);

  const handleFilter = React.useCallback(() => {
    if (user) {
      props.setCustomer(user);
    }

    if (lastDate) {
      props.setLastDate(lastDate);
    }

    if (startDate) {
      props.setStartDate(lastDate);
    }
  }, [user, lastDate, startDate, props]);
  /* CreditActivitiesFilterComponent Lifecycle  */

  return (
    <StyledFilterWrapper>
      <div>
        <StyledNameLabel>Kullanici Ismi: </StyledNameLabel>
        <StyledNameInput placeholder="Kullanici ismi" id="name-filter" value={user} onChange={handleFilterNameChange} />
      </div>
      <div>
        <StyledNameLabel>Tarih: </StyledNameLabel>
        <DatePicker
          selected={startDate}
          maxDate={new Date()}
          onChange={selectedDate => setStartDate(selectedDate)}
          locale="tr"
          dateFormat="yyyy-MM-dd"
          className={DatePickerBtn}
        />
      </div>
      <div>
        <StyledNameLabel>Tarih: </StyledNameLabel>
        <DatePicker
          selected={lastDate}
          maxDate={new Date()}
          onChange={selectedDate => setLastDate(selectedDate)}
          locale="tr"
          dateFormat="yyyy-MM-dd"
          className={DatePickerBtn}
        />
      </div>
      <StyledNameInputBtn disabled={!user} onClick={handleFilter}>
        Filtrele
      </StyledNameInputBtn>
    </StyledFilterWrapper>
  );
}
const PureCreditActivitiesFilterComponent = React.memo(CreditActivitiesFilterComponent);

export { PureCreditActivitiesFilterComponent as CreditActivitiesFilterComponent };
