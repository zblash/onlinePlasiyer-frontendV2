import * as React from 'react';
import { useHistory } from 'react-router';
import styled, { css, colors } from '~/styled';
import { Container, UITable, UIIcon, UIButtonGroup } from '~/components/ui';
import { useQuery } from '~/services/query-context/context';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { UserType } from '~/services/helpers/maps';
import { UserRoleResponse } from '~/services/helpers/backend-models';

/*
  UsersPage Helpers
*/
interface UsersPageProps {}

/*
  UsersPage Colors // TODO : move theme.json
*/
const UsersPageColors = {
  white: '#fff',
  primary: '#0075ff',
  danger: '#e2574c',
};

/*
  UsersPage Strings
*/
const UsersPageStrings = {
  wichUserQuestion: 'Hangi Kullaniciyi Gormek Istersin ?',
  wichUserTypeQuestion: 'Hangi Tip Kullanicilar ?',
  merchants: 'Saticilar',
  customers: 'Musteriler',
  admin: 'Adminler',
  username: 'Kullanici Adi',
  name: 'Isim',
  email: 'Mail Adresi',
  taxNumber: 'Vergi No.',
  allUserType: 'Hepsi',
  activeUserType: 'Aktifler',
  passiveUserType: 'Pasifler',
};

/*
  UsersPage Styles
*/

const StyledUsersPageWrapper = styled.div`
  margin-top: 48px;
`;

const StyledTopFilterWrapper = styled.div`
  display: flex;
  margin-bottom: 24px;
`;
const StyledUserRoleFilterWrapper = styled.div`
  display: flex;
  margin-right: 16px;
  flex-direction: column;
  align-items: center;
  justify-conent: center;
`;

const StyledUserTypeFilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-conent: center;
`;

const StyledFilterQuestion = styled.div`
  margin-bottom: 8px;
`;

const EditingOperationsWrapper = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledUserLink = styled.a`
  color: ${colors.primary};
  cursor: pointer;
`;
const iconStyle = css`
  cursor: pointer;
`;
const UsersPage: React.SFC<UsersPageProps> = props => {
  const routerHistory = useHistory();
  const [userRole, setUserRole] = React.useState<UserRoleResponse>('CUSTOMER');
  const [type, setType] = React.useState<UserType>('all');
  const userOptions = React.useMemo(
    () => ({
      variables: { role: userRole, type },
      defaultValue: [],
    }),
    [type, userRole],
  );
  const { data: users } = useQuery(queryEndpoints.getUsers, userOptions);

  const { mutation: changeUserStatus, loading } = useMutation(mutationEndPoints.changeUserStatus);

  const __ = (
    <Container>
      <StyledUsersPageWrapper>
        <StyledTopFilterWrapper>
          <StyledUserRoleFilterWrapper>
            <StyledFilterQuestion>{UsersPageStrings.wichUserQuestion}</StyledFilterQuestion>
            <UIButtonGroup<UserRoleResponse>
              onItemClick={id => {
                if (id === 'ADMIN') {
                  setType('all');
                }
                setUserRole(id);
              }}
              options={[
                {
                  id: 'CUSTOMER',
                  text: UsersPageStrings.customers,
                },
                {
                  id: 'ADMIN',
                  text: UsersPageStrings.admin,
                },
                {
                  id: 'MERCHANT',
                  text: UsersPageStrings.merchants,
                },
              ]}
              selectedId={userRole}
            />
          </StyledUserRoleFilterWrapper>
          <StyledUserTypeFilterWrapper>
            <StyledFilterQuestion>{UsersPageStrings.wichUserQuestion}</StyledFilterQuestion>
            <UIButtonGroup<UserType>
              selectedId={type}
              options={[
                {
                  id: 'active',
                  text: UsersPageStrings.activeUserType,
                  disabled: userRole === 'ADMIN',
                },
                {
                  id: 'all',
                  text: UsersPageStrings.allUserType,
                },
                {
                  id: 'passive',
                  text: UsersPageStrings.passiveUserType,
                  disabled: userRole === 'ADMIN',
                },
              ]}
              onItemClick={id => setType(id)}
            />
          </StyledUserTypeFilterWrapper>
        </StyledTopFilterWrapper>
        <UITable
          id={`${type}${userRole}`}
          data={users}
          rowCount={12}
          columns={[
            {
              itemRenderer: item => (
                <StyledUserLink onClick={() => handleUser(item.id)}>{item.username}</StyledUserLink>
              ),
              title: UsersPageStrings.username,
            },
            {
              itemRenderer: item => item.name,
              title: UsersPageStrings.name,
            },
            {
              itemRenderer: item => item.email,
              title: UsersPageStrings.email,
            },
          ].concat(
            userRole === 'ADMIN'
              ? []
              : [
                  {
                    itemRenderer: item => item.taxNumber,
                    title: UsersPageStrings.taxNumber,
                  },
                  {
                    title: '',
                    itemRenderer: item => {
                      const iconName = item.status ? 'trash' : 'checkMark';

                      return (
                        <EditingOperationsWrapper>
                          <UIIcon
                            size={20}
                            className={iconStyle}
                            name={loading ? 'loading' : iconName}
                            color={item.status ? UsersPageColors.danger : UsersPageColors.primary}
                            onClick={e => {
                              changeUserStatus({ id: item.id, status: !item.status });
                            }}
                          />
                        </EditingOperationsWrapper>
                      );
                    },
                  },
                ],
          )}
        />
      </StyledUsersPageWrapper>
    </Container>
  );

  /*
  UsersPage Lifecycle
  */

  /*
  UsersPage Functions
  */

  const handleUser = React.useCallback(
    (id: string) => {
      routerHistory.push(`/user/${id}`);
    },
    [routerHistory],
  );

  return __;
};

const _UsersPage = UsersPage;

export { _UsersPage as UsersPage };
