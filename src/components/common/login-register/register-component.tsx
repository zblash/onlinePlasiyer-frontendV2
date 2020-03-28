import * as React from 'react';
import Select from 'react-select';
import styled, { colors } from '~/styled';
import { UIInput, UIButtonGroup, UIButton, Loading } from '~/components/ui';
import {
  IAddressCityResponse,
  IAddressStateResponse,
  UserRoleResponse,
  IExceptionResponse,
} from '~/services/helpers/backend-models';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { signup } from '~/services/api';
import { useAlert } from '~/utils/hooks';
/*
  RegisterComponent Helpers
*/
interface RegisterComponentProps {
  onSignup: Function;
}

/*
  RegisterComponent Colors // TODO : move theme.json
*/
const RegisterComponentColors = {
  white: '#fff',
  primary: '#0075ff',
  danger: '#e2574c',
  dangerDark: '#e2574c',
  unFocused: '#797979',
  primaryDark: '#0062d4',
};

/*
  RegisterComponent Strings
*/
const RegisterComponentStrings = {
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
  RegisterComponent Styles
*/

const StyledRegisterComponentWrapper = styled.div`
  padding: 16px;
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
  padding: 9px;
  border: 1px solid ${props => (props.hasError ? colors.danger : colors.primary)};
  border-radius: 4px;
  color: ${RegisterComponentColors.unFocused};
`;
const StyledSelectWrapper = styled.div`
  width: 100%;
  margin-bottom: 12px;
`;
const StyledRegisterButton = styled(UIButton)<{ hasError: boolean; disabled: boolean }>`
  line-height: 24px;
  padding: 4px;
  display: flex;
  width: 80px;
  margin-left: auto;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => (props.hasError ? colors.danger : colors.primary)};
  background-color: ${colors.white};
  color: ${props => (props.hasError ? colors.danger : colors.primary)};
  text-align: center;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  font-size: 12px;
  font-weight: 700;
  border-radius: 4px;
  opacity: ${props => (props.disabled ? 0.3 : 1)};
  :hover {
    color: ${props => (props.disabled ? colors.primary : colors.white)};
    background-color: ${props => (props.disabled ? colors.white : props.hasError ? colors.danger : colors.primary)};
  }
  :active {
    background-color: ${props => (props.hasError ? colors.dangerDark : colors.primaryDark)};
  }
  transition: background-color 0.3s, color 0.3s;
`;

const StyledErrorSpan = styled.p`
  color: ${colors.danger};
`;

const RegisterComponent: React.SFC<RegisterComponentProps> = props => {
  const alertContext = useAlert();
  const [cities, setCities] = React.useState<IAddressCityResponse[]>([]);
  const [states, setStates] = React.useState<IAddressStateResponse[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  const [selectedCity, setSelectedCity] = React.useState<{ value: string; label: string }>();
  const [selectedState, setSelectedState] = React.useState<{ value: string; label: string }>();
  const [details, setDetails] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState<UserRoleResponse>('ADMIN');
  const [taxNumber, setTaxNumber] = React.useState('');
  const [name, setName] = React.useState('');
  const [errorDetail, setErrorDetail] = React.useState<IExceptionResponse>();
  const ref = React.useRef();
  const __ = (
    <StyledRegisterComponentWrapper>
      <form
        ref={ref}
        onSubmit={e => {
          e.preventDefault();

          setLoading(true);
          setHasError(false);
          signup({
            cityId: selectedCity.value,
            stateId: selectedState.value,
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
            .catch(error => {
              setErrorDetail(error.response.data);
              setHasError(true);
            })
            .finally(() => {
              setLoading(false);
            });
        }}
      >
        {errorDetail && (
          <>
            <StyledErrorSpan>{errorDetail.message}</StyledErrorSpan>
            {errorDetail.subErrors &&
              errorDetail.subErrors.map(subError => <StyledErrorSpan>{subError.message}</StyledErrorSpan>)}
          </>
        )}
        <StyledInput
          hasError={hasError}
          id="register-name-surname"
          placeholder={RegisterComponentStrings.nameSurname}
          required
          onChange={setName}
        />
        <StyledInput
          hasError={hasError}
          id="register-username"
          placeholder={RegisterComponentStrings.username}
          required
          onChange={setUsername}
        />
        <StyledInput
          hasError={hasError}
          id="register-password"
          type="password"
          required
          placeholder={RegisterComponentStrings.password}
          onChange={setPassword}
        />
        <StyledInput
          hasError={hasError}
          id="register-mail"
          required
          type="email"
          placeholder={RegisterComponentStrings.email}
          onChange={setEmail}
        />

        <StyledInput
          hasError={hasError}
          id="register-taxNumber"
          placeholder={RegisterComponentStrings.taxNumber}
          required
          onChange={setTaxNumber}
        />
        <StyledSelectWrapper>
          <Select
            isSearchable
            isClearable
            value={selectedCity}
            onChange={(e: { value: string; label: string }) => setSelectedCity(e)}
            options={cities.map(city => ({ value: city.id, label: city.title }))}
            placeholder="Ilinizi Secin"
          />
        </StyledSelectWrapper>
        <StyledSelectWrapper>
          <Select
            isSearchable
            isClearable
            isDisabled={!selectedCity}
            onChange={(e: { value: string; label: string }) => setSelectedState(e)}
            value={selectedState}
            options={states.map(x => ({
              value: x.id,
              label: `${x.title}`,
            }))}
            placeholder="Ilcenizi Secin"
          />
        </StyledSelectWrapper>
        <StyledInput
          hasError={hasError}
          id="register-address-details"
          placeholder={RegisterComponentStrings.details}
          onChange={setDetails}
        />
        <StyledUserTypeWrapper>
          <StyledMemberTypeSpan>{RegisterComponentStrings.memberType}</StyledMemberTypeSpan>
          <UIButtonGroup<UserRoleResponse>
            size="small"
            onItemClick={id => setRole(id)}
            options={[
              {
                id: 'CUSTOMER',
                text: RegisterComponentStrings.customer,
              },
              {
                id: 'ADMIN',
                text: RegisterComponentStrings.admin,
              },
              {
                id: 'MERCHANT',
                text: RegisterComponentStrings.merchant,
              },
            ]}
            selectedId={role}
          />
          <StyledRegisterButton
            type="submit"
            hasError={hasError}
            disabled={!(email && username && name && taxNumber && selectedState && selectedCity && details && password)}
          >
            {loading ? <Loading color="currentColor" size={24} /> : RegisterComponentStrings.register}
          </StyledRegisterButton>
        </StyledUserTypeWrapper>
      </form>
    </StyledRegisterComponentWrapper>
  );

  /*
  RegisterComponent Lifecycle
  */
  React.useEffect(() => {
    queryEndpoints.getCities().then(citiesResponse => {
      setCities(citiesResponse);
    });
  }, []);
  React.useEffect(() => {
    if (selectedCity) {
      queryEndpoints.getStatesByCityId({ cityId: selectedCity.value }).then(statesResponse => {
        setStates(statesResponse);
      });
    }
  }, [selectedCity]);

  React.useEffect(() => {
    if (hasError) {
      setHasError(false);
      alertContext.show('Tum Alanlari Dogru Sekilde Doldurdugunuzdan Emin Olun', {
        type: 'error',
      });
    }
  }, [email, username, name, taxNumber, selectedState, selectedCity, details, password, hasError, alertContext]);
  /*
  RegisterComponent Functions
  */

  return __;
};

const _RegisterComponent = RegisterComponent;

export { _RegisterComponent as RegisterComponent };
