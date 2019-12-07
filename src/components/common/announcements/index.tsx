import * as React from 'react';
import Slider from 'react-slick';
import styled, { colors } from '~/styled';
import { useQuery } from '~/services/query-context/context';
import { queryEndpoints } from '~/services/query-context/query-endpoints';

/* AnnouncementComponent Helpers */
interface AnnouncementComponentProps {}

/* AnnouncementComponent Constants */

/* AnnouncementComponent Styles */
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

/* AnnouncementComponent Component  */
function AnnouncementComponent(props: React.PropsWithChildren<AnnouncementComponentProps>) {
  /* AnnouncementComponent Variables */
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

  /* AnnouncementComponent Callbacks */

  /* AnnouncementComponent Lifecycle  */

  return (
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
  );
}
const PureAnnouncementComponent = React.memo(AnnouncementComponent);

export { PureAnnouncementComponent as AnnouncementComponent };
