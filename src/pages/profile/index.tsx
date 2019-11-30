import * as React from 'react';
import styled, { colors, css } from '~/styled';
import { useTranslation } from '~/i18n';
import { Container, UIAutoComplete, UIInput, UIButton } from '~/components/ui';
import { CategoryHorizontalListFetcher } from '~/fetcher-components/common/category-horizontal-list';
import { ObligationComponent } from '~/components/common/obligation';
import { useApplicationContext } from '~/app/context';
import { IAddressCityResponse, IAddressStateResponse } from '~/services/helpers/backend-models';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';

/* ProfilePage Helpers */
interface ProfilePageProps {}

/* ProfilePage Constants */

/* ProfilePage Styles */
const StyledProfilePageWrapper = styled.div``;
const StyledInfosFormWrapper = styled.div`
  width:60%;
  float:left;
  border:1px solid ${colors.lightGray}
  border-radius:8px;
  background-color:${colors.white}
  `;
const StyledInfosFormHeader = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${colors.lightGray};
`;
const StyledInfosForm = styled.div`
  padding-left: 1%;
  padding-right: 1%;
  padding-top: 15px;
`;
const StyledInfosFormElementWrapper = styled.div`
  width: 98%;
  float: left;
  padding-left: 1%;
  padding-right: 1%;
  margin-bottom: 15px;
`;
const StyledInput = styled(UIInput)<{ hasError: boolean }>`
  width: 100%;
  border: 2px solid ${colors.lightGray};
  border-radius: 5px;
  height: 35px;
  border: 2px solid ${props => (props.hasError ? colors.danger : colors.lightGray)};
  border-radius: 5px;
  color: ${colors.lightGray} !important;
  padding-left: 4px;
`;
const StyledInfosFormButton = styled(UIButton)`
  display: flex;
  float: right;
  align-items: center;
  transition: background-color 0.3s;
  background-color: ${colors.primary};
  color: ${colors.white};
  padding: 4px 8px;
  border-radius: 8px;
  :active {
    background-color: ${colors.primaryDark} !important;
  }
  :hover {
    background-color: ${colors.lightGray};
  }
`;
const StyledPasswordResetWrapper = styled.div`
  width: 33.33%;
  float: right;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  background-color: #ffffff;
  margin-top: 10px;
