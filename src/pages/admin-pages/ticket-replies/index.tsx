import * as React from 'react';
import { useParams } from 'react-router';
import styled, { colors, css } from '~/styled';
import { Container, UIButton } from '~/components/ui';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { useApplicationContext } from '~/app/context';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { refetchFactory } from '~/services/utils';
import { useAlert } from '~/utils/hooks';

/* TicketRepliesPage Helpers */
interface TicketRepliesPageProps {}
interface RouteParams {
  ticketId: string;
}
/* TicketRepliesPage Constants */

/* TicketRepliesPage Styles */
const StyledPageContainer = styled.div`
  margin-top: 48px;
`;
const StyledPageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border: 1px solid ${colors.lightGray};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;
const StyledPageContent = styled.div`
  border-bottom: 1px solid ${colors.lightGray};
  border-right: 1px solid ${colors.lightGray};
  border-left: 1px solid ${colors.lightGray};
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  padding: 10px;
`;
const StyledAnswerWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 10px;
`;
const StyledAnswer = styled.div`
  padding: 10px;
  border-radius: 10px;
  background-color: ${colors.lightGray};
`;
const StyledReplyWrapper = styled.div`
  padding: 10px;
  margin-top: 10px;
  border: 1px solid ${colors.lightGray};
  border-radius: 8px;
`;
const StyledButton = styled(UIButton)``;
const floatRight = css`
  justify-content: flex-end;
`;
const replyDesc = css`
  width: 100%;
  margin: 0;
  text-align: right;
`;
const textareaStyle = css`
  width: 100%;
  height: 95px;
  background-color: ${colors.whiteSolid};
  border-radius: 8px;
`;
/* TicketRepliesPage Component  */
function TicketRepliesPage(props: React.PropsWithChildren<TicketRepliesPageProps>) {
  /* TicketRepliesPage Variables */
  const applicationContext = useApplicationContext();
  const alert = useAlert();
  const [reply, setReply] = React.useState('');
  const { ticketId } = useParams<RouteParams>();
  const { data: ticket } = useQuery(queryEndpoints.getTicketById, {
    defaultValue: {},
    variables: { id: ticketId },
  });
  const { data: ticketReplies, loading: repliesLoading } = useQuery(queryEndpoints.getTicketRepliesByTicketId, {
    defaultValue: [],
    variables: { id: ticketId },
  });
  const { mutation: createTicketReply } = useMutation(mutationEndPoints.createTicketReply, {
    variables: {
      message: reply,
      id: ticketId,
    },
    refetchQueries: [refetchFactory(queryEndpoints.getTicketRepliesByTicketId, { id: ticketId })],
  });
  /* TicketRepliesPage Callbacks */
  const handleSubmit = React.useCallback(() => {
    applicationContext.loading.show();
    createTicketReply()
      .then(() => {
        applicationContext.loading.hide();
        alert.show('Mesaj Eklendi', { type: 'success' });
      })
      .catch(() => {
        applicationContext.loading.hide();
        alert.show('Mesaj Eklenemedi.', { type: 'error' });
      });
  }, [alert, applicationContext, createTicketReply]);
  /* TicketRepliesPage Lifecycle  */

  return (
    <Container>
      <StyledPageContainer>
        <StyledPageHeader>
          <span>
            <strong>Baslik: </strong>
            {ticket.title}
          </span>
          <span>
            <strong>Olusturulma Tarihi: </strong>
            {ticket.addedTime}
          </span>
          <span>
            <strong>Durumu: </strong>
            {ticket.status}
          </span>
          <span>
            <strong>Olusturan: </strong>
            {ticket.openerName}
          </span>
        </StyledPageHeader>
        <StyledPageContent>
          {!repliesLoading &&
            ticketReplies.map(ticketReply => (
              <StyledAnswerWrapper
                key={ticketReply.id}
                className={ticketReply.username !== applicationContext.user.username ? floatRight : ''}
              >
                <StyledAnswer>
                  <span>{ticketReply.message}</span>
                  <p className={replyDesc}>
                    {ticketReply.username} - {ticketReply.addedTime}
                  </p>
                </StyledAnswer>
              </StyledAnswerWrapper>
            ))}
        </StyledPageContent>
        <StyledReplyWrapper>
          <textarea className={textareaStyle} onChange={e => setReply(e.target.value)} />
          <StyledButton disabled={reply === '' || !reply} onClick={handleSubmit}>
            Yanitla
          </StyledButton>
        </StyledReplyWrapper>
      </StyledPageContainer>
    </Container>
  );
}
const PureTicketRepliesPage = React.memo(TicketRepliesPage);

export { PureTicketRepliesPage as TicketRepliesPage };
