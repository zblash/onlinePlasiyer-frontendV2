import * as React from 'react';
import {Card, Nav} from 'react-bootstrap';
import cls from 'classnames';
import { queryEndpoints } from '~/services';
import { Query } from '..';
import {NavLink} from "react-router-dom";

const CategoryCards: React.SFC<ICategoryCardsProps> = props => {
  const [clickedId, setClickedId] = React.useState(null);
  return (
    <Query query={queryEndpoints.getCategories} variables={{ type: 'main' }}>
      {({ data: mainCategories, loading: mainCategoriesLoading, error: mainCategoriesError }) => {
        if (mainCategoriesLoading) {
          return <div>Loading mainCategories</div>;
        }
        if (mainCategoriesError) {
          return <div>Error mainCategories</div>;
        }
        const cardPadding = 15;
        const minCardWidth = 130;
        const currentCardWidth = Math.floor(window.innerWidth / mainCategories.length - cardPadding * 2);
        const cardWidth = Math.max(minCardWidth, currentCardWidth);
        const cardCount = Math.floor(window.innerWidth / (cardWidth + cardPadding * 2));
        const nameLength = Math.floor(cardWidth / 11);

        return (
          <>
            <div className="container-fluid mt-2">
              <div className="row">
                {mainCategories.slice(0, cardCount).map(category => (
                  <div
                    style={{
                      marginLeft: cardPadding,
                      marginRight: cardPadding,
                      cursor: 'pointer',
                      borderRadius: 5,
                      backgroundColor: 'white',
                    }}
                    key={category.id}
                  >
                    <Nav.Link as={NavLink} style={{ padding:'0' }} to={`/products/${category.id}`} key={`mainCat-${category.id}`}>
                      <Card style={{ width: '5rem', height: '130px', margin: '5px', border: '0px' }}>
                        <Card.Img variant="top" src={category.photoUrl} />
                        <Card.Body style={{ padding: '0px', textAlign: 'center' }}>
                          <Card.Text className="text-dark">
                            {category.name.substring(0, nameLength)}
                            {category.name.length > nameLength && '...'}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Nav.Link>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      }}
    </Query>
  );
};
interface ICategoryCardsProps {}

export default CategoryCards;
