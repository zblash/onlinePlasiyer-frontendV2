import * as React from 'react';
import { Query, Mutation } from '~/components/common';
import { Img } from '~/components/ui';
import { queryEndpoints, mutationEndPoints } from '~/services';

export default class UpdateCategory extends React.Component<UpdateCategoryProps, UpdateCategoryState> {
  public constructor(props: UpdateCategoryProps) {
    super(props);
    this.state = {
      categoryName: '',
      isSub: false,
      parentId: '',
      uploadFile: null,
      photoSrc: '',
    };
  }

  public render() {
    const { categoryId, closePopup } = this.props;
    if (!categoryId) {
      return <p>Error</p>;
    }

    const { categoryName, isSub, uploadFile, parentId, photoSrc } = this.state;

    return (
      <Query
        query={queryEndpoints.getCategoryByID}
        variables={{ id: categoryId }}
        onComplated={d => {
          this.setState({
            categoryName: d.name,
            isSub: d.subCategory,
            parentId: d.parentId,
            photoSrc: d.photoUrl,
          });
        }}
      >
        {({ data, loading, error }) => {
          if (loading) {
            return <div>loading getCategory</div>;
          }
          if (error) {
            return <div>Error getCategory</div>;
          }

          return (
            <div>
              <div>
                <label>Kategori Ismi</label>
                <input
                  type="text"
                  onChange={e => {
                    this.setState({ categoryName: e.target.value });
                  }}
                  value={categoryName}
                />
              </div>
              <div>
                <label>Alt Categori mi ? </label>
                <input
                  type="checkbox"
                  onChange={e => {
                    this.setState({ isSub: e.target.checked });
                  }}
                  checked={isSub}
                />
              </div>
              {isSub && (
                <Query query={queryEndpoints.getCategories} variables={{ type: 'sub' }}>
                  {({ data: _mainCategories, loading: _mainCategoriesLoading, error: _mainCategoriesError }) => {
                    if (_mainCategoriesLoading) {
                      return (
                        <select>
                          <option>Loading</option>
                        </select>
                      );
                    }
                    if (_mainCategoriesError) {
                      return <p>Categoriler cekemedik</p>;
                    }
                    const _cleanMainCategories = _mainCategories.filter(c => c.id !== categoryId);

                    if (_cleanMainCategories.length === 0) {
                      return <div>Maalesef suan bir category bulamadik</div>;
                    }

                    return (
                      <select
                        defaultValue={_cleanMainCategories[0].id}
                        onChange={e => {
                          this.setState({
                            parentId: e.target.value,
                          });
                        }}
                      >
                        {_cleanMainCategories.map(category => (
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
                <Img src={photoSrc} alt={data.name} extraClassName="w-10 h-10" zoomable />
                <label>Degistir</label>
                <input
                  type="file"
                  onChange={event => {
                    if (event.target.files && event.target.files[0]) {
                      const file = event.target.files[0];
                      const reader = new FileReader();
                      reader.onload = e => {
                        // @ts-ignore
                        this.setState({ photoSrc: e.target.result as string, uploadFile: file });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
              <Mutation
                mutation={mutationEndPoints.updateCategory}
                onComplated={() => {
                  closePopup();
                  // TODO : show notification
                }}
                onError={() => {
                  // TODO : show notification
                }}
              >
                {(createCategory, { loading: updateCategoryLoading }) => {
                  return (
                    <button
                      disabled={
                        categoryName === data.name &&
                        photoSrc === data.photoUrl &&
                        isSub === data.subCategory &&
                        parentId === data.parentId
                      }
                      type="button"
                      onClick={() => {
                        createCategory({
                          id: categoryId,
                          params: {
                            isSub,
                            name: categoryName,
                            parentId,
                            uploadfile: uploadFile,
                          },
                        });
                      }}
                    >
                      {updateCategoryLoading ? '....Loading' : 'Guncelle'}
                    </button>
                  );
                }}
              </Mutation>
            </div>
          );
        }}
      </Query>
    );
  }
}

interface UpdateCategoryState {
  categoryName: string;
  parentId: string;
  isSub: boolean;
  uploadFile: File;
  photoSrc: string;
}

interface UpdateCategoryProps {
  categoryId: string;
  closePopup: Function;
}
