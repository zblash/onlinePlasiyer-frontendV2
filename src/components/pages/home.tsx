import * as React from 'react';
import { hot } from 'react-hot-loader';
import JSXStyle from 'styled-jsx/style';
import { Header, Query } from '~/components/common';
import services from '~/services';

interface AppState {}

class Home extends React.Component<{}, AppState> {
  public render() {
    return (
      <div className="app">
        <Header />
        <JSXStyle id="yasin">
          {`
            p {
              color: red;
            }
          `}
        </JSXStyle>
        <Query query={services.getCart}>
          {({ data }) => {
            console.log(data);
            return null;
          }}
        </Query>
      </div>
    );
  }
}

declare let module: object;

export default hot(module)(Home);
// export default App;
