import * as React from 'react';
import { Mutation } from '~/components/common';
import { mutationEndPoints } from '~/services';
import { deleteOrAddCategoryRefetchCategories } from '..';

export default class DeleteCategory extends React.Component<DeleteCategoryProps, DeleteCategoryState> {
  public constructor(props: DeleteCategoryProps) {
    super(props);
    this.state = {};
  }

  public render() {
    const { closePopup, categoryId } = this.props;

    return (
      <div>
        <h3>Eminmisin</h3>
        <p>Tekrar Geri getiremezsin</p>
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
              <button onClick={() => removeCategory()} type="button" disabled={loading}>
                Evet
              </button>
            );
          }}
        </Mutation>
        <button
          type="button"
          onClick={() => {
            closePopup();
          }}
        >
          Hayir
        </button>
      </div>
    );
  }
}
interface DeleteCategoryState {}

interface DeleteCategoryProps {
  closePopup: Function;
  categoryId: string;
}