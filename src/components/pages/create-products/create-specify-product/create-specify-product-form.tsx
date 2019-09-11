import * as React from 'react';
import MultiSelect from '@kenshooui/react-multi-select';
import { UNIT_TYPE_MAP } from '~/utils/constants';
import { UnitTypeResponse, AddressStateResponse } from '~/__types';
import { Query, Mutation } from '~/components/common';
import { queryEndpoints, mutationEndPoints } from '~/services';

const initialState: CreateSpecifyProductFormState = {
  contents: 0,
  quantity: 0,
  recommendedRetailPrice: 0,
  totalPrice: 0,
  unitPrice: 0,
  unitType: 'KG',
  selectedStateIds: [],
};

export default class CreateSpecifyProductForm extends React.Component<
  CreateSpecifyProductFormProps,
  CreateSpecifyProductFormState
> {
  public constructor(props: CreateSpecifyProductFormProps) {
    super(props);
    this.state = { ...initialState };
  }

  public render() {
    const {
      unitType,
      unitPrice,
      totalPrice,
      quantity,
      contents,
      recommendedRetailPrice,
      selectedStateIds,
    } = this.state;
    const { barcode } = this.props;
    const hasMutation =
      unitType &&
      unitPrice > 0 &&
      totalPrice > 0 &&
      quantity > 0 &&
      contents > 0 &&
      recommendedRetailPrice > 0 &&
      selectedStateIds.length > 0;

    return (
      <div>
        <div>
          <label>Contents</label>
          <input
            type="number"
            value={contents}
            onChange={e => {
              this.setState({ contents: parseInt(e.target.value, 10) });
            }}
          />
        </div>

        <div>
          <label>Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={e => {
              this.setState({ quantity: parseInt(e.target.value, 10) });
            }}
          />
        </div>
        <div>
          <label>Recommended Retail Price</label>
          <input
            type="number"
            value={recommendedRetailPrice}
            onChange={e => {
              this.setState({ recommendedRetailPrice: parseInt(e.target.value, 10) });
            }}
          />
        </div>

        <div>
          <label>Ilce Sec</label>
          <Query query={queryEndpoints.getAuthUserActiveStates}>
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
                    items={getState.map(state => ({
                      ...state,
                      label: `${state.title} (${state.cityTitle.toLowerCase()})`,
                    }))}
                    selectedItems={selectedStateIds}
                    onChange={selectedIds => {
                      this.setState({ selectedStateIds: selectedIds });
                    }}
                  />
                </div>
              );
            }}
          </Query>
        </div>

        <div>
          <label>Total Price</label>
          <input
            type="number"
            value={totalPrice}
            onChange={e => {
              this.setState({ totalPrice: parseInt(e.target.value, 10) });
            }}
          />
        </div>

        <div>
          <label>Unit Price</label>
          <input
            type="number"
            value={unitPrice}
            onChange={e => {
              this.setState({ unitPrice: parseInt(e.target.value, 10) });
            }}
          />
        </div>
        <div>
          <label>Unit Type</label>
          <select
            onChange={e => {
              this.setState({ unitType: e.target.value as UnitTypeResponse });
            }}
            defaultValue={unitType}
          >
            {Object.keys(UNIT_TYPE_MAP).map(_unitType => (
              <option value={_unitType} key={_unitType}>
                {UNIT_TYPE_MAP[_unitType]}
              </option>
            ))}
          </select>
        </div>
        <Mutation
          mutation={mutationEndPoints.createSpecifyProductForAuthUser}
          onComplated={() => {
            this.setState({ ...initialState, unitType });
          }}
          variables={{
            barcode,
            contents,
            quantity,
            recommendedRetailPrice,
            stateIds: selectedStateIds.map(_state => _state.id),
            totalPrice,
            unitPrice,
            unitType,
          }}
        >
          {(
            createSpecifyProductForAuthUser,
            { loading: createSpecifyProductForAuthUserLoading, error: createSpecifyProductForAuthUserError },
          ) => {
            if (createSpecifyProductForAuthUserLoading) {
              return <div>Loading createSpecifyProductForAuthUser</div>;
            }
            if (createSpecifyProductForAuthUserError) {
              return <div>Error createSpecifyProductForAuthUser</div>;
            }

            return (
              <button
                type="button"
                disabled={
                  createSpecifyProductForAuthUserLoading || createSpecifyProductForAuthUserError || !hasMutation
                }
                onClick={() => {
                  createSpecifyProductForAuthUser();
                }}
              >
                Ekle
              </button>
            );
          }}
        </Mutation>
      </div>
    );
  }
}
interface CreateSpecifyProductFormState {
  contents: number;
  quantity: number;
  recommendedRetailPrice: number;
  totalPrice: number;
  unitPrice: number;
  unitType: UnitTypeResponse;
  selectedStateIds: AddressStateResponse[];
}
interface CreateSpecifyProductFormProps {
  barcode: string;
}
