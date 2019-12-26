import * as React from 'react';
import DatePicker from 'react-datepicker';
import { useHistory } from 'react-router';
import styled, { colors, css } from '~/styled';
import { UIInput, UIButton, UIIcon } from '~/components/ui';
import { useAlert } from '~/utils/hooks';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { useApplicationContext } from '~/app/context';
import { refetchFactory } from '~/services/utils';
import { paginationQueryEndpoints } from '~/services/query-context/pagination-query-endpoints';

/* CreateAnnouncementPage Helpers */
interface CreateAnnouncementPageProps {}

/* CreateAnnouncementPage Constants */

/* CreateAnnouncementPage Styles */
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
const StyledHiddenFilePicker = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -999;
  pointer-events: none;
`;
const StyledCategoryImgWrapper = styled.label`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 96px;
  margin-bottom: 24px;
  border-radius: 50%;
  border: 2px solid ${colors.primary};
  cursor: pointer;
`;
const StyledCategoryImg = styled.img`
  object-fit: cover;
  border-radius: 50%;
  width: 100%;
  height: 100%;
`;
const StyledDatePickerWrapper = styled.div`
  width: 100%;
  ${'.react-datepicker-wrapper'} {
    display: block;
  }
`;
const imageIconStyle = css`
  padding: 8px;
`;
const DatePickerBtn = css`
  border: 2px solid ${colors.lightGray};
  border-radius: 4px;
  width: 99%;
  padding-left: 1%;
  margin-bottom: 35px;
  height: 35px;
`;
/* CreateAnnouncementPage Component  */
const filePickerInputId = 'image-create-announcement';
function CreateAnnouncementPage(props: React.PropsWithChildren<CreateAnnouncementPageProps>) {
  /* CreateAnnouncementPage Variables */
  const alert = useAlert();
  const applicationContext = useApplicationContext();
  const routerHistory = useHistory();
  const [title, setTitle] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [lastDate, setLastDate] = React.useState(new Date());
  const [imgSrc, setImgSrc] = React.useState('');
  const [img, setImg] = React.useState<File>();
  const { mutation: createAnnouncement } = useMutation(mutationEndPoints.createAnnouncement, {
    variables: {
      // eslint-disable-next-line
      lastDate: lastDate.getDate() + '-' + (lastDate.getMonth() + 1) + '-' + lastDate.getFullYear(),
      message,
      title,
      uploadfile: img,
    },
    refetchQueries: [refetchFactory(paginationQueryEndpoints.getAllAnnouncements)],
  });
  /* CreateAnnouncementPage Callbacks */
  const handleSubmit = React.useCallback(() => {
    applicationContext.loading.show();
    createAnnouncement()
      .then(() => {
        applicationContext.loading.hide();
        alert.show('Duyuru Eklendi', { type: 'success' });
        routerHistory.push('/announcements');
      })
      .catch(() => {
        applicationContext.loading.hide();
        alert.show('Duyuru Eklenemedi.', { type: 'error' });
      });
  }, [applicationContext.loading, alert, createAnnouncement, routerHistory]);

  /* CreateAnnouncementPage Lifecycle  */

  return (
    <StyledPageWrapper>
      <StyledPageHeader>
        <h3>Duyuru Ekle</h3>
      </StyledPageHeader>
      <StyledContent>
        <StyledContentElement>
          <label>Duyuru Dosyasi</label>
          <StyledHiddenFilePicker
            hidden
            id={filePickerInputId}
            type="file"
            onChange={event => {
              if (event.target.files && event.target.files[0]) {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.onload = e => {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                  // @ts-ignore
                  setImgSrc(e.target.result as string);
                  setImg(file);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          <StyledCategoryImgWrapper htmlFor={filePickerInputId}>
            {imgSrc && <StyledCategoryImg src={imgSrc} />}
            {!imgSrc && <UIIcon name="photoCamera" size={42} className={imageIconStyle} />}
          </StyledCategoryImgWrapper>
        </StyledContentElement>
        <StyledContentElement>
          <label>Baslik</label>
          <StyledInput id="contents" type="text" value={title} onChange={setTitle} />
        </StyledContentElement>
        <StyledContentElement>
          <label>Mesaj</label>
          <StyledInput id="quantity" type="text" value={message} onChange={setMessage} />
        </StyledContentElement>
        <StyledContentElement>
          <label>Gecerli Olacagi Son Tarih</label>
          <StyledDatePickerWrapper>
            <DatePicker
              selected={lastDate}
              minDate={new Date()}
              onChange={selectedDate => setLastDate(selectedDate)}
              locale="tr"
              dateFormat="dd-MM-yyyy"
              className={DatePickerBtn}
            />
          </StyledDatePickerWrapper>
        </StyledContentElement>

        <StyledContentElement>
          <StyledButton disabled={!title || !img || !message} onClick={handleSubmit}>
            Ekle
          </StyledButton>
        </StyledContentElement>
      </StyledContent>
    </StyledPageWrapper>
  );
}
const PureCreateAnnouncementPage = React.memo(CreateAnnouncementPage);

export { PureCreateAnnouncementPage as CreateAnnouncementPage };
