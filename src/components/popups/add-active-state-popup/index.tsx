import * as React from 'react';
import Select from 'react-select';
import styled, { colors } from '~/styled';
import { IAddressCityResponse, IAddressStateResponse } from '~/services/helpers/backend-models';
import { UIButton } from '~/components/ui';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { usePopupContext } from '~/contexts/popup/context';
import { useApplicationContext } from '~/app/context';

/* AddActiveState Helpers */
interface AddActiveStateProps {}

/* AddActiveState Constants */

/* AddActiveState Styles */
const StyledAddActiveStateWrapper = styled.div`
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 4px;
`;
const StyledAddActiveStateHeader = styled.div`
  border-bottom: 1px solid ${colors.lightGray};
  text-align: center;
  margin-bottom: 15px;
`;
const StyledAddActiveStateFormWrapper = styled.div`
  margin-top: 10px;
`;
const StyledButton = styled(UIButton)`
display: flex;
float: right;
align-items: center;
transition: background-color 0.3s;
background-color: ${colors.primary};
color: ${colors.white};
padding: 4px 8px;
margin 3%;
border-radius: 8px;
:active {
  background-color: ${colors.primaryDark} !important;
}
:hover {
  background-color: ${colors.lightGray};
}
`;
/* AddActiveState Component  */
function AddActiveState(props: React.PropsWithChildren<AddActiveStateProps>) {
  /* AddActiveState Variables */
  const popups = usePopupContext();
  const { setUserActiveState } = useApplicationContext();
  const [cities, setCities] = React.useState<IAddressCityResponse[]>([]);
  const [states, setStates] = React.useState<IAddressStateResponse[]>([]);
  const [selectedCity, setSelectedCity] = React.useState<{ value: string; label: string }>();
  const [selectedStateIds, setSelectedStateIds] = React.useState<Array<{ value: string; label: string }>>();
  const { mutation: addActiveStateMutation } = useMutation(mutationEndPoints.addActiveStates, {
    variables: {
      stateIds: selectedStateIds ? selectedStateIds.map(state => state.value) : null,
    },
  });
  /* AddActiveState Callbacks */

  const handleSubmit = React.useCallback(
    e => {
      e.preventDefault();
      addActiveStateMutation().then(state => {
        setUserActiveState(state);
        popups.addActiveState.hide();
      });
    },
    [addActiveStateMutation, popups.addActiveState, setUserActiveState],
  );

  /* AddActiveState Lifecycle  */
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

  return (
    <StyledAddActiveStateWrapper>
      <StyledAddActiveStateHeader>
        <p>Satis Yapacaginiz Bolgeyi Ekleyin</p>
      </StyledAddActiveStateHeader>
      <StyledAddActiveStateFormWrapper>
        <label>Sehir Secin</label>
        <Select
          value={selectedCity}
          onChange={(e: { value: string; label: string }) => setSelectedCity(e)}
          options={cities.map(city => ({ value: city.id, label: city.title }))}
        />
        <label>Satis Yapacaginiz Bolgeler</label>
        <Select
          isMulti
          isSearchable
          isClearable
          isDisabled={!selectedCity}
          onChange={(e: Array<{ value: string; label: string }>) => setSelectedStateIds(e)}
          value={selectedStateIds}
          options={states.map(x => ({
            value: x.id,
            label: `${x.title}`,
          }))}
          placeholder="Secim Yapin"
        />
        <StyledButton type="button" onClick={handleSubmit}>
          Kaydet
        </StyledButton>
      </StyledAddActiveStateFormWrapper>
    </StyledAddActiveStateWrapper>
  );
}
const PureAddActiveState = React.memo(AddActiveState);

export { PureAddActiveState as AddActiveState };
