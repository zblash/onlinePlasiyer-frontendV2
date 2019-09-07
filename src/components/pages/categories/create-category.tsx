import * as React from 'react';
import { Mutation, Query } from '~/components/common';
import { CategoryResponse } from '~/__types';
import services from '~/services';

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
          <Query query={services.getCategoriesWithoutSub}>
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
        <Mutation<CategoryResponse, Parameters<typeof services.createCategory>[0]>
          mutation={variable => services.createCategory(variable)}
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
                  createCategory({
                    parentId,
                    name: categoryName,
                    isSub,
                    uploadfile: uploadFile,
                  });
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
