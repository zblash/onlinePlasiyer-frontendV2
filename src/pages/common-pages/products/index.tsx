import * as React from 'react';
import { useParams } from 'react-router';
import styled, { css, colors } from '~/styled';
import { Container, Loading } from '~/components/ui';
import { CategoryHorizontalListFetcher } from '~/fetcher-components/common/category-horizontal-list';
import { CategoryNameTitle } from './category-name-title';
import { ProductListFetcher } from '~/fetcher-components/common/product-list';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { useQuery } from '~/services/query-context/context';

/*
  ProductsPage Helpers
*/
interface RouteParams {
  categoryId?: string;
}

interface ProductsPageProps {}

/*
  ProductsPage Colors // TODO : move theme.json
*/

/*
  ProductsPage Styles
*/

const StyledProductListTopWrapper = styled.div`
  align-items: baseline;
  display: flex;
  justify-content: space-between;
`;

const selectBox = css`
  background-color: ${colors.white};
  border: 1px solid ${colors.lightGray};
  border-radius: 5px;
  padding: 7px;
  margin-bottom: 10px;
`;

const _ProductsPage: React.SFC<ProductsPageProps> = props => {
  const { categoryId: selectedCategoryId } = useParams<RouteParams>();
  const { data: users, loading: usersLoading } = useQuery(queryEndpoints.getMerchants, {
    defaultValue: [],
  });
  const [selectedUserId, setSelectedUserId] = React.useState<string>();

  const __ = (
    <Container>
      <CategoryHorizontalListFetcher selectedCateogryId={selectedCategoryId} shouldUseProductsPageLink />
      <StyledProductListTopWrapper>
        <CategoryNameTitle selectedCategoryId={selectedCategoryId} />

        {usersLoading ? (
          <Loading color="currentColor" size={24} />
        ) : (
          <div>
            <label>Saticiya Gore Listele : </label>

            <select className={selectBox} onChange={e => setSelectedUserId(e.target.value)}>
              <option>----</option>
              {users &&
                users.map(x => (
                  <option value={x.id} key={x.id}>
                    {x.name}
                  </option>
                ))}
            </select>
          </div>
        )}
      </StyledProductListTopWrapper>
      <ProductListFetcher selectedUserId={selectedUserId} selectedCategoryId={selectedCategoryId} />
    </Container>
  );

  /*
  ProductsPage Lifecycle
  */
  /*
  ProductsPage Functions
  */

  return __;
};

const ProductsPage = _ProductsPage;

export { ProductsPage };
