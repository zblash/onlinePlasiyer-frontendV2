import * as React from 'react';
import { UNIT_TYPE_MAP, UNIT_TYPES_ARRAY } from '~/utils/constants';
import { UnitTypeResponse } from '~/__types';

export default class CreateSpecifyProductForm extends React.Component<
  CreateSpecifyProductFormProps,
  CreateSpecifyProductFormState
> {
  public constructor(props: CreateSpecifyProductFormProps) {
    super(props);
    this.state = {
      contents: null,
      quantity: null,
      recommendedRetailPrice: null,
      totalPrice: null,
      unitPrice: null,
      unitType: 'KG',
      selectedStateIds: [],
    };
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

    return (
      <div>
        <div>
          <label>Contents</label>
          <input
            type="number"
            onChange={e => {
              this.setState({ contents: parseInt(e.target.value, 10) });
            }}
          />
        </div>

        <div>
          <label>Quantity</label>
          <input
            type="number"
            onChange={e => {
              this.setState({ quantity: parseInt(e.target.value, 10) });
            }}
          />
        </div>
        <div>
          <label>Recommended Retail Price</label>
          <input
            type="number"
            onChange={e => {
              this.setState({ recommendedRetailPrice: parseInt(e.target.value, 10) });
            }}
          />
        </div>

        {/* state list*/}

        <div>
          <label>Total Price</label>
          <input
            type="number"
            onChange={e => {
              this.setState({ totalPrice: parseInt(e.target.value, 10) });
            }}
          />
        </div>

        <div>
          <label>Unit Price</label>
          <input
            type="number"
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
            {UNIT_TYPES_ARRAY.map(_unitType => (
              <option value={_unitType} key={_unitType}>
                {UNIT_TYPE_MAP[_unitType]}
              </option>
            ))}
          </select>
        </div>
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
  selectedStateIds: string[];
}
interface CreateSpecifyProductFormProps {}
