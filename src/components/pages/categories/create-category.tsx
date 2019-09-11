import * as React from 'react';
import { Query, Mutation } from '~/components/common';
import { queryEndpoints, mutationEndPoints } from '~/services';
import { deleteOrAddCategoryRefetchCategories } from '.';

export default class CreateCategory extends React.Component<CreateCategoryProps, CreateCategoryState> {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: '',
      parentId: null,
      uploadFile: null,
      isSub: false,
    };
  }

  render() {
    const { categoryName, isSub, uploadFile, parentId } = this.state;
    const { closePopup } = this.props;

    return (
      <div>
        <div>
          <label>Kategori Ismi</label>
          <input
            type="text"
            onChange={e => {
              this.setState({ categoryName: e.target.value });
            }}
          />
        </div>
        <div>
          <label>Alt Categori mi ? </label>
          <input
            type="checkbox"
            onChange={e => {
              this.setState({ isSub: e.target.checked });
            }}
          />
        </div>
        {isSub && (
          // TODO : onComplate set initialData
          <Query query={queryEndpoints.getCategories} variables={{ type: 'main' }}>
            {({ data, loading, error }) => {
              if (loading) {
                return (
                  <select>
                    <option>Loading</option>
                  </select>
                );
              }
              if (error) {
                return <p>Categoriler cekemedik</p>;
              }

              // TODO : kategori bos degilse

              return (
                <select
                  defaultValue={data[0].id}
                  onChange={e => {
                    this.setState({
                      parentId: e.target.value,
                    });
                  }}
                >
                  {data.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              );
            }}
          </Query>
        )}
        <div>
          <label>Kategori Resmi</label>
          <input type="file" onChange={e => this.setState({ uploadFile: e.target.files[0] })} />
        </div>
        <Mutation
          mutation={mutationEndPoints.createCategory}
          refetchQueries={deleteOrAddCategoryRefetchCategories}
          variables={{
            parentId,
            name: categoryName,
            isSub,
            uploadfile: uploadFile,
          }}
          onComplated={() => {
            closePopup();
            // TODO : show notification
          }}
          onError={() => {
            // TODO : show notification
          }}
        >
          {(createCategory, { loading }) => {
            return (
              <button
                disabled={!categoryName || !uploadFile}
                type="button"
                onClick={() => {
                  createCategory();
                }}
              >
                {loading ? '....Loading' : 'Ekle'}
              </button>
            );
          }}
        </Mutation>
      </div>
    );
  }
}
interface CreateCategoryState {
  categoryName: string;
  parentId: string;
  isSub: boolean;
  uploadFile: File;
}
interface CreateCategoryProps {
  closePopup: Function;
}
