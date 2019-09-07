import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Header, Query } from '~/components/common';
import Category from './category';
import services from '~/services';
import CreateCategoryPopup from './create-category-popup';
import { Popup } from '~/components/ui';

export default class AdminCategories extends React.Component<
  AdminCategoriesProps,
  AdminCategoriesState
> {
  state: AdminCategoriesState = {
    shouldShowCreatePopup: false,
  };
  closeCreateCategoryPopup = () => {
    this.setState({ shouldShowCreatePopup: false });
  };
  render() {
    const { shouldShowCreatePopup } = this.state;
    return (
      <div>
        <Header />
        <Query query={() => services.getAllCategories()}>
          {({ data, loading, error }) => {
            if (loading) {
              return <div>Loading admin Categories</div>;
            }
            if (error) {
              return <div>Error admin Categories</div>;
            }
            console.log(data);
            return (
              <div>
                <button
                  onClick={() => {
                    this.setState({ shouldShowCreatePopup: true });
                  }}
                >
                  create category
                </button>
                {data.map(category => (
                  <Category key={category.id} {...category} />
                ))}
                <Popup
                  show={shouldShowCreatePopup}
                  onClose={this.closeCreateCategoryPopup}
                >
                  <CreateCategoryPopup
                    closePopup={this.closeCreateCategoryPopup}
                  />
                </Popup>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
type AdminCategoriesState = {
  shouldShowCreatePopup: boolean;
};
type AdminCategoriesProps = {} & RouteComponentProps<{}>;
