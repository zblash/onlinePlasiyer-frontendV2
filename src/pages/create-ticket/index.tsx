import * as React from 'react';
import { useHistory } from 'react-router';
import Select from 'react-select';
import styled, { colors, css } from '~/styled';
import { UIInput, UIButton } from '~/components/ui';
import { useApplicationContext } from '~/app/context';
import { useAlert } from '~/utils/hooks';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { refetchFactory } from '~/services/utils';
import { paginationQueryEndpoints } from '~/services/query-context/pagination-query-endpoints';
/* CreateTicketPage Helpers */
interface CreateTicketPageProps {}

/* CreateTicketPage Constants */

/* CreateTicketPage Styles */
const StyledPageWrapper = styled.div`
  border: 1px solid ${colors.lightGray};
  border-radius: 8px;
  margin: 15px auto 0 auto;
  background-color: ${colors.white};
  padding: 15px 1%;
  max-width: 70%;
`;
const StyledPageHeader = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${colors.lightGray};
  margin-bottom: 15px;
`;
const StyledContent = styled.div`
  width: 100%;
`;
const StyledContentElement = styled.div``;
const StyledInput = styled(UIInput)`
  width: 99%;
  padding-left: 1%;
  height: 35px;
  margin-bottom: 10px;
  border: 2px solid ${colors.lightGray};
`;
const StyledButton = styled(UIButton)`
  transition: background-color 0.3s;
  background-color: ${colors.primary};
  color: ${colors.white};
  padding: 7px 35px;
  border-radius: 8px;
  :active {
    background-color: ${colors.primaryDark} !important;
  }
  :hover {
    background-color: ${colors.primaryDark};
  }
  :disabled {
    background-color: ${colors.lightGray};
    color: ${colors.primary};
  }
`;
const selectInput = css`
  margin-bottom: 10px;
`;

/* CreateTicketPage Component  */
function CreateTicketPage(props: React.PropsWithChildren<CreateTicketPageProps>) {
  /* CreateTicketPage Variables */
  const applicationContext = useApplicationContext();
  const alert = useAlert();
  const routerHistory = useHistory();
  const [title, setTitle] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [importanceLevel, setImportanceLevel] = React.useState({ value: '', label: '' });
  const importanceLevelOptions = [
    { value: 'LOW', label: 'Dusuk' },
    { value: 'MIDDLE', label: 'Orta' },
    { value: 'URGENT', label: 'Acil' },
  ];
  const { mutation: createTicket } = useMutation(mutationEndPoints.createTicket, {
    variables: {
      message,
      title,
      importanceLevel: importanceLevel.value,
    },
    refetchQueries: [refetchFactory(paginationQueryEndpoints.getAllTickets)],
  });
  /* CreateTicketPage Callbacks */

  const handleSubmit = React.useCallback(() => {
    applicationContext.loading.show();
    createTicket()
      .then(() => {
        applicationContext.loading.hide();
        alert.show('Destek Talebi Olusturuldu', { type: 'success' });
        routerHistory.push('/my-tickets');
      })
      .catch(() => {
        applicationContext.loading.hide();
        alert.show('Destek Talebi Olusturulamadi.', { type: 'error' });
      });
  }, [applicationContext.loading, alert, createTicket, routerHistory]);
  /* CreateTicketPage Lifecycle  */

  return (
    <StyledPageWrapper>
      <StyledPageHeader>
        <h3>Destek Talebi Olustur</h3>
      </StyledPageHeader>
      <StyledContent>
        <StyledContentElement>
          <label>Konu</label>
          <StyledInput id="contents" type="text" value={title} onChange={setTitle} />
        </StyledContentElement>
        <StyledContentElement>
          <label>Mesaj</label>
          <StyledInput id="quantity" type="text" value={message} onChange={setMessage} />
        </StyledContentElement>
        <StyledContentElement>
          <label>Onem Derecesi</label>
          <Select
            options={importanceLevelOptions}
            placeholder="Secim Yapin"
            className={selectInput}
            value={importanceLevel}
            onChange={e => setImportanceLevel(e)}
          />
        </StyledContentElement>
        <StyledContentElement>
          <StyledButton disabled={!title || !message || importanceLevel.value === ''} onClick={handleSubmit}>
            Ekle
          </StyledButton>
        </StyledContentElement>
      </StyledContent>
    </StyledPageWrapper>
  );
}
const PureCreateTicketPage = React.memo(CreateTicketPage);

export { PureCreateTicketPage as CreateTicketPage };
