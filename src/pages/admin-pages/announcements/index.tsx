import * as React from 'react';
import styled, { colors, css } from '~/styled';
import { usePaginationQuery } from '~/services/query-context/use-pagination-quey';
import { paginationQueryEndpoints } from '~/services/query-context/pagination-query-endpoints';
import { UIIcon, UITable, Container } from '~/components/ui';
import { UITableColumns } from '~/components/ui/table';
import { IAnnouncement } from '~/services/helpers/backend-models';
import { usePopupContext } from '~/contexts/popup/context';
import { refetchFactory } from '~/services/utils';

/* AnnouncementsPage Helpers */
interface AnnouncementsPageProps {}

/* AnnouncementsPage Constants */

/* AnnouncementsPage Styles */
const StyledAnnouncementsPageWrapper = styled.div`
  margin-top: 48px;
`;
const Image = styled.img`
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
const commonIconStyle = css`
  cursor: pointer;
  margin: 0 8px;
`;
/* AnnouncementsPage Component  */
function AnnouncementsPage(props: React.PropsWithChildren<AnnouncementsPageProps>) {
  /* AnnouncementsPage Variables */
  const popupContext = usePopupContext();
  const [allAnnouncementsPageNumber, setAllAnnouncementsPageNumber] = React.useState(1);
  const {
    data: { values: announcementsValues, totalPage },
    getDataByPage: announcementsPage,
  } = usePaginationQuery(paginationQueryEndpoints.getAllAnnouncements, {
    pageNumber: allAnnouncementsPageNumber,
    defaultValue: { values: [], totalPage: 0 },
  });

  const refetchQuery = refetchFactory(paginationQueryEndpoints.getAllAnnouncements);

  const announcements = React.useMemo(() => {
    return announcementsPage(allAnnouncementsPageNumber);
  }, [allAnnouncementsPageNumber, announcementsPage]);
  const TABLE_DATA_COLUMNS = React.useMemo<UITableColumns<IAnnouncement>[]>(
    () => [
      {
        title: null,
        itemRenderer: item => <Image src={item.fileUrl} />,
      },
      {
        title: 'Gecerlilik',
        itemRenderer: item => item.lastDate,
      },
      {
        title: 'Baslik',
        itemRenderer: item => item.title,
      },
      {
        title: 'Mesaj',
        itemRenderer: item => item.message,
      },
      {
        title: null,
        itemRenderer: item => (
          <StyledActionsWrapper>
            <UIIcon
              onClick={() => popupContext.removeAnnouncement.show({ id: item.id, refetchQuery })}
              name="trash"
              color={colors.dangerDark}
              className={commonIconStyle}
              size={16}
            />
          </StyledActionsWrapper>
        ),
      },
    ],
    [popupContext.removeAnnouncement, refetchQuery],
  );
  /* AnnouncementsPage Callbacks */
  const onChangePage = React.useCallback(
    (pageIndex: number, pageCount: number) => {
      if (allAnnouncementsPageNumber <= totalPage && pageIndex <= pageCount) {
        setAllAnnouncementsPageNumber(pageIndex);
      }
    },
    [allAnnouncementsPageNumber, totalPage],
  );
  /* AnnouncementsPage Lifecycle  */

  return (
    <Container>
      <StyledAnnouncementsPageWrapper>
        <UITable
          id="all-announcements-page-table"
          data={announcementsValues}
          rowCount={announcements.elementCountOfPage > 0 ? announcements.elementCountOfPage : 20}
          columns={TABLE_DATA_COLUMNS}
          totalPageCount={totalPage}
          onChangePage={onChangePage}
        />
      </StyledAnnouncementsPageWrapper>
    </Container>
  );
}
const PureAnnouncementsPage = React.memo(AnnouncementsPage);

export { PureAnnouncementsPage as AnnouncementsPage };
