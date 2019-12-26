import * as React from 'react';
import { useHistory } from 'react-router';
import Select from 'react-select';
import styled, { colors, css } from '~/styled';
import { UIInput, UIButton } from '~/components/ui';
import { useAlert } from '~/utils/hooks';
import { useApplicationContext } from '~/app/context';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { refetchFactory } from '~/services/utils';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { useQuery } from '~/services/query-context/context';

/* CreateNotificationPage Helpers */
interface CreateNotificationPageProps {}

/* CreateNotificationPage Constants */

/* CreateNotificationPage Styles */
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
/* CreateNotificationPage Component  */
function CreateNotificationPage(props: React.PropsWithChildren<CreateNotificationPageProps>) {
  /* CreateNotificationPage Variables */
  const alert = useAlert();
  const applicationContext = useApplicationContext();
  const routerHistory = useHistory();
  const [title, setTitle] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [selectedUser, setSelectedUser] = React.useState({ value: '', label: '' });
  const [usersOptions, setUsersOptions] = React.useState([{ value: '', label: '' }]);
  const { mutation: createNotification } = useMutation(mutationEndPoints.createNotification, {
    variables: {
      message,
      title,
      userId: selectedUser.value,
    },
    refetchQueries: [refetchFactory(queryEndpoints.getAllNotifications)],
  });
  const { data: getAllUsers } = useQuery(queryEndpoints.getAllUsers, {
    defaultValue: [],
  });

  /* CreateAnnouncementPage Callbacks */
  const handleSubmit = React.useCallback(() => {
    applicationContext.loading.show();
    createNotification()
      .then(() => {
        applicationContext.loading.hide();
        alert.show('Bildirim Eklendi', { type: 'success' });
        routerHistory.push('/all-notifications');
      })
      .catch(() => {
        applicationContext.loading.hide();
        alert.show('Bildirim Eklenemedi.', { type: 'error' });
      });
  }, [applicationContext.loading, alert, createNotification, routerHistory]);

  /* CreateNotificationPage Callbacks */

  /* CreateNotificationPage Lifecycle  */

  React.useEffect(() => {
    setUsersOptions(
      getAllUsers.map(user => {
        return { value: user.id, label: user.name };
      }),
    );
  }, [getAllUsers]);

  return (
    <StyledPageWrapper>
      <StyledPageHeader>
        <h3>Bildirim Ekle</h3>
      </StyledPageHeader>
      <StyledContent>
        <StyledContentElement>
          <label>Baslik</label>
          <StyledInput id="contents" type="text" value={title} onChange={setTitle} />
        </StyledContentElement>
        <StyledContentElement>
          <label>Mesaj</label>
          <StyledInput id="quantity" type="text" value={message} onChange={setMessage} />
        </StyledContentElement>
        <StyledContentElement>
          <label>Kullanici</label>
          <Select
            options={usersOptions}
            placeholder="Secim Yapin"
            className={selectInput}
            value={selectedUser}
            onChange={e => setSelectedUser(e)}
          />
        </StyledContentElement>
        <StyledContentElement>
          <StyledButton disabled={!title || !message || selectedUser.value === ''} onClick={handleSubmit}>
            Ekle
          </StyledButton>
        </StyledContentElement>
      </StyledContent>
    </StyledPageWrapper>
  );
}
const PureCreateNotificationPage = React.memo(CreateNotificationPage);

export { PureCreateNotificationPage as CreateNotificationPage };
