/* eslint-disable dot-notation */
import * as React from 'react';
import { useHistory, useLocation } from 'react-router';
import styled, { css, colors } from '~/styled';
import { Container, UITable, UIIcon, UIButtonGroup } from '~/components/ui';
import { useQuery } from '~/services/query-context/context';
import { useMutation } from '~/services/mutation-context/context';
import { mutationEndPoints } from '~/services/mutation-context/mutation-enpoints';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { UserType } from '~/services/helpers/maps';

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

const StyledUsersPageWrapper = styled.div``;

const StyledTopFilterWrapper = styled.div`
  display: flex;
  margin-bottom: 24px;
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
const StyledPageHeader = styled.div`
  display: flex;
`;
const UsersPage: React.SFC<UsersPageProps> = () => {
  const routerHistory = useHistory();
  const location = useLocation().state;
  const [type, setType] = React.useState<UserType>('all');
  const { data: users } = useQuery(queryEndpoints.getUsers, {
    variables: {
      role: location['type'],
      type,
    },
    defaultValue: [],
  });

  const { mutation: changeUserStatus, loading } = useMutation(mutationEndPoints.changeUserStatus);

  const __ = (
    <Container>
      <StyledUsersPageWrapper>
        <StyledPageHeader>
          <h3>Kayitli Kullanicilar</h3>
        </StyledPageHeader>
        <StyledTopFilterWrapper>
          <StyledUserTypeFilterWrapper>
            <StyledFilterQuestion>{UsersPageStrings.wichUserQuestion}</StyledFilterQuestion>
            <UIButtonGroup<UserType>
              selectedId={type}
              options={[
                {
                  id: 'active',
                  text: UsersPageStrings.activeUserType,
                  disabled: location['type'] === 'ADMIN',
                },
                {
                  id: 'all',
                  text: UsersPageStrings.allUserType,
                },
                {
                  id: 'passive',
                  text: UsersPageStrings.passiveUserType,
                  disabled: location['type'] === 'ADMIN',
                },
              ]}
              onItemClick={id => setType(id)}
            />
          </StyledUserTypeFilterWrapper>
        </StyledTopFilterWrapper>
        <UITable
          id={`users-${type}`}
          data={users}
          rowCount={12}
          columns={[
            {
              itemRenderer: (item: { id: string; username: React.ReactNode }) => (
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
            location['type'] === 'ADMIN'
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
                            onClick={() => {
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
