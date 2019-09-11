import * as React from 'react';
import MultiSelect from '@kenshooui/react-multi-select';
import { Query, Mutation } from '~/components/common';
import { queryEndpoints, mutationEndPoints } from '~/services';
import { AddressStateResponse } from '~/__types';

export default class AddActiveState extends React.Component<AddActiveStateProps, AddActiveStateState> {
  public constructor(props: AddActiveStateProps) {
    super(props);
    this.state = {
      selectedCityId: null,
      selectedStateIds: [],
    };
  }

  handleChange = selectedStateIds => {
    this.setState({ selectedStateIds });
  };

  public render() {
    const { selectedCityId, selectedStateIds } = this.state;

    return (
      <Query query={queryEndpoints.getAuthUserActiveStates}>
        {({
          data: getAuthUserActiveStates,
          loading: getAuthUserActiveStatesLoading,
          error: getAuthUserActiveStatesError,
        }) => {
          if (getAuthUserActiveStatesLoading) {
            return <div>Loading getAuthUserActiveStates</div>;
          }
          if (getAuthUserActiveStatesError) {
            return <div>Error getAuthUserActiveStates</div>;
          }

          return (
            <div>
              <Query
                query={queryEndpoints.getCities}
                onUpdate={d => {
                  this.setState({ selectedCityId: d.length > 0 ? d[0].id : null });
                }}
              >
                {({ data: getCitiesData, loading: getCitiesLoading, error: getCitiesError }) => {
                  if (getCitiesLoading) {
                    return <div>Loading getCities</div>;
                  }
                  if (getCitiesError) {
                    return <div>Error getCities</div>;
                  }
                  if (getCitiesData.length === 0) {
                    return <div>Sehir bulunamadi</div>;
                  }

                  return (
                    <div>
                      <select
                        defaultValue={getCitiesData[0].id}
                        onChange={e => {
                          this.setState({ selectedCityId: e.target.value, selectedStateIds: [] });
                        }}
                      >
                        {getCitiesData.map(city => (
                          <option key={city.id} value={city.id}>
                            {city.title}
                          </option>
                        ))}
                      </select>
                      {selectedCityId && (
                        <Query query={queryEndpoints.getStatesByCityId} variables={{ cityId: selectedCityId }}>
                          {({ data: getState, loading: getStateLoading, error: getStateError }) => {
                            if (getStateLoading) {
                              return <div>Loading getState</div>;
                            }
                            if (getStateError) {
                              return <div>Error getState</div>;
                            }

                            return (
                              <div>
                                <MultiSelect
                                  items={getState
                                    .filter(
                                      _state =>
                                        !getAuthUserActiveStates.find(_activeState => _activeState.id === _state.id),
                                    )
                                    .map(state => ({ ...state, label: state.title }))}
                                  selectedItems={selectedStateIds}
                                  onChange={this.handleChange}
                                />
                              </div>
                            );
                          }}
                        </Query>
                      )}
                    </div>
                  );
                }}
              </Query>
              <div>
                {getAuthUserActiveStates.length === 0 && <div>Kayit edilmis bir state bulunmuyor</div>}
                {getAuthUserActiveStates.map(_state => (
                  <span key={_state.id}>{`${_state.title} ,`}</span>
                ))}
              </div>
              <Mutation
                mutation={mutationEndPoints.addActiveStatesForAuthUser}
                variables={{ stateIds: selectedStateIds.map(_state => _state.id) }}
                refetchQueries={[{ query: queryEndpoints.getAuthUserActiveStates }]}
              >
                {(addState, { loading: addStateLoading, error: addStateError }) => {
                  if (addStateLoading) {
                    return <div>Loading addState</div>;
                  }
                  if (addStateError) {
                    return <div>Error addState</div>;
                  }

                  return (
                    <button
                      type="button"
                      disabled={addStateLoading || addStateError || selectedStateIds.length === 0}
                      onClick={() => {
                        addState().then(() => {
                          this.setState({ selectedStateIds: [] });
                        });
                      }}
                    >
                      Devam
                    </button>
                  );
                }}
              </Mutation>
            </div>
          );
        }}
      </Query>
    );
  }
}

interface AddActiveStateState {
  selectedCityId: string;
  selectedStateIds: AddressStateResponse[];
}
interface AddActiveStateProps {}
