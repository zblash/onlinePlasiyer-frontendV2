import * as React from 'react';
import Select from 'react-select';
import { useHistory } from 'react-router';
import styled, { colors, css } from '~/styled';
import { UIButton, UIInput, Container, UIButtonGroup } from '~/components/ui';
import { useAlert } from '~/utils/hooks';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { useApplicationContext } from '~/app/context';
import useCreateUserState from './useCreateUserState';
import { UserRoleResponse } from '~/services/helpers/backend-models';
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
const selectInput = css`
  margin-bottom: 10px;
`;
/* CreateUserPage Component  */
function CreateUserPage(props: React.PropsWithChildren<CreateUserPageProps>) {
  /* CreateUserPage Variables */
  const routerHistory = useHistory();
  const alertContext = useAlert();
  const applicationContext = useApplicationContext();
  const {
    cities,
    setCities,
    states,
    setStates,
    activeStates,
    setActiveStates,
    hasError,
    setHasError,
    openActiveStates,
    setOpenActiveStates,
    selectedCity,
    setSelectedCity,
    selectedState,
    setSelectedState,
    selectedActiveCity,
    setSelectedActiveCity,
    selectedStateIds,
    setSelectedStateIds,
    details,
    setDetails,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    role,
    setRole,
    taxNumber,
    setTaxNumber,
    status,
    setStatus,
    name,
    setName,
  } = useCreateUserState();
  const { mutation: createUser } = useMutation(mutationEndPoints.createUser, {
    variables: {
      cityId: selectedCity ? selectedCity.value : '',
      stateId: selectedState ? selectedState.value : '',
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
  const { mutation: addActiveState } = useMutation(mutationEndPoints.addActiveStates);
  /* CreateUserPage Callbacks */

  const handleSubmit = React.useCallback(async () => {
    applicationContext.loading.show();
    setHasError(false);
    try {
      const createdUser = await createUser();
      if (selectedStateIds) {
        await addActiveState({ stateIds: selectedStateIds.map(state => state.value), userId: createdUser.id });
      }
      alertContext.show('Kullanici basariyla eklendi', { type: 'success' });
      routerHistory.push('/users', { type: role });
    } catch (e) {
      setHasError(true);
    } finally {
      applicationContext.loading.hide();
    }
  }, [
    applicationContext.loading,
    setHasError,
    createUser,
    selectedStateIds,
    alertContext,
    routerHistory,
    role,
    addActiveState,
  ]);

  /* CreateUserPage Lifecycle  */
  React.useEffect(() => {
    queryEndpoints.getCities().then(citiesResponse => {
      setCities(citiesResponse);
    });
  }, [setCities]);
  React.useEffect(() => {
    if (selectedCity) {
      queryEndpoints.getStatesByCityId({ cityId: selectedCity.value }).then(statesResponse => {
        setStates(statesResponse);
      });
    }
  }, [selectedCity, setStates]);
  React.useEffect(() => {
    if (selectedActiveCity) {
      queryEndpoints.getStatesByCityId({ cityId: selectedActiveCity.value }).then(statesResponse => {
        setActiveStates(statesResponse);
      });
    }
  }, [selectedActiveCity, setActiveStates]);
  React.useEffect(() => {
    if (hasError) {
      setHasError(false);
      alertContext.show('Tum Alanlari Doldurdugunuzdan Emin Olun', {
        type: 'error',
      });
    }
  }, [
    email,
    username,
    name,
    taxNumber,
    selectedState,
    selectedCity,
    details,
    password,
    hasError,
    alertContext,
    setHasError,
  ]);

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
            <Select
              value={selectedCity}
              onChange={(e: { value: string; label: string }) => setSelectedCity(e)}
              options={cities.map(city => ({ value: city.id, label: city.title }))}
            />
          </StyledContentElement>
          <StyledContentElement>
            <label>Ilce</label>
            <Select
              isDisabled={!selectedCity}
              onChange={(e: { value: string; label: string }) => setSelectedState(e)}
              value={selectedState}
              options={states.map(x => ({
                value: x.id,
                label: `${x.title}`,
              }))}
              placeholder="Secim Yapin"
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
          {role === 'MERCHANT' && (
            <StyledContentElement>
              <label>Satis Yapacagi Bolgeleri Secmek Istiyor musunuz?</label>
              <input
                type="checkbox"
                onChange={e => setOpenActiveStates(e.target.checked)}
                defaultChecked={openActiveStates}
              />
            </StyledContentElement>
          )}
          {openActiveStates && (
            <StyledContentElement>
              <label>Sehir Secin</label>
              <Select
                value={selectedActiveCity}
                onChange={(e: { value: string; label: string }) => setSelectedActiveCity(e)}
                options={cities.map(city => ({ value: city.id, label: city.title }))}
              />
              <label>Satis Yapacaginiz Bolgeler</label>
              <Select
                isMulti
                className={selectInput}
                isSearchable
                isClearable
                isDisabled={!selectedActiveCity}
                onChange={(e: Array<{ value: string; label: string }>) => setSelectedStateIds(e)}
                value={selectedStateIds}
                options={activeStates.map(x => ({
                  value: x.id,
                  label: `${x.title}`,
                }))}
                placeholder="Secim Yapin"
              />
            </StyledContentElement>
          )}
          <StyledContentElement>
            <label>Onayli mi?</label>
            <input type="checkbox" onChange={e => setStatus(e.target.checked)} defaultChecked={status} />
          </StyledContentElement>
          <StyledContentElement>
            <StyledButton
              onClick={handleSubmit}
              hasError={hasError}
              disabled={
                !(email && username && name && taxNumber && selectedState && selectedCity && details && password)
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
