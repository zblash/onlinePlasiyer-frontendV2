import * as React from 'react';
import styled, { css } from '~/styled';
import { Container, UITable, UIIcon, UIButtonGroup } from '~/components/ui';
import { useQuery } from '~/services/query-context/context';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { UserRole, UserType } from '~/services/helpers/maps';

/*
  UsersPage Helpers
*/
interface UsersPageProps {}

/*
  UsersPage Colors
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
const iconStyle = css`
  cursor: pointer;
`;
const UsersPage: React.SFC<UsersPageProps> = props => {
  const [userRole, setUserRole] = React.useState<UserRole>('customer');
  const [type, setType] = React.useState<UserType>('all');
  const { data: users } = useQuery(queryEndpoints.getUsers, {
    variables: { role: userRole, type },
    defaultValue: [],
  });

  const { mutation: changeUserStatus, loading } = useMutation(mutationEndPoints.changeUserStatus);

  const __ = (
    <StyledUsersPageWrapper>
      <Container>
        <StyledTopFilterWrapper>
          <StyledUserRoleFilterWrapper>
            <StyledFilterQuestion>{UsersPageStrings.wichUserQuestion}</StyledFilterQuestion>
            <UIButtonGroup<UserRole>
              onItemClick={id => {
                if (id === 'admin') {
                  setType('all');
                }
                setUserRole(id);
              }}
              options={[
                {
                  id: 'customer',
                  text: UsersPageStrings.customers,
                },
                {
                  id: 'admin',
                  text: UsersPageStrings.admin,
                },
                {
                  id: 'merchant',
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
                  disabled: userRole === 'admin',
                },
                {
                  id: 'all',
                  text: UsersPageStrings.allUserType,
                },
                {
                  id: 'passive',
                  text: UsersPageStrings.passiveUserType,
                  disabled: userRole === 'admin',
                },
              ]}
              onItemClick={id => setType(id)}
            />
          </StyledUserTypeFilterWrapper>
        </StyledTopFilterWrapper>
        <UITable
          data={users}
          rowCount={12}
          columns={[
            {
              itemRenderer: item => item.username,
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
            userRole === 'admin'
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
      </Container>
    </StyledUsersPageWrapper>
  );

  /*
  UsersPage Lifecycle
  */

  /*
  UsersPage Functions
  */

  return __;
};

const _UsersPage = UsersPage;

export { _UsersPage as UsersPage };
