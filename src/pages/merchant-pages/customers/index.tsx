import * as React from 'react';
import { useHistory } from 'react-router';
import styled, { colors } from '~/styled';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { Container, UITable } from '~/components/ui';

/* CustomersPage Helpers */
interface CustomersPageProps {}

/* CustomersPage Constants */
const UsersPageStrings = {
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
/* CustomersPage Styles */
const StyledUsersPageWrapper = styled.div``;

const StyledUserLink = styled.a`
  color: ${colors.primary};
  cursor: pointer;
`;

const StyledPageHeader = styled.div`
  display: flex;
`;
/* CustomersPage Component  */
function CustomersPage(props: React.PropsWithChildren<CustomersPageProps>) {
  /* CustomersPage Variables */
  const routerHistory = useHistory();
  const { data: users } = useQuery(queryEndpoints.getCustomers, {
    defaultValue: [],
  });
  /* CustomersPage Callbacks */
  const handleUser = React.useCallback(
    (username: string, id: string) => {
      routerHistory.push(`/merchant/customer/${username}/${id}`);
    },
    [routerHistory],
  );
  /* CustomersPage Lifecycle  */

  return (
    <Container>
      <StyledUsersPageWrapper>
        <StyledPageHeader>
          <h3>Kayitli Musteriler</h3>
        </StyledPageHeader>

        <UITable
          id="customers"
          data={users}
          rowCount={12}
          columns={[
            {
              itemRenderer: item => (
                <StyledUserLink onClick={() => handleUser(item.username, item.id)}>{item.username}</StyledUserLink>
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
          ]}
        />
      </StyledUsersPageWrapper>
    </Container>
  );
}
const PureCustomersPage = React.memo(CustomersPage);

export { PureCustomersPage as CustomersPage };
