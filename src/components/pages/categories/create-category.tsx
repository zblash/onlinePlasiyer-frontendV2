import * as React from 'react';
import { Modal } from 'react-bootstrap';
import { Query, Mutation } from '~/components/common';
import { queryEndpoints, mutationEndPoints } from '~/services';
import { deleteOrAddCategoryRefetchCategories } from '.';

export default class CreateCategory extends React.Component<ICreateCategoryProps, ICreateCategoryState> {
  public constructor(props) {
    super(props);
    this.state = {
      categoryName: '',
      parentId: null,
      uploadFile: null,
      isSub: false,
    };
  }

  public render() {
    const { categoryName, isSub, uploadFile, parentId } = this.state;
    const { closePopup } = this.props;

    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title className="text-dark">Kategori Ekle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label>Kategori Ismi</label>
            <input
              className="form-control"
              type="text"
              onChange={e => {
                this.setState({ categoryName: e.target.value });
              }}
            />
          </div>
          <div className="form-group">
            <label>Kategori Resmi</label>
            <input
              className="form-control-file"
              type="file"
              onChange={e => this.setState({ uploadFile: e.target.files[0] })}
            />
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              onChange={e => {
                this.setState({ isSub: e.target.checked });
              }}
            />
            <label className="form-check-label">Alt Categori mi ? </label>
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
                  <div className="form-group">
                    <label>Ust kategoriyi secin</label>
                    <select
                      className="form-control"
                      onChange={e => {
                        this.setState({
                          parentId: e.target.value,
                        });
                      }}
                    >
                      <option disabled value="">
                        Select Category
                      </option>
                      {data.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }}
            </Query>
          )}
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
                  className="btn btn-success"
                  disabled={!categoryName || !uploadFile || (isSub && !parentId)}
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
        </Modal.Body>
      </div>
    );
  }
}
interface ICreateCategoryState {
  categoryName: string;
  parentId: string;
  isSub: boolean;
  uploadFile: File;
}
interface ICreateCategoryProps {
  closePopup: Function;
}
