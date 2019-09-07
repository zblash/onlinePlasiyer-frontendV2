import * as React from 'react';
import { Mutation, Query } from '~/components/common';
import services from '~/services';
import { Popup } from '~/components/ui';
export default class CreateCategory extends React.Component<
  CreateCategoryProps,
  CreateCategoryState
> {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: '',
      parentId: 0,
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
            type='text'
            onChange={e => {
              this.setState({ categoryName: e.target.value });
            }}
          />
        </div>
        <div>
          <label>Alt Categori mi ? </label>
          <input
            type='checkbox'
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
                      parentId: parseInt(e.target.value.split('_')[1], 10),
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
          <input
            type='file'
            onChange={e => this.setState({ uploadFile: e.target.files[0] })}
          />
        </div>
        <Mutation
          mutation={variable => services.createCategory(variable)}
          onComplated={() => {
            closePopup();
            // TODO : show notification
          }}
          onError={() => {
            // TODO : show notification
          }}
        >
          {(createCategory, { data, loading }) => {
            return (
              <button
                disabled={!categoryName || !uploadFile}
                onClick={() => {
                  let form_data = new FormData();
                  const data = {
                    parentId,
                    name: categoryName,
                    subCategory: isSub ? 1 : 0,
                    uploadfile: uploadFile,
                  };
                  for (const key in data) {
                    form_data.append(key, data[key]);
                  }
                  createCategory(form_data);
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
type CreateCategoryState = {
  categoryName: string;
  parentId: number;
  isSub: boolean;
  uploadFile: File;
};
type CreateCategoryProps = {
  closePopup: Function;
};
