import * as React from 'react';

export default class AddActiveState extends React.Component<AddActiveStateProps, AddActiveStateState> {
  public constructor(props: AddActiveStateProps) {
    super(props);
    this.state = {};
  }

  public render() {
    return <div>Hello World</div>;
  }
}

interface AddActiveStateState {}
interface AddActiveStateProps {}
