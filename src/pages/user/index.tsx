import * as React from 'react';
import { useParams } from 'react-router';
import styled, { colors } from '~/styled';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { UIButton, UIInput, Container, UIAutoComplete, UILink } from '~/components/ui';
import { IAddressCityResponse, IAddressStateResponse } from '~/services/helpers/backend-models';
import { ObligationComponent } from '~/components/common/obligation';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';

/* UserPage Helpers */
interface UserPageProps {}
interface RouteParams {
  userId: string;
}
/* UserPage Constants */

/* UserPage Styles */
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
  align-items: center;
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
const StyledInput = styled(UIInput)`
  width: 100%;
  border: 2px solid ${colors.lightGray};
  border-radius: 5px;
  height: 35px;
  border: 2px solid ${colors.lightGray};
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
const StyledDetailMenu = styled.div`
  width: 33.33%;
  float: right;
  text-align: center;
  padding-bottom: 10px;
  border: 1px solid ${colors.lightGray};
  background-color: ${colors.white};
  border-radius: 8px;
  margin-top: 25px;
`;
const StyledDetailMenuHeader = styled.h3`
  color: ${colors.darkGray};
  border-bottom: 1px solid ${colors.lightGray};
  padding-bottom: 15px;
  margin-bottom: 0;
`;
const StyledDetailMenuElementWrapper = styled.div`
  text-align: start;
  padding: 10px 0 10px 3%;
  border-bottom: 1px solid ${colors.lightGray};
`;
const StyledDetailMenuElement = styled(UILink)`
  color: ${colors.primaryDark};
  cursor: pointer;
`;

/* UserPage Component  */
function UserPage(props: React.PropsWithChildren<UserPageProps>) {
  /* UserPage Variables */
  const { userId } = useParams<RouteParams>();
  const { data: user, loading: userLoading } = useQuery(queryEndpoints.getUserInfosForAdmin, {
    defaultValue: {},
    variables: { id: userId },
  });
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [cityName, setCityName] = React.useState('');
  const [stateName, setStateName] = React.useState('');
  const [details, setDetails] = React.useState('');
  const [cities, setCities] = React.useState<IAddressCityResponse[]>([]);
  const [states, setStates] = React.useState<IAddressStateResponse[]>([]);
  const [selectedCityId, setSelectedCityId] = React.useState('');
  const [selectedStateId, setSelectedStateId] = React.useState('');
  const { mutation: updateUserInfosMutation } = useMutation(mutationEndPoints.updateInfos, {
    variables: {
      id: user.id,
      email,
      name,
      address: {
        cityId: selectedCityId,
        stateId: selectedStateId,
        details,
      },
    },
  });
  /* UserPage Callbacks */
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

  /* UserPage Lifecycle  */
  React.useEffect(() => {
    if (!userLoading && user) {
      setName(user.name);
      setEmail(user.email);
      setCityName(user.address.cityName);
      setStateName(user.address.stateName);
      setDetails(user.address.details);
      setSelectedCityId(user.address.cityId);
      setSelectedStateId(user.address.stateId);
    }
  }, [user, userLoading]);
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
      <StyledProfilePageWrapper>
        <ObligationComponent userId={user.id} />
        <StyledInfosFormWrapper>
          <StyledInfosFormHeader>
            <h3>Bilgileri Guncelle</h3>
          </StyledInfosFormHeader>
          <StyledInfosForm>
            <StyledInfosFormElementWrapper>
              <label>Isim Soyisim : </label>
              <StyledInput id="myinfos-name" type="text" value={name} onChange={setName} />
            </StyledInfosFormElementWrapper>
            <StyledInfosFormElementWrapper>
              <label>Email : </label>
              <StyledInput id="myinfos-email" type="text" value={email} onChange={setEmail} />
            </StyledInfosFormElementWrapper>
            <StyledInfosFormElementWrapper>
              <label>Il : </label>
              <UIAutoComplete
                items={cities}
                value={cityName}
                shouldItemRender={(item, value) => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1}
                getItemValue={item => item.title}
                renderInput={<StyledInput id="myinfos-cities" value={cityName} onChange={e => handleCityChange(e)} />}
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
              <StyledInput id="myinfos-details" type="text" value={details} onChange={setDetails} />
            </StyledInfosFormElementWrapper>
            <StyledInfosFormElementWrapper>
              <StyledInfosFormButton type="submit" value="Kaydet" onClick={handleUpdateInfos}>
                Kaydet
              </StyledInfosFormButton>
            </StyledInfosFormElementWrapper>
          </StyledInfosForm>
        </StyledInfosFormWrapper>
        <StyledDetailMenu>
          <StyledDetailMenuHeader>Detaylar</StyledDetailMenuHeader>
          {user.role === 'MERCHANT' && (
            <StyledDetailMenuElementWrapper>
              <StyledDetailMenuElement to={`/product-specifies/${user.id}`}>Urunlerini Gor</StyledDetailMenuElement>
            </StyledDetailMenuElementWrapper>
          )}
          <StyledDetailMenuElementWrapper>
            <StyledDetailMenuElement to={`/orders/${user.id}`}>Siparislerini Gor</StyledDetailMenuElement>
          </StyledDetailMenuElementWrapper>
          <StyledDetailMenuElementWrapper>
            <StyledDetailMenuElement to={`/invoices/${user.id}`}>Faturalarini Gor</StyledDetailMenuElement>
          </StyledDetailMenuElementWrapper>
        </StyledDetailMenu>
      </StyledProfilePageWrapper>
    </Container>
  );
}
const PureUserPage = React.memo(UserPage);

export { PureUserPage as UserPage };
