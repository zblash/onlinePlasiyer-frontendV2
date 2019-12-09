import * as React from 'react';
import styled from '~/styled';
import { UIInput, UIAutoComplete, UIButtonGroup, UIButton, Loading } from '~/components/ui';
import { IAddressCityResponse, IAddressStateResponse, UserRoleResponse } from '~/services/helpers/backend-models';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { signup } from '~/services/api';
import { useAlert } from '~/utils/hooks';
/*
  RegisterPage Helpers
*/
interface RegisterPageProps {
  onSignup: Function;
}

/*
  RegisterPage Colors // TODO : move theme.json
*/
const RegisterPageColors = {
  white: '#fff',
  primary: '#0075ff',
  danger: '#e2574c',
  dangerDark: '#e2574c',
  unFocused: '#797979',
  primaryDark: '#0062d4',
};

/*
  RegisterPage Strings
*/
const RegisterPageStrings = {
  username: 'Kullanici Adi',
  nameSurname: 'Isim Soyisim',
  password: 'Sifre',
  email: 'Mail Adresi',
  taxNumber: 'Vergi Numarasi',
  city: 'Sehiriniz',
  state: 'Ilceniz',
  merchant: 'Satici',
  customer: 'Musteri',
  admin: 'Admin',
  memberType: 'Uyelik Tipi :',
  register: 'Kayit Ol',
  details: 'Adres Detayi',
};

/*
  RegisterPage Styles
*/

const StyledRegisterPageWrapper = styled.div`
  padding: 16px;
`;
const StyledCityWrapper = styled.div`
  display: inline-block;
  margin-right: 8px;
`;
const StyledUserTypeWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledMemberTypeSpan = styled.span`
  margin-right: 8px;
`;
const StyledInput = styled(UIInput)<{ hasError: boolean }>`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 4px;
  border: 1px solid ${props => (props.hasError ? RegisterPageColors.danger : RegisterPageColors.primary)};
  border-radius: 4px;
  color: ${RegisterPageColors.unFocused};
`;
const StyledRegisterButton = styled(UIButton)<{ hasError: boolean; disabled: boolean }>`
  line-height: 24px;
  padding: 4px;
  display: flex;
  width: 80px;
  margin-left: auto;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => (props.hasError ? RegisterPageColors.danger : RegisterPageColors.primary)};
  background-color: ${RegisterPageColors.white};
  color: ${props => (props.hasError ? RegisterPageColors.danger : RegisterPageColors.primary)};
  text-align: center;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  font-size: 12px;
  font-weight: 700;
  border-radius: 4px;
  opacity: ${props => (props.disabled ? 0.3 : 1)};
  :hover {
    color: ${props => (props.disabled ? RegisterPageColors.primary : RegisterPageColors.white)};
    background-color: ${props =>
      props.disabled
        ? RegisterPageColors.white
        : props.hasError
        ? RegisterPageColors.danger
        : RegisterPageColors.primary};
  }
  :active {
    background-color: ${props => (props.hasError ? RegisterPageColors.dangerDark : RegisterPageColors.primaryDark)};
  }
  transition: background-color 0.3s, color 0.3s;
`;

const RegisterPage: React.SFC<RegisterPageProps> = props => {
  const alertContext = useAlert();
  const [cities, setCities] = React.useState<IAddressCityResponse[]>([]);
  const [states, setStates] = React.useState<IAddressStateResponse[]>([]);
  const [stateAutocomplateValue, setStateAutoComplateValue] = React.useState('');
  const [cityAutocomplateValue, setCityAutoComplateValue] = React.useState('');
  const [loading, setLoading] = React.useState(false);
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

  const __ = (
    <StyledRegisterPageWrapper>
      <StyledInput
        hasError={hasError}
        id="register-name-surname"
        placeholder={RegisterPageStrings.nameSurname}
        onChange={setName}
      />
      <StyledInput
        hasError={hasError}
        id="register-username"
        placeholder={RegisterPageStrings.username}
        onChange={setUsername}
      />
      <StyledInput
        hasError={hasError}
        id="register-password"
        type="password"
        placeholder={RegisterPageStrings.password}
        onChange={setPassword}
      />
      <StyledInput hasError={hasError} id="register-mail" placeholder={RegisterPageStrings.email} onChange={setEmail} />
      <StyledInput
        hasError={hasError}
        id="register-taxNumber"
        placeholder={RegisterPageStrings.taxNumber}
        onChange={setTaxNumber}
      />
      <StyledCityWrapper>
        <UIAutoComplete
          items={cities}
          value={cityAutocomplateValue}
          shouldItemRender={(item, value) => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1}
          getItemValue={item => item.title}
          renderInput={
            <StyledInput
              hasError={hasError}
              id="register-cities"
              value={cityAutocomplateValue}
              onChange={setCityAutoComplateValue}
              placeholder={RegisterPageStrings.city}
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
      </StyledCityWrapper>
      <UIAutoComplete
        items={states}
        value={stateAutocomplateValue}
        shouldItemRender={(item, value) => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1}
        getItemValue={item => item.title}
        renderInput={
          <StyledInput
            hasError={hasError}
            disabled={!selectedCityId}
            id="register-states"
            value={stateAutocomplateValue}
            onChange={setStateAutoComplateValue}
            placeholder={RegisterPageStrings.state}
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
      <StyledInput
        hasError={hasError}
        id="register-address-details"
        placeholder={RegisterPageStrings.details}
        onChange={setDetails}
      />
      <StyledUserTypeWrapper>
        <StyledMemberTypeSpan>{RegisterPageStrings.memberType}</StyledMemberTypeSpan>
        <UIButtonGroup<UserRoleResponse>
          size="small"
          onItemClick={id => setRole(id)}
          options={[
            {
              id: 'CUSTOMER',
              text: RegisterPageStrings.customer,
            },
            {
              id: 'ADMIN',
              text: RegisterPageStrings.admin,
            },
            {
              id: 'MERCHANT',
              text: RegisterPageStrings.merchant,
            },
          ]}
          selectedId={role}
        />
        <StyledRegisterButton
          hasError={hasError}
          disabled={
            !(email && username && name && taxNumber && selectedStateId && selectedCityId && details && password)
          }
          onClick={() => {
            setLoading(true);
            setHasError(false);
            signup({
              cityId: selectedCityId,
              stateId: selectedStateId,
              details,
              email,
              name,
              password,
              role,
              taxNumber,
              username,
            })
              .then(() => {
                alertContext.show('Uyelik Talebinizi Aldik, Yetkili Onayindan Sonra Hesabiniza Giris Yapabilirsiniz', {
                  type: 'success',
                });
                props.onSignup();
              })
              .catch(() => {
                setHasError(true);
              })
              .finally(() => {
                setLoading(false);
              });
          }}
        >
          {loading ? <Loading color="currentColor" size={24} /> : RegisterPageStrings.register}
        </StyledRegisterButton>
      </StyledUserTypeWrapper>
    </StyledRegisterPageWrapper>
  );

  /*
  RegisterPage Lifecycle
  */
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
      alertContext.show('Tum Alanlari Dogru Sekilde Doldurdugunuzdan Emin Olun', {
        type: 'error',
      });
    }
  }, [email, username, name, taxNumber, selectedStateId, selectedCityId, details, password, hasError, alertContext]);
  /*
  RegisterPage Functions
  */

  return __;
};

const _RegisterPage = RegisterPage;

export { _RegisterPage as RegisterPage };
