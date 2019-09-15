import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { UserRoleResponse } from '~/__types';
import { Query, Mutation } from '~/components/common';
import { Img } from '~/components/ui';
import { NONE_IMAGE_SRC } from '~/utils/constants';
import { queryEndpoints, mutationEndPoints } from '~/services';
import { isBarcodeCorrectSize } from '~/utils';
import { refetchFactory } from '~/services/endpoints/query-endpoints';

interface IReducerState {
  categoryId: string;
  name: string;
  status?: boolean;
  tax: number;
  uploadfile: File;
}

type ReducerAction =
  | {
      type: 'set-category-id' | 'set-name' | 'set-tax';
      payload: string;
    }
  | {
      type: 'set-status';
      payload: boolean;
    }
  | {
      type: 'set-file';
      payload: File;
    };

const reducer: React.Reducer<IReducerState, ReducerAction> = (state, action) => {
  switch (action.type) {
    case 'set-category-id':
      return { ...state, categoryId: action.payload };
    case 'set-file':
      return { ...state, uploadfile: action.payload };
    case 'set-name':
      return { ...state, name: action.payload };
    case 'set-status':
      return { ...state, status: action.payload };
    case 'set-tax':
      return { ...state, tax: parseInt(action.payload, 10) };
    default:
      return state;
  }
};
const initialVars: IReducerState = {
  categoryId: null,
  name: null,
  tax: null,
  uploadfile: null,
};
const CreateProductByRole: React.SFC<CreateProductByRoleProps> = props => {
  const { role, barcode, history } = props;
  const [state, dispatch] = React.useReducer(reducer, initialVars);
  const [photoSrc, setPhotoSrc] = React.useState(NONE_IMAGE_SRC);

  if (!isBarcodeCorrectSize(barcode)) {
    return <Redirect to="/products/create/" />;
  }

  return (
      <div className="container">
          <div className="form_box">
              <div className="form-group">
        <label>Ismini Girin</label>
        <input
          className="form-control"
          type="text"
          onChange={e => {
            dispatch({ type: 'set-name', payload: e.target.value });
          }}
        />
      </div>
      <Query
        query={queryEndpoints.getCategories}
        onComplated={d => {
          if (d.length > 0) {
            dispatch({ type: 'set-category-id', payload: d[0].id });
          }
        }}
      >
        {({ data, loading, error }) => {
          if (loading) {
            return (
                <div className="form-group">
                    <label>Kategoriyi Secin</label>
              <select className="form-control">
                <option>Loading</option>
              </select>
                </div>
            );
          }
          if (error) {
            return <p>Categoriler cekemedik</p>;
          }

          return (
              <div className="form-group">
                  <label>Kategoriyi Secin</label>
            <select
              className="form-control"
              defaultValue={data[0].id}
              onChange={e => {
                dispatch({ type: 'set-category-id', payload: e.target.value });
              }}
            >
              {data.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
              </div>
          );
        }}
      </Query>
      {role === 'ADMIN' && (
        <div className="form-group form-check">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={e => {
              dispatch({ type: 'set-status', payload: e.target.checked });
            }}
          />
           <label className="form-check-label">Onayli mi? : </label>
        </div>
      )}
      <div className="form-group">
        <label>Vergi Oranini Girin</label>
        <input
          className="form-control"
          type="number"
          onChange={e => {
            dispatch({ type: 'set-tax', payload: e.target.value });
          }}
        />
      </div>
      <div className="form-group">
        <Img src={photoSrc} alt="Product image" extraClassName="w-10 h-10" zoomable />
        <input
          className="form-control-file"
          type="file"
          onChange={event => {
            if (event.target.files && event.target.files[0]) {
              const file = event.target.files[0];
              const reader = new FileReader();
              reader.onload = e => {
                // @ts-ignore
                setPhotoSrc(e.target.result as string);
                dispatch({ type: 'set-file', payload: file });
              };
              reader.readAsDataURL(file);
            }
          }}
        />
      </div>
      <Mutation
        mutation={mutationEndPoints.createProduct}
        onComplated={() => {
          if (role === 'ADMIN') {
            history.replace('/products/create');
          }
        }}
        variables={{
          barcode,
          ...state,
        }}
        refetchQueries={[refetchFactory(queryEndpoints.getAllProductsByCategoryId, { categoryId: state.categoryId })]}
      >
        {(create, { loading }) => {
          if (loading) {
            return <p>Loading</p>;
          }

          return (
            <button
              className="btn btn-dark ds"
              type="button"
              disabled={
                !(
                  state.categoryId &&
                  state.name &&
                  state.name.length > 5 &&
                  typeof state.tax === 'number' &&
                  state.uploadfile
                )
              }
              onClick={() => {
                create();
              }}
            >
              Olustur
            </button>
          );
        }}
      </Mutation>
    </div>
    </div>
  );
};
interface CreateProductByRoleProps {
  role: UserRoleResponse;
  barcode: string;
  history: RouteComponentProps<any>['history'];
}

export default CreateProductByRole;
