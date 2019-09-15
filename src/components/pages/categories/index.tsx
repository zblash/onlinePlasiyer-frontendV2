import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { CardGroup, Modal } from 'react-bootstrap';
import { Query } from '~/components/common';
import Category from './category';
import CreateCategory from './create-category';
import { queryEndpoints } from '~/services';
import { refetchFactory } from '~/services/endpoints/query-endpoints';

export const deleteOrAddCategoryRefetchCategories = [
  refetchFactory(queryEndpoints.getCategories),
  refetchFactory(queryEndpoints.getCategories, { type: 'main' }),
  refetchFactory(queryEndpoints.getCategories, { type: 'sub' }),
];

export default class AdminCategories extends React.Component<AdminCategoriesProps, AdminCategoriesState> {
  public constructor(props: AdminCategoriesProps) {
    super(props);
    this.state = {
      shouldShowCreatePopup: false,
    };
  }

  private closeCreateCategoryPopup = () => {
    this.setState({ shouldShowCreatePopup: false });
  };

  public render() {
    const { shouldShowCreatePopup } = this.state;

    return (
      <div className="container-fluid">
        <Query query={queryEndpoints.getCategories}>
          {({ data, loading, error }) => {
            if (loading) {
              return <div>Loading admin Categories</div>;
            }
            if (error) {
              return <div>Error admin Categories</div>;
            }

            return (
              <div>
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={() => {
                    this.setState({ shouldShowCreatePopup: true });
                  }}
                >
                  create category
                </button>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    padding: '8px',
                    alignItems: 'center',
                  }}
                >
                  {data.map(category => (
                    <Category
                      key={category.id}
                      id={category.id}
                      name={category.name}
                      parentId={category.parentId}
                      photoUrl={category.photoUrl}
                      subCategory={category.subCategory}
                    />
                  ))}
                </div>
                <Modal show={shouldShowCreatePopup} onHide={this.closeCreateCategoryPopup}>
                  <CreateCategory closePopup={this.closeCreateCategoryPopup} />
                </Modal>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
interface AdminCategoriesState {
  shouldShowCreatePopup: boolean;
}
type AdminCategoriesProps = {} & RouteComponentProps<{}>;
