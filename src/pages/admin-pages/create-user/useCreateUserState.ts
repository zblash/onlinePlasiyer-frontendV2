import React from 'react';
import { IAddressCityResponse, IAddressStateResponse, UserRoleResponse } from '~/services/helpers/backend-models';

export default () => {
  const [cities, setCities] = React.useState<IAddressCityResponse[]>([]);
  const [states, setStates] = React.useState<IAddressStateResponse[]>([]);
  const [activeStates, setActiveStates] = React.useState<IAddressStateResponse[]>([]);
  const [hasError, setHasError] = React.useState(false);

  const [openActiveStates, setOpenActiveStates] = React.useState(false);
  const [selectedCity, setSelectedCity] = React.useState<{ value: string; label: string }>();
  const [selectedState, setSelectedState] = React.useState<{ value: string; label: string }>();
  const [selectedActiveCity, setSelectedActiveCity] = React.useState<{ value: string; label: string }>();
  const [selectedStateIds, setSelectedStateIds] = React.useState<Array<{ value: string; label: string }>>();
  const [details, setDetails] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState<UserRoleResponse>('ADMIN');
  const [taxNumber, setTaxNumber] = React.useState('');
  const [name, setName] = React.useState('');
  const [status, setStatus] = React.useState(false);

  return {
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
  };
};
