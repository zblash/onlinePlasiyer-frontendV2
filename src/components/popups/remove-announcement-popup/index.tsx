import * as React from 'react';
import { useTranslation } from '~/i18n';
import { usePopupContext } from '~/contexts/popup/context';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { CommonDeletePopup } from '../common-delete-popup';

/* RemoveAnnouncementPopup Helpers */
export interface RemoveAnnouncementPopupParams {
  id: string;
  refetchQuery?: any;
}
interface RemoveAnnouncementPopupProps {
  params: RemoveAnnouncementPopupParams;
}

/* RemoveAnnouncementPopup Constants */

/* RemoveAnnouncementPopup Styles */

/* RemoveAnnouncementPopup Component  */
function RemoveAnnouncementPopup(props: React.PropsWithChildren<RemoveAnnouncementPopupProps>) {
  /* RemoveAnnouncementPopup Variables */
  const { t } = useTranslation();
  const popups = usePopupContext();
  const refetchQueries = React.useMemo(() => (props.params.refetchQuery ? [props.params.refetchQuery] : []), [
    props.params.refetchQuery,
  ]);
  const { mutation: removeAnnouncement, loading, error } = useMutation(mutationEndPoints.removeAnnouncement, {
    variables: { id: props.params.id },
    refetchQueries,
  });

  /* RemoveAnnouncementPopup Callbacks */

  const handleDelete = React.useCallback(() => {
    removeAnnouncement().then(() => popups.removeAnnouncement.hide());
  }, [removeAnnouncement, popups.removeAnnouncement]);

  const handleCancel = React.useCallback(() => {
    popups.removeAnnouncement.hide();
  }, [popups.removeAnnouncement]);

  /* RemoveAnnouncementPopup Lifecycle  */

  return (
    <CommonDeletePopup
      title={t('popups.remove-announcement.are-you-sure-question')}
      isLoading={loading}
      errorText={error ? t('popups.remove-announcement.failed-message') : ''}
      onCancelClick={handleCancel}
      onDeleteClick={handleDelete}
    />
  );
}
const PureRemoveAnnouncementPopup = React.memo(RemoveAnnouncementPopup);

export { PureRemoveAnnouncementPopup as RemoveAnnouncementPopup };
