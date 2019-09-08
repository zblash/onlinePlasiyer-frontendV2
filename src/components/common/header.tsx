import * as React from 'react';
import JSXStyle from 'styled-jsx/style';
import { NavLink } from 'react-router-dom';
import services from '~/services';
import { Popup } from '~/components/ui';
import { LoginForm, Query, SignupForm } from '~/components/common';
import { ApplicationContext } from '../context/application';

export default class Header extends React.Component<HeaderProps, HeaderState> {
  static contextType = ApplicationContext;

  context!: React.ContextType<typeof ApplicationContext>;

  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      shouldShowLoginPopup: false,
      shouldShowSignupPopup: false,
      shouldShowLogoutPopup: false,
    };
  }

  closeLoginPopup = () => this.setState({ shouldShowLoginPopup: false });

  closeLogoutPopup = () => this.setState({ shouldShowLogoutPopup: false });

  closeSignupPopup = () => this.setState({ shouldShowSignupPopup: false });

  render() {
    const {
      user: { isLoggedIn },
      userLogout,
    } = this.context;
    const { shouldShowLoginPopup, shouldShowSignupPopup, shouldShowLogoutPopup } = this.state;
    const style = (
      <JSXStyle id="header-style">
        {`
          .flex{
            display:flex;
          }
          .mr-5{
            margin-right:5px;
          }
          .header-logged-user-name{
            margin-right: 5px;
          }
        `}
      </JSXStyle>
    );
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
        <Query query={() => services.getAuthUser()}>
          {({ data, loading, error }) => {
            if (loading) {
              return <div>User Name Loading</div>;
            }
            if (error) {
              return null;
            }

            return (
              <div className="flex mr-5">
                <div className="mr-5">{data.name}</div>
                {data.role === 'ADMIN' && (
                  <div>
                    <NavLink to="/admin/categories/">Categories </NavLink>
                    <NavLink to="/admin/users/">Users</NavLink>
                  </div>
                )}
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
                services.logout();
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

    return (
      <div className="header-wrapper">
        {!isLoggedIn ? notAuthElements : authElements}
        {style}
      </div>
    );
  }
}

interface HeaderState {
  shouldShowLogoutPopup: boolean;
  shouldShowLoginPopup: boolean;
  shouldShowSignupPopup: boolean;
}
interface HeaderProps {}
