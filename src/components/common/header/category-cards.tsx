import * as React from 'react';
import { Card } from 'react-bootstrap';
import cls from 'classnames';
import { queryEndpoints } from '~/services';
import { Query } from '..';

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
        const minCardWidth = 150;
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
                    <div
                      className={cls({
                        'clickable-box-click': clickedId === category.id,
                        'clickable-box-not-click': clickedId !== category.id,
                      })}
                      onMouseDown={() => {
                        setClickedId(category.id);
                      }}
                      onMouseUp={() => {
                        setClickedId(null);
                      }}
                      onClick={() => {}}
                    >
                      <Card style={{ width: cardWidth }}>
                        <Card.Img variant="top" src={category.photoUrl} />
                        <Card.Body>
                          <Card.Text className="text-dark">
                            {category.name.substring(0, nameLength)}
                            {category.name.length > nameLength && '...'}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
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
