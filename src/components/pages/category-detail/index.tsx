import * as React from 'react';
import { RouteComponentProps } from 'react-router';

const AdminCategory: React.SFC<AdminCategoryProps> = props => {
  const {
    match: { params },
  } = props;

  return (
    <div>
      Hello
      {params.id}
    </div>
  );
};

type AdminCategoryProps = {} & RouteComponentProps<{ id: string }>;

export default AdminCategory;
