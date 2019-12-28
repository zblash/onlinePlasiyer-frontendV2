import * as React from 'react';
import styled, { colors, css } from '~/styled';
import { useTranslation } from '~/i18n';
import { Container, UIButton, UITable, UIIcon } from '~/components/ui';
import { usePopupContext } from '~/contexts/popup/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { useQuery } from '~/services/query-context/context';
import { UITableColumns } from '~/components/ui/table';
import { ICategoryResponse } from '~/services/helpers/backend-models';

/* AllCategoriesPage Helpers */
interface AllCategoriesPageProps {}

/* AllCategoriesPage Constants */

/* AllCategoriesPage Styles */
const StyledPageContainer = styled.div`
  margin-top: 48px;
`;
const CategoryImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid ${colors.gray};
`;
const StyledActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledAddButton = styled(UIButton)`
  float: right;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;
  background-color: ${colors.lightGray};
  color: ${colors.white};
  padding: 4px 8px;
  border-radius: 8px;
  :active {
    background-color: ${colors.primaryDark} !important;
  }
  :hover {
    background-color: ${colors.primary};
  }
`;
const commonIconStyle = css`
  cursor: pointer;
  margin: 0 8px;
`;
const addIconStyle = css`
  margin-left: 8px;
`;

/* AllCategoriesPage Component  */
function AllCategoriesPage(props: React.PropsWithChildren<AllCategoriesPageProps>) {
  /* AllCategoriesPage Variables */
  const { t } = useTranslation();
  const popupsContext = usePopupContext();
  const { data: categories } = useQuery(queryEndpoints.getCategories, {
    defaultValue: [],
    variables: { type: 'all' },
  });
  const TABLE_DATA_COLUMNS = React.useMemo<UITableColumns<ICategoryResponse>[]>(
    () => [
      {
        title: null,
        itemRenderer: item => <CategoryImage src={item.photoUrl} />,
      },
      {
        title: t('all-products-page.table.name'),
        itemRenderer: item => item.name,
      },
      {
        title: t('all-products-page.table.category-name'),
        itemRenderer: item => <span>{item.subCategory ? 'Evet' : 'Hayir'}</span>,
      },
      {
        title: null,
        itemRenderer: item => (
          <StyledActionsWrapper>
            <UIIcon
              name="trash"
              color={colors.dangerDark}
              className={commonIconStyle}
              size={16}
              onClick={() => popupsContext.deleteCategory.show({ ...item, isSub: item.subCategory })}
            />
            <UIIcon
              name="edit"
              color={colors.primaryDark}
              className={commonIconStyle}
              size={16}
              onClick={() => {
                popupsContext.updateCategory.show({
                  isSub: item.subCategory,
                  name: item.name,
                  imgSrc: item.photoUrl,
                  id: item.id,
                });
              }}
            />
          </StyledActionsWrapper>
        ),
      },
    ],
    [t, popupsContext],
  );
  /* AllCategoriesPage Callbacks */

  /* AllCategoriesPage Lifecycle  */
  return (
    <Container>
      <StyledPageContainer>
        <StyledAddButton onClick={() => popupsContext.createCategory.show()}>
          {/* // TODO(0): move string object */}
          Ekle <UIIcon name="add" color={colors.white} size={10} className={addIconStyle} />
        </StyledAddButton>
        <UITable
          id="all-categories-page-table"
          data={categories}
          rowCount={14}
          totalPageCount={Math.ceil(categories.length / 14)}
          columns={TABLE_DATA_COLUMNS}
        />
      </StyledPageContainer>
    </Container>
  );
}
const PureAllCategoriesPage = React.memo(AllCategoriesPage);

export { PureAllCategoriesPage as AllCategoriesPage };
