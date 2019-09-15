import * as React from 'react';
import { Button } from 'react-bootstrap';
import { Mutation } from '~/components/common';
import { mutationEndPoints } from '~/services';
import { deleteOrAddCategoryRefetchCategories } from '..';

export default class DeleteCategory extends React.Component<DeleteCategoryProps, DeleteCategoryState> {
  public render() {
    const { closePopup, categoryId } = this.props;

    return (
      <Mutation
        mutation={mutationEndPoints.deleteCategory}
        refetchQueries={deleteOrAddCategoryRefetchCategories}
        variables={{ id: categoryId }}
        onComplated={() => {
          closePopup();
        }}
      >
        {(removeCategory, { loading }) => {
          return (
            <Button
              variant="primary"
              onClick={() => {
                removeCategory();
              }}
            >
              Evet
            </Button>
          );
        }}
      </Mutation>
    );
  }
}
interface DeleteCategoryState {}

interface DeleteCategoryProps {
  closePopup: Function;
  categoryId: string;
}
