import * as React from 'react';
import { Query } from '~/components/common';
import { queryEndpoints } from '~/services';
import AddActiveState from '../add-active-state';
import CreateSpecifyPruductForm from './create-specify-product-form';
import { Popup } from '~/components/ui';

export default class CreateSpecifyPruduct extends React.Component<
  CreateSpecifyPruductProps,
  CreateSpecifyPruductState
> {
  public constructor(props: CreateSpecifyPruductProps) {
    super(props);
    this.state = {
      shouldShowAddActiveStatePopup: false,
    };
  }

  onClosePopup = () => {
    this.setState({ shouldShowAddActiveStatePopup: false });
  };

  public render() {
    const { shouldShowAddActiveStatePopup } = this.state;
    const { barcode } = this.props;

    return (
      <Query
        query={queryEndpoints.getAuthUserActiveStates}
        onUpdate={d => {
          this.setState({ shouldShowAddActiveStatePopup: d.length === 0 });
        }}
      >
        {({ data: authUserActiveStates, loading: authUserActiveStatesLoading, error: authUserActiveStatesError }) => {
          if (authUserActiveStatesLoading) {
            return <div>Sayfa Yukleniyor</div>;
          }
          if (authUserActiveStatesError) {
            return <div>Sayfa Yuklenemedi Lutfen Daha sonra tekrar deneyin</div>;
          }
          const addActiveStateElement = <AddActiveState />;
          if (authUserActiveStates.length === 0) {
            return (
              <div>
                <Popup shouldRenderCloseIcon={false} show closeOnEsc={false} hideOverlayClicked={false}>
                  <h1>Devam Etmek Icin Bir ilce eklemelisin</h1>
                  {addActiveStateElement}
                </Popup>
              </div>
            );
          }

          return (
            <>
              <CreateSpecifyPruductForm barcode={barcode} />
              <hr />
              <button type="button" onClick={() => this.setState({ shouldShowAddActiveStatePopup: true })}>
                Ilce Ekle
              </button>
              <Popup show={shouldShowAddActiveStatePopup} onClose={this.onClosePopup}>
                {addActiveStateElement}
              </Popup>
            </>
          );
        }}
      </Query>
    );
  }
}

interface CreateSpecifyPruductState {
  shouldShowAddActiveStatePopup: boolean;
}
interface CreateSpecifyPruductProps {
  barcode: string;
  userId: string;
}