`;
/* ProfilePage Component  */
function ProfilePage(props: React.PropsWithChildren<ProfilePageProps>) {
  /* ProfilePage Variables */

  const { user } = useApplicationContext();
  const [cities, setCities] = React.useState<IAddressCityResponse[]>([]);
  const [states, setStates] = React.useState<IAddressStateResponse[]>([]);
  const [name, setName] = React.useState(user.name);
  const [email, setEmail] = React.useState(user.email);
  const [cityName, setCityName] = React.useState(user.address.cityName);
  const [stateName, setStateName] = React.useState(user.address.stateName);
  const [details, setDetails] = React.useState(user.address.details);
  const [selectedCityId, setSelectedCityId] = React.useState(user.address.cityId);
  const [selectedStateId, setSelectedStateId] = React.useState(user.address.stateId);
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [hasError, setHasError] = React.useState(false);
  const { t } = useTranslation();
  const { mutation: updateUserInfosMutation } = useMutation(mutationEndPoints.updateInfos, {
    variables: {
      email,
      name,
      address: {
        cityId: selectedCityId,
        stateId: selectedStateId,
        details,
      },
    },
  });
  const { mutation: updatePasswordMutation } = useMutation(mutationEndPoints.updatePassword, {
    variables: { password, passwordConfirmation },
  });
  /* ProfilePage Callbacks */

  const handleCityChange = React.useCallback(
    e => {
      setSelectedCityId('');
      setCityName(e);
      setStateName('');
    },
    [setSelectedCityId, setCityName, setStateName],
  );
  const handleUpdateInfos = React.useCallback(
    e => {
      e.preventDefault();
      updateUserInfosMutation();
    },
    [updateUserInfosMutation],
  );
  const handleUpdatePassword = React.useCallback(
    e => {
      e.preventDefault();
      if (password === passwordConfirmation) {
        updatePasswordMutation();
        setPassword('');
        setPasswordConfirmation('');
      }
    },
    [password, passwordConfirmation, updatePasswordMutation, setPassword, setPasswordConfirmation],
  );
  /* ProfilePage Lifecycle  */
  React.useEffect(() => {
    queryEndpoints.getCities().then(citiesResponse => {
      setCities(citiesResponse);
    });
  }, []);
  React.useEffect(() => {
    if (selectedCityId) {
      queryEndpoints.getStatesByCityId({ cityId: selectedCityId }).then(statesResponse => {
        setStates(statesResponse);
      });
    }
  }, [selectedCityId]);

  return (
    <Container>
      <CategoryHorizontalListFetcher shouldUseProductsPageLink />
      <StyledProfilePageWrapper>
        <StyledInfosFormWrapper>
          <StyledInfosFormHeader>
            <h3>Bilgileri Guncelle</h3>
          </StyledInfosFormHeader>
          <StyledInfosForm>
            <StyledInfosFormElementWrapper>
              <label>Isim Soyisim : </label>
              <StyledInput hasError={false} id="myinfos-name" type="text" value={name} onChange={setName} />
            </StyledInfosFormElementWrapper>
            <StyledInfosFormElementWrapper>
              <label>Email : </label>
              <StyledInput hasError={false} id="myinfos-email" type="text" value={email} onChange={setEmail} />
            </StyledInfosFormElementWrapper>
            <StyledInfosFormElementWrapper>
              <label>Il : </label>
              <UIAutoComplete
                items={cities}
                value={cityName}
                shouldItemRender={(item, value) => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1}
                getItemValue={item => item.title}
                renderInput={
                  <StyledInput
                    hasError={hasError}
                    id="myinfos-cities"
                    value={cityName}
                    onChange={e => handleCityChange(e)}
                  />
                }
                renderItem={(item, highlighted) => (
                  // TODO: update this element
                  <div
                    key={item.id}
                    style={{ backgroundColor: highlighted ? '#eee' : 'transparent', padding: 5, cursor: 'pointer' }}
                  >
                    {item.title}
                  </div>
                )}
                onSelect={item => {
                  setCityName(item.title);
                  setSelectedCityId(item.id);
                }}
              />
            </StyledInfosFormElementWrapper>
            <StyledInfosFormElementWrapper>
              <label>Ilce : </label>
              <UIAutoComplete
                items={states}
                value={stateName}
                shouldItemRender={(item, value) => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1}
                getItemValue={item => item.title}
                renderInput={
                  <StyledInput
                    hasError={hasError}
                    disabled={!selectedCityId}
                    id="myinfos-states"
                    value={stateName}
                    onChange={setStateName}
                  />
                }
                renderItem={(item, highlighted) => (
                  // TODO: update this element
                  <div
                    key={item.id}
                    style={{ backgroundColor: highlighted ? '#eee' : 'transparent', padding: 5, cursor: 'pointer' }}
                  >
                    {item.title}
                  </div>
                )}
                onSelect={item => {
                  setStateName(item.title);
                  setSelectedStateId(item.id);
                }}
              />
            </StyledInfosFormElementWrapper>
            <StyledInfosFormElementWrapper>
              <label>Adres Detayi : </label>
              <StyledInput hasError={false} id="myinfos-details" type="text" value={details} onChange={setDetails} />
            </StyledInfosFormElementWrapper>
            <StyledInfosFormElementWrapper>
              <StyledInfosFormButton type="submit" value="Kaydet" onClick={handleUpdateInfos}>
                Kaydet
              </StyledInfosFormButton>
            </StyledInfosFormElementWrapper>
          </StyledInfosForm>
        </StyledInfosFormWrapper>
        <ObligationComponent />
        <StyledPasswordResetWrapper>
          <StyledInfosFormHeader>
            <h3>Sifre Degistir</h3>
          </StyledInfosFormHeader>
          <StyledInfosForm>
            <StyledInfosFormElementWrapper>
              <label>Yeni Sifre : </label>
              <StyledInput
                hasError={false}
                id="password-change-password"
                type="password"
                value={password}
                onChange={setPassword}
              />
            </StyledInfosFormElementWrapper>
            <StyledInfosFormElementWrapper>
              <label>Yeni Sifre(Tekrar) : </label>
              <StyledInput
                hasError={false}
                id="password-change-password-again"
                type="password"
                value={passwordConfirmation}
                onChange={setPasswordConfirmation}
              />
            </StyledInfosFormElementWrapper>
            <StyledInfosFormElementWrapper>
              <StyledInfosFormButton type="submit" value="Kaydet" onClick={handleUpdatePassword}>
                Kaydet
              </StyledInfosFormButton>
            </StyledInfosFormElementWrapper>
          </StyledInfosForm>
        </StyledPasswordResetWrapper>
      </StyledProfilePageWrapper>
    </Container>
  );
}
const PureProfilePage = React.memo(ProfilePage);

export { PureProfilePage as ProfilePage };
