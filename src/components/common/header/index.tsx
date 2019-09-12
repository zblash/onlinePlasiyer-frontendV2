import './style-header.scss';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Popup } from '~/components/ui';
import { LoginForm, Query, SignupForm } from '~/components/common';
import { ApplicationContext } from '~/context/application';
import { isUserAdmin, isUserMerchant, isUserCustomer } from '~/utils';
import { queryEndpoints } from '~/services';

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  public static contextType = ApplicationContext;

  public context!: React.ContextType<typeof ApplicationContext>;

  public constructor(props: IHeaderProps) {
    super(props);
    this.state = {
      shouldShowLoginPopup: false,
      shouldShowSignupPopup: false,
      shouldShowLogoutPopup: false,
    };
  }

  public closeLoginPopup = () => this.setState({ shouldShowLoginPopup: false });

  public closeLogoutPopup = () => this.setState({ shouldShowLogoutPopup: false });

  public closeSignupPopup = () => this.setState({ shouldShowSignupPopup: false });

  public render() {
    const {
      user: { isLoggedIn },
      userLogout,
    } = this.context;
    const { shouldShowLoginPopup, shouldShowSignupPopup, shouldShowLogoutPopup } = this.state;
    const notAuthElements = (
      <>
        <button type="button" onClick={() => this.setState({ shouldShowLoginPopup: true })}>
          Login
        </button>
        <Popup show={shouldShowLoginPopup} onClose={this.closeLoginPopup}>
          <LoginForm
            onLoggedIn={() => {
              this.closeLoginPopup();
            }}
          />
        </Popup>
        <button type="button" onClick={() => this.setState({ shouldShowSignupPopup: true })}>
          Signup
        </button>
        <Popup show={shouldShowSignupPopup} onClose={this.closeSignupPopup}>
          <SignupForm
            onSignup={() => {
              this.closeSignupPopup();
            }}
          />
        </Popup>
      </>
    );
    const authElements = (
      <>
        <Query query={queryEndpoints.getAuthUser}>
          {({ data: user, loading, error }) => {
            if (loading) {
              return <div>User Name Loading</div>;
            }
            if (error) {
              return null;
            }

            return (
              <div className="flex mr-5">
                <div className="mr-5">{user.name}</div>
                {isUserAdmin(user) && (
                  <>
                    <NavLink to="/admin/categories/" className="mr-10">
                      Categories
                    </NavLink>
                    <NavLink to="/admin/users/" className="mr-10">
                      Users
                    </NavLink>
                  </>
                )}
                {(isUserAdmin(user) || isUserCustomer(user)) && (
                  <>
                    <NavLink to="/admin/products/" className="mr-10">
                      View Product
                    </NavLink>
                  </>
                )}

                {isUserAdmin(user) || isUserMerchant(user) ? (
                  <NavLink to="/products/create/">Add Product</NavLink>
                ) : null}
              </div>
            );
          }}
        </Query>

        <button
          type="button"
          onClick={() => {
            this.setState({ shouldShowLogoutPopup: true });
          }}
        >
          Logout
        </button>
        <Popup show={shouldShowLogoutPopup} onClose={this.closeLogoutPopup}>
          <div>
            <h1>Cikmak Istiyormusun ?</h1>
            <button
              type="button"
              onClick={() => {
                this.closeLogoutPopup();
                userLogout();
              }}
            >
              Evet
            </button>
            <button
              type="button"
              onClick={() => {
                this.setState({ shouldShowLogoutPopup: false });
              }}
            >
              Hayir
            </button>
          </div>
        </Popup>
      </>
    );

    return <div className="header-wrapper">{!isLoggedIn ? notAuthElements : authElements}</div>;
  }
}

interface IHeaderState {
  shouldShowLogoutPopup: boolean;
  shouldShowLoginPopup: boolean;
  shouldShowSignupPopup: boolean;
}
interface IHeaderProps {}
