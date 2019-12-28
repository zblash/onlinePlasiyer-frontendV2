import * as React from 'react';
import { useTranslation } from '~/i18n';
import { usePopupContext } from '~/contexts/popup/context';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { CommonDeletePopup } from '../common-delete-popup';

/* RemoveNotificationPopup Helpers */
export interface RemoveNotificationPopupParams {
  id: string;
  refetchQuery?: any;
}
interface RemoveNotificationPopupProps {
  params: RemoveNotificationPopupParams;
}

/* RemoveNotificationPopup Constants */

/* RemoveNotificationPopup Styles */

/* RemoveNotificationPopup Component  */
function RemoveNotificationPopup(props: React.PropsWithChildren<RemoveNotificationPopupProps>) {
  /* RemoveNotificationPopup Variables */
  const { t } = useTranslation();
  const popups = usePopupContext();
  const refetchQueries = React.useMemo(() => (props.params.refetchQuery ? [props.params.refetchQuery] : []), [
    props.params.refetchQuery,
  ]);
  const { mutation: removeNotification, loading, error } = useMutation(mutationEndPoints.removeNotification, {
    variables: { id: props.params.id },
    refetchQueries,
  });

  /* RemoveNotificationPopup Callbacks */

  const handleDelete = React.useCallback(() => {
    removeNotification().then(() => popups.removeNotification.hide());
  }, [removeNotification, popups.removeNotification]);

  const handleCancel = React.useCallback(() => {
    popups.removeNotification.hide();
  }, [popups.removeNotification]);

  /* RemoveNotificationPopup Lifecycle  */

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
const PureRemoveNotificationPopup = React.memo(RemoveNotificationPopup);

export { PureRemoveNotificationPopup as RemoveNotificationPopup };
