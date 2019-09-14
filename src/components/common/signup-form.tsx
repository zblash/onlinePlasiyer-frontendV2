import * as React from 'react';
import { UserRoleResponse } from '~/__types';
import { ROLE_MAP } from '~/utils/constants';
import { mutationEndPoints, queryEndpoints } from '~/services';
import { Mutation, Query } from '.';
import { isPublicRole, objectKeys } from '~/utils';
import {Modal} from "react-bootstrap";

interface IAppState {
  cityId: string;
  details: string;
  email: string;
  name: string;
  password: string;
  role: UserRoleResponse;
  stateId: string;
  taxNumber: string;
  username: string;
}
interface IAppProps {
  onSignup?: Function;
  onError?: (e: any) => void;
}

class SignUp extends React.Component<IAppProps, IAppState> {
  public constructor(props: IAppProps) {
    super(props);
    this.state = {
      cityId: '',
      details: '',
      email: '',
      name: '',
      role: 'CUSTOMER',
      stateId: '',
      taxNumber: '',
      username: '',
      password: '',
    };
  }

  public render() {
    const { onSignup, onError } = this.props;
    const { cityId, details, password, email, name, role, stateId, taxNumber, username } = this.state;

    return (
        <div>
        <Modal.Header closeButton>
            <Modal.Title className="text-dark">Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="form-group">
          <label>Name :</label>
          <input
            className="form-control"
            type="text"
            value={name}
            onChange={e => {
              this.setState({ name: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label>Username :</label>
          <input
            className="form-control"
            type="text"
            value={username}
            onChange={e => {
              this.setState({ username: e.target.value });
            }}
          />
        </div>

        <div className="form-group">
          <label>Email :</label>
          <input
            className="form-control"
            type="text"
            value={email}
            onChange={e => {
              this.setState({ email: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label>Password :</label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={e => {
              this.setState({ password: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label>Role Type :</label>
          <select className="form-control" onChange={e => this.setState({ role: e.target.value as UserRoleResponse })} defaultValue={role}>
            {objectKeys(ROLE_MAP).map(_role =>
              isPublicRole(_role) ? (
                <option value={_role} key={_role}>
                  {ROLE_MAP[_role]}
                </option>
              ) : null,
            )}
          </select>
        </div>
        <Query
          query={queryEndpoints.getCities}
          onComplated={d => {
            this.setState({ cityId: d.length > 0 ? d[0].id : null });
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
              <div className="form-group">
                  <label>City :</label>
                <select
                  className="form-control"
                  onChange={e => {
                    this.setState({ cityId: e.target.value, stateId: null });
                  }}
                >
                  {getCitiesData.map(city => (
                    <option key={city.id} value={city.id}>
                      {city.title}
                    </option>
                  ))}
                </select>
                {cityId && (
                  <Query
                    query={queryEndpoints.getStatesByCityId}
                    variables={{ cityId }}
                    onComplated={d => {
                      this.setState({ stateId: d.length > 0 ? d[0].id : null });
                    }}
                  >
                    {({ data: getState, loading: getStateLoading, error: getStateError }) => {
                      if (getStateLoading) {
                        return <div>Loading getState</div>;
                      }
                      if (getStateError) {
                        return <div>Error getState</div>;
                      }

                      return (
                          <div className="form-group">
                              <label>State :</label>
                              <select
                                  className="form-control"
                          defaultValue={getState[0].id}
                          onChange={e => {
                            this.setState({ stateId: e.target.value });
                          }}
                        >
                          {getState.map(city => (
                            <option key={city.id} value={city.id}>
                              {city.title}
                            </option>
                          ))}
                        </select>
                          </div>
                      );
                    }}
                  </Query>
                )}
              </div>
            );
          }}
        </Query>
        <div className="form-group">
          <label>Details :</label>
          <textarea
            className="form-control"
            value={details}
            onChange={e => {
              this.setState({ details: e.target.value });
            }}
          />
        </div>
         <div className="form-group">
                <label>Tax Number :</label>
                <input
                    className="form-control"
                    type="text"
                    value={taxNumber}
                    onChange={e => {
                        this.setState({ taxNumber: e.target.value });
                    }}
                />
         </div>
        <Mutation
          mutation={mutationEndPoints.signup}
          variables={{ ...this.state }}
          onError={e => {
            if (onError) {
              onError(e);
            }
          }}
          onComplated={() => {
            if (onSignup) {
              onSignup();
            }
          }}
        >
          {(signup, { loading }) => {
            if (loading) {
              return <button className="btn btn-warning" type="button">...Loading...</button>;
            }

            return (
              <button
                className="btn btn-success"
                type="button"
                disabled={
                  !cityId || !details || !password || !email || !name || !role || !stateId || !taxNumber || !username
                }
                onClick={() => {
                  signup();
                }}
              >
                Signup
              </button>
            );
          }}
        </Mutation>
      </Modal.Body>
      </div>
    );
  }
}

export default SignUp;
