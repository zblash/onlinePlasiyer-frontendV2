import * as React from 'react';
import { RouteComponentProps } from 'react-router';
export default class AdminCategory extends React.Component<
  AdminCategoryProps,
  AdminCategoryState
> {
  render() {
    const {
      match: { params },
    } = this.props;
    return <div>Hello World{params.id}</div>;
  }
}
type AdminCategoryState = {};
type AdminCategoryProps = {} & RouteComponentProps<{ id: string }>;
