import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import styled, { colors, css } from '~/styled';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { Container, UIButton } from '~/components/ui';
import { CategoryHorizontalListFetcher } from '~/fetcher-components/common/category-horizontal-list';

/* Home Helpers */
interface HomeProps {}

/* Home Style Constants */

/* Home Styles */

const StyledTotalObligationWrapper = styled.div`
  width: 33.33%;
  float: right;
  text-align: center;
  border-top: 1px solid ${colors.lightGray};
  border-bottom: 1px solid ${colors.lightGray};
`;

const StyledTotalObligationWrapperTitle = styled.h3`
  color: ${colors.darkGray};
`;

const StyledTotalObligationElement = styled.div`
  width: 44%;
  text-align: center;
  vertical-align: middle;
  transition: background-color 0.3s;
  background-color: ${colors.white};
  color: ${colors.darkGray};
  padding: 4px 8px;
  border-radius: 8px;
  border: 1px solid ${colors.lightGray};
  float: left;
`;
const StyledTotalObligationElementText = styled.h3``;
const styleTotalObligationElementLast = css`
  margin-left: 1%;
`;

const SliderWrapper = styled.div`
  width: 60%;
  float: left;
  padding: 0 15px 24px 15px;
  border: 1px solid ${colors.lightGray};
  border-radius: 5px;
  margin-bottom: 10px;
`;

const SliderImg = styled.img`
  height: 600px;
  width: 100%;
`;

const SliderWrapperTitle = styled.h3`
  padding-bottom: 10px;
  border-bottom: 1px solid ${colors.lightGray};
`;

const StyledTotalObligationButton = styled(UIButton)`
display: flex;
float: right;
align-items: center;
transition: background-color 0.3s;
background-color: ${colors.primary};
color: ${colors.white};
padding: 4px 8px;
margin 3%;
border-radius: 8px;
:active {
  background-color: ${colors.primaryDark} !important;
}
:hover {
  background-color: ${colors.lightGray};
}
`;

const HomeWrapper = styled.div``;

/* Home Component  */
function Home(props: React.PropsWithChildren<HomeProps>) {
  const { t } = useTranslation();
  const { data: totalObligation } = useQuery(queryEndpoints.getObligationTotal, {
    defaultValue: {},
  });
  const { data: announcements } = useQuery(queryEndpoints.getAnnouncements, {
    defaultValue: [],
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplaySpeed: 5000,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  const __ = (
    <Container>
      <CategoryHorizontalListFetcher shouldUseProductsPageLink />
      <HomeWrapper>
        <SliderWrapper>
          <SliderWrapperTitle>Duyurular</SliderWrapperTitle>
          <Slider {...settings}>
            {announcements.map(item => (
              <div key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.message}</p>
                <SliderImg src={item.fileUrl} />
              </div>
            ))}
          </Slider>
        </SliderWrapper>

        <StyledTotalObligationWrapper>
          <StyledTotalObligationWrapperTitle>{t('obligations.title')}</StyledTotalObligationWrapperTitle>
          <StyledTotalObligationElement>
            <StyledTotalObligationElementText>{t('obligations.totalDebts')}</StyledTotalObligationElementText>
            {/* TODO TL Icon move to translation */}
            <StyledTotalObligationElementText>{totalObligation.totalDebts} &#8378;</StyledTotalObligationElementText>
          </StyledTotalObligationElement>
          <StyledTotalObligationElement className={styleTotalObligationElementLast}>
            <StyledTotalObligationElementText>{t('obligations.totalReceivables')}</StyledTotalObligationElementText>
            {/* TODO TL Icon move to translation */}
            <StyledTotalObligationElementText>
              {totalObligation.totalReceivables} &#8378;
            </StyledTotalObligationElementText>
          </StyledTotalObligationElement>
          <StyledTotalObligationButton>{t('obligations.details')}</StyledTotalObligationButton>
        </StyledTotalObligationWrapper>
      </HomeWrapper>
    </Container>
  );
  /* Home Lifecycle  */

  /* Home Functions  */

  return __;
}

const _Home = Home;

export { _Home as Home };
