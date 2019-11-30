import * as React from 'react';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import styled, { colors, css } from '~/styled';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';
import { Container, UIButton } from '~/components/ui';
import { CategoryHorizontalListFetcher } from '~/fetcher-components/common/category-horizontal-list';
import { ObligationComponent } from '~/components/common/obligation';

/* Home Helpers */
interface HomeProps {}

/* Home Style Constants */

/* Home Styles */

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
const HomeWrapper = styled.div``;

/* Home Component  */
function Home(props: React.PropsWithChildren<HomeProps>) {
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
        <ObligationComponent />
      </HomeWrapper>
    </Container>
  );
  /* Home Lifecycle  */

  /* Home Functions  */

  return __;
}

const _Home = Home;

export { _Home as Home };
