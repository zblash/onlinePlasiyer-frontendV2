import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Query } from '~/components/common';
import { UserType } from '~/backend-model-helpers';
import { userTypeMap } from '~/utils/constants';
import { queryEndpoints } from '~/services';

const Users: React.SFC<UsersProps> = () => {
  const [userType, setUserType] = React.useState<UserType>('merchants-all');

  return (
    <div>
      <select onChange={e => setUserType(e.target.value as UserType)} defaultValue={userType}>
        {Object.keys(userTypeMap).map(_userType => {
          return (
            <option value={_userType} key={_userType}>
              {userTypeMap[_userType]}
            </option>
          );
        })}
      </select>
      <Query query={queryEndpoints.getUsers} variables={{ type: userType }}>
        {({ data, loading, error }) => {
          if (loading) {
            return <div>loading users</div>;
          }
          if (error) {
            return <div>error users</div>;
          }

          return (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Kullanici Adi</th>
                    <th>Isim</th>
                    <th>E-mail</th>
                    <th>Vergi No.</th>
                    <th>Islemler</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(user => {
                    return (
                      <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.taxNumber}</td>
                        <td>
                          {/* <Mutation
                            mutation={services.changeUserStatus}
                            variables={{
                              id: user.id,
                              status: !user.status,
                            }}
                          >
                            {changeStatus => (
                              <button
                                type="button"
                                onClick={() => {
                                  changeStatus();
                                }}
                              >
                                {user.status ? 'Engelle' : 'Onayla'}
                              </button>
                            )}
                          </Mutation> */}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          );
        }}
      </Query>
    </div>
  );
};
type UsersProps = {} & RouteComponentProps;

export default Users;
