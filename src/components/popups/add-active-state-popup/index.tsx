import * as React from 'react';
import styled, { colors } from '~/styled';
import { IAddressCityResponse, IAddressStateResponse } from '~/services/helpers/backend-models';
import { UIAutoComplete, UIInput, UIButton } from '~/components/ui';
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
const StyledInput = styled(UIInput)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 4px;
  border: 1px solid ${colors.lightGray};
  border-radius: 4px;
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
  const [stateAutocomplateValue, setStateAutoComplateValue] = React.useState('');
  const [cityAutocomplateValue, setCityAutoComplateValue] = React.useState('');

  const [selectedCityId, setSelectedCityId] = React.useState(null);
  const [selectedStateId, setSelectedStateId] = React.useState(null);
  const { mutation: addActiveStateMutation } = useMutation(mutationEndPoints.addActiveStates, {
    variables: {
      stateIds: [selectedStateId],
    },
  });
  /* AddActiveState Callbacks */

  const handleSubmit = React.useCallback(
    e => {
      e.preventDefault();
      addActiveStateMutation();
      popups.addActiveState.hide();
      setUserActiveState(selectedStateId);
    },
    [addActiveStateMutation, popups.addActiveState, selectedStateId, setUserActiveState],
  );

  /* AddActiveState Lifecycle  */
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
    <StyledAddActiveStateWrapper>
      <StyledAddActiveStateHeader>
        <p>Satis Yapacaginiz Bolgeyi Ekleyin</p>
      </StyledAddActiveStateHeader>
      <StyledAddActiveStateFormWrapper>
        <UIAutoComplete
          items={cities}
          value={cityAutocomplateValue}
          shouldItemRender={(item, value) => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1}
          getItemValue={item => item.title}
          renderInput={
            <StyledInput
              id="activeState-cities"
              value={cityAutocomplateValue}
              onChange={setCityAutoComplateValue}
              placeholder="Sehir Secin"
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
        <UIAutoComplete
          items={states}
          value={stateAutocomplateValue}
          shouldItemRender={(item, value) => item.title.toLowerCase().indexOf(value.toLowerCase()) > -1}
          getItemValue={item => item.title}
          renderInput={
            <StyledInput
              disabled={!selectedCityId}
              id="activeState-states"
              value={stateAutocomplateValue}
              onChange={setStateAutoComplateValue}
              placeholder="Ilce Secin"
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
        <StyledButton type="button" onClick={handleSubmit}>
          Kaydet
        </StyledButton>
      </StyledAddActiveStateFormWrapper>
    </StyledAddActiveStateWrapper>
  );
}
const PureAddActiveState = React.memo(AddActiveState);

export { PureAddActiveState as AddActiveState };
