import * as React from 'react';
import styled, { css } from '~/styled';
import { UIInput, UIAutoComplete, UIButtonGroup, UIButton } from '~/components/ui';
import { useQuery } from '~/services/context';
import { queryEndpoints } from '~/services/endpoints';
import { UserRole } from '~/helpers';

/*
  HeaderRegisterCard Helpers
*/
interface HeaderRegisterCardProps {}

/*
  HeaderRegisterCard Colors
*/
const HeaderRegisterCardColors = {
  white: '#fff',
  primary: '#0075ff',
  danger: '#e2574c',
  dangerDark: '#e2574c',
  primaryDark: '#0062d4',
};

/*
  HeaderRegisterCard Strings
*/
const HeaderRegisterCardStrings = {
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
};

/*
  HeaderRegisterCard Styles
*/

const StyledHeaderRegisterCardWrapper = styled.div`
  padding: 16px;
`;
const inputWrapperClassName = css`
  border: 1px solid ${HeaderRegisterCardColors.primary};
  padding: 4px;
  margin-bottom: 12px;
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

const StyledRegisterButton = styled(UIButton)<{ hasError: boolean }>`
  margin-left: auto;
  border: 1px solid ${props => (props.hasError ? HeaderRegisterCardColors.danger : HeaderRegisterCardColors.primary)};
  background-color: ${HeaderRegisterCardColors.white};
  color: ${props => (props.hasError ? HeaderRegisterCardColors.danger : HeaderRegisterCardColors.primary)};
  text-align: center;
  cursor: pointer;
  padding: 7px 12px;
  font-size: 12px;
  font-weight: 700;
  border-radius: 4px;
  :hover {
    color: ${HeaderRegisterCardColors.white};
    background-color: ${props => (props.hasError ? HeaderRegisterCardColors.danger : HeaderRegisterCardColors.primary)};
  }
  :active {
    background-color: ${props =>
      props.hasError ? HeaderRegisterCardColors.dangerDark : HeaderRegisterCardColors.primaryDark};
  }
  transition: background-color 0.3s, color 0.3s;
`;

const HeaderRegisterCard: React.SFC<HeaderRegisterCardProps> = props => {
  const [selectedCityId, setSelectedCityId] = React.useState(null);
  const { data: cities } = useQuery(queryEndpoints.getCities, { defaultValue: [] });
  const { data: statesByCityId } = useQuery(queryEndpoints.getStatesByCityId, {
    variables: { cityId: selectedCityId },
    skip: !selectedCityId,
    defaultValue: [],
  });
  const [cityAutocomplateValue, setCityAutoComplateValue] = React.useState('');
  const [stateAutocomplateValue, setStateAutoComplateValue] = React.useState('');
  const __ = (
    <StyledHeaderRegisterCardWrapper>
      <UIInput
        id="register-name-surname"
        className={inputWrapperClassName}
        placeholder={HeaderRegisterCardStrings.nameSurname}
      />
      <UIInput
        id="register-username"
        className={inputWrapperClassName}
        placeholder={HeaderRegisterCardStrings.username}
      />
      <UIInput
        id="register-password"
        type="password"
        className={inputWrapperClassName}
        placeholder={HeaderRegisterCardStrings.password}
      />
      <UIInput id="register-mail" className={inputWrapperClassName} placeholder={HeaderRegisterCardStrings.email} />
      <UIInput
        id="register-taxNumber"
        className={inputWrapperClassName}
        placeholder={HeaderRegisterCardStrings.taxNumber}
      />
      <StyledCityWrapper>
        <UIAutoComplete
          items={cities}
          value={cityAutocomplateValue}
          shouldItemRender={(item, value) => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1}
          getItemValue={item => item.title}
          renderInput={
            <UIInput
              id="register-cities"
              value={cityAutocomplateValue}
              onChange={setCityAutoComplateValue}
              className={inputWrapperClassName}
              placeholder={HeaderRegisterCardStrings.city}
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
        items={statesByCityId}
        value={stateAutocomplateValue}
        shouldItemRender={(item, value) => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1}
        getItemValue={item => item.title}
        renderInput={
          <UIInput
            disabled={!selectedCityId}
            id="register-cities"
            value={stateAutocomplateValue}
            onChange={setStateAutoComplateValue}
            className={inputWrapperClassName}
            placeholder={HeaderRegisterCardStrings.state}
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
        }}
      />
      <StyledUserTypeWrapper>
        <StyledMemberTypeSpan>{HeaderRegisterCardStrings.memberType}</StyledMemberTypeSpan>
        <UIButtonGroup<UserRole>
          size="small"
          onItemClick={id => {}}
          options={[
            {
              id: 'customer',
              text: HeaderRegisterCardStrings.customer,
            },
            {
              id: 'admin',
              text: HeaderRegisterCardStrings.admin,
            },
            {
              id: 'merchant',
              text: HeaderRegisterCardStrings.merchant,
            },
          ]}
          selectedId="admin"
        />
        <StyledRegisterButton hasError={false}>Kayit Ol</StyledRegisterButton>
      </StyledUserTypeWrapper>
    </StyledHeaderRegisterCardWrapper>
  );

  /*
  HeaderRegisterCard Lifecycle
  */

  /*
  HeaderRegisterCard Functions
  */

  return __;
};

const _HeaderRegisterCard = HeaderRegisterCard;

export { _HeaderRegisterCard as HeaderRegisterCard };
