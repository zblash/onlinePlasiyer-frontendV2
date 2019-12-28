import * as React from 'react';
import styled, { colors, css } from '~/styled';
import { UIIcon, Container, UITable } from '~/components/ui';
import { usePopupContext } from '~/contexts/popup/context';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { UITableColumns } from '~/components/ui/table';
import { INotificationResponse } from '~/services/helpers/backend-models';
import { refetchFactory } from '~/services/utils';

/* AllNotificationsPage Helpers */
interface AllNotificationsPageProps {}

/* AllNotificationsPage Constants */

/* AllNotificationsPage Styles */
const StyledPageContainer = styled.div`
  margin-top: 48px;
`;
const StyledActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const commonIconStyle = css`
  cursor: pointer;
  margin: 0 8px;
`;

/* AllNotificationsPage Component  */
function AllNotificationsPage(props: React.PropsWithChildren<AllNotificationsPageProps>) {
  /* AllNotificationsPage Variables */
  const popupsContext = usePopupContext();
  const { data: notifications } = useQuery(queryEndpoints.getAllNotifications, {
    defaultValue: [],
  });
  const refetchQuery = refetchFactory(queryEndpoints.getAllNotifications);
  const TABLE_DATA_COLUMNS = React.useMemo<UITableColumns<INotificationResponse>[]>(
    () => [
      {
        title: 'Gonderilen Kullanici',
        itemRenderer: item => item.userName,
      },
      {
        title: 'Baslik',
        itemRenderer: item => item.title,
      },
      {
        title: 'Mesaj',
        itemRenderer: item => item.message,
      },
      {
        title: null,
        itemRenderer: item => (
          <StyledActionsWrapper>
            <UIIcon
              name="trash"
              color={colors.dangerDark}
              className={commonIconStyle}
              size={16}
              onClick={() => popupsContext.removeNotification.show({ id: item.id, refetchQuery })}
            />
          </StyledActionsWrapper>
        ),
      },
    ],
    [popupsContext.removeNotification, refetchQuery],
  );
  /* AllNotificationsPage Callbacks */

  /* AllNotificationsPage Lifecycle  */

  return (
    <Container>
      <StyledPageContainer>
        <UITable
          id="all-notifications-page-table"
          data={notifications}
          rowCount={14}
          totalPageCount={Math.ceil(notifications.length / 14)}
          columns={TABLE_DATA_COLUMNS}
        />
      </StyledPageContainer>
    </Container>
  );
}
const PureAllNotificationsPage = React.memo(AllNotificationsPage);

export { PureAllNotificationsPage as AllNotificationsPage };
