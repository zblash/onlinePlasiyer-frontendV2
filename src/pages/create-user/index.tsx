import * as React from 'react';
import { useHistory } from 'react-router';
import styled, { colors } from '~/styled';
import { UIButton, UIInput, Container, UIAutoComplete, UIButtonGroup } from '~/components/ui';
import { useAlert } from '~/utils/hooks';
import { IAddressCityResponse, IAddressStateResponse, UserRoleResponse } from '~/services/helpers/backend-models';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { useApplicationContext } from '~/app/context';

/* CreateUserPage Helpers */
interface CreateUserPageProps {}

/* CreateUserPage Constants */

/* CreateUserPage Styles */
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
const StyledPageContent = styled.div`
  width: 100%;
`;
const StyledContentElement = styled.div``;
const StyledInput = styled(UIInput)<{ hasError: boolean }>`
  width: 99%;
  padding-left: 1%;
  height: 35px;
  margin-bottom: 10px;
  border: 2px solid ${props => (props.hasError ? colors.danger : colors.lightGray)};
`;
const StyledButton = styled(UIButton)<{ hasError: boolean; disabled: boolean }>`
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
`;

/* CreateUserPage Component  */
function CreateUserPage(props: React.PropsWithChildren<CreateUserPageProps>) {
  /* CreateUserPage Variables */
  const routerHistory = useHistory();
  const alertContext = useAlert();
  const applicationContext = useApplicationContext();
  const [cities, setCities] = React.useState<IAddressCityResponse[]>([]);
  const [states, setStates] = React.useState<IAddressStateResponse[]>([]);
  const [stateAutocomplateValue, setStateAutoComplateValue] = React.useState('');
  const [cityAutocomplateValue, setCityAutoComplateValue] = React.useState('');
  const [hasError, setHasError] = React.useState(false);

  const [selectedCityId, setSelectedCityId] = React.useState(null);
  const [selectedStateId, setSelectedStateId] = React.useState(null);
  const [details, setDetails] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState<UserRoleResponse>('ADMIN');
  const [taxNumber, setTaxNumber] = React.useState('');
  const [name, setName] = React.useState('');
  const [status, setStatus] = React.useState(false);
  const { mutation: createUser } = useMutation(mutationEndPoints.createUser, {
    variables: {
      cityId: selectedCityId,
      stateId: selectedStateId,
      details,
      email,
      name,
      password,
      roleType: role,
      taxNumber,
      username,
      status,
    },
  });
  /* CreateUserPage Callbacks */

  const handleSubmit = React.useCallback(() => {
    applicationContext.loading.show();
    setHasError(false);
    createUser()
      .then(() => {
        alertContext.show('Uye Basariyla Eklendi', {
          type: 'success',
        });
        routerHistory.push('/users');
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        applicationContext.loading.hide();
      });
  }, [alertContext, createUser, applicationContext, routerHistory]);

  /* CreateUserPage Lifecycle  */
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

  React.useEffect(() => {
    if (hasError) {
      setHasError(false);
      alertContext.show('Tum Alanlari Doldurdugunuzdan Emin Olun', {
        type: 'error',
      });
    }
  }, [email, username, name, taxNumber, selectedStateId, selectedCityId, details, password, hasError, alertContext]);

  return (
    <Container>
      <StyledPageWrapper>
        <StyledPageHeader>
          <h3>Kullanici Ekle</h3>
        </StyledPageHeader>
        <StyledPageContent>
          <StyledContentElement>
            <label>Isim Soyisim</label>
            <StyledInput hasError={hasError} id="create-user-name-surname" onChange={setName} />
          </StyledContentElement>
          <StyledContentElement>
            <label>Kullanici Adi</label>
            <StyledInput hasError={hasError} id="create-user-username" onChange={setUsername} />
          </StyledContentElement>
          <StyledContentElement>
            <label>Kullanici Sifresi</label>
            <StyledInput hasError={hasError} id="create-user-password" type="text" onChange={setPassword} />
          </StyledContentElement>
          <StyledContentElement>
            <label>E-mail Adresi</label>
            <StyledInput hasError={hasError} id="create-user-mail" onChange={setEmail} />
          </StyledContentElement>
          <StyledContentElement>
            <label>Vergi Numarasi</label>
            <StyledInput hasError={hasError} id="create-user-taxNumber" onChange={setTaxNumber} />
          </StyledContentElement>

          <StyledContentElement>
            <label>Sehir</label>
            <UIAutoComplete
              items={cities}
              value={cityAutocomplateValue}
              shouldItemRender={(item, value) => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1}
              getItemValue={item => item.title}
              renderInput={
                <StyledInput
                  hasError={hasError}
                  id="create-user-cities"
                  value={cityAutocomplateValue}
                  onChange={setCityAutoComplateValue}
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
                setCityAutoComplateValue(item.title);
                setSelectedCityId(item.id);
              }}
            />
          </StyledContentElement>
          <StyledContentElement>
            <label>Ilce</label>
            <UIAutoComplete
              items={states}
              value={stateAutocomplateValue}
              shouldItemRender={(item, value) => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1}
              getItemValue={item => item.title}
              renderInput={
                <StyledInput
                  hasError={hasError}
                  disabled={!selectedCityId}
                  id="create-user-states"
                  value={stateAutocomplateValue}
                  onChange={setStateAutoComplateValue}
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
                setStateAutoComplateValue(item.title);
                setSelectedStateId(item.id);
              }}
            />
          </StyledContentElement>
          <StyledContentElement>
            <label>Adres Detaylari</label>
            <StyledInput hasError={hasError} id="create-user-address-details" onChange={setDetails} />
          </StyledContentElement>
          <StyledContentElement>
            <label>Uyelik Tipi</label>
            <UIButtonGroup<UserRoleResponse>
              size="small"
              onItemClick={id => setRole(id)}
              options={[
                {
                  id: 'CUSTOMER',
                  text: 'Musteri',
                },
                {
                  id: 'ADMIN',
                  text: 'Yonetici',
                },
                {
                  id: 'MERCHANT',
                  text: 'Satici',
                },
              ]}
              selectedId={role}
            />
          </StyledContentElement>
          <StyledContentElement>
            <label>Onayli mi?</label>
            <input type="checkbox" onChange={e => setStatus(e.target.checked)} defaultChecked={status} />
          </StyledContentElement>
          <StyledContentElement>
            <StyledButton
              onClick={handleSubmit}
              hasError={hasError}
              disabled={
                !(email && username && name && taxNumber && selectedStateId && selectedCityId && details && password)
              }
            >
              Ekle
            </StyledButton>
          </StyledContentElement>
        </StyledPageContent>
      </StyledPageWrapper>
    </Container>
  );
}
const PureCreateUserPage = React.memo(CreateUserPage);

export { PureCreateUserPage as CreateUserPage };
