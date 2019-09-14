import './style-header.scss';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Form, Nav } from 'react-bootstrap';
import { Popup } from '~/components/ui';
import { LoginForm, Query, SignupForm } from '~/components/common';
import { ApplicationContext } from '~/context/application';
import { isUserAdmin, isUserMerchant, isUserCustomer } from '~/utils';
import { withAuthUser, IWithAuthUserComponentProps } from '~/components/hoc/with-auth-user';
import CustomerBasketIcon from './basket-icon';

class Header extends React.Component<IHeaderProps, IHeaderState> {
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
    const { user } = this.props;
    const notAuthElements = (
      <Navbar bg="blue" variant="dark" expand="lg">
        <Navbar.Brand href="#home">ONLINE PLASIYER</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="ml-auto">
            <button className="btn nav-btn" type="button" onClick={() => this.setState({ shouldShowLoginPopup: true })}>
              Login
            </button>
            <Popup show={shouldShowLoginPopup} onClose={this.closeLoginPopup}>
              <LoginForm
                onLoggedIn={() => {
                  this.closeLoginPopup();
                }}
              />
            </Popup>
            <button
              className="btn nav-btn"
              type="button"
              onClick={() => this.setState({ shouldShowSignupPopup: true })}
            >
              Signup
            </button>
            <Popup show={shouldShowSignupPopup} onClose={this.closeSignupPopup}>
              <SignupForm
                onSignup={() => {
                  this.closeSignupPopup();
                }}
              />
            </Popup>
          </div>
        </Navbar.Collapse>
      </Navbar>
    );
    const authElements = user ? (
      <Navbar bg="blue" variant="dark" expand="lg">
        <Navbar.Brand href="#home">ONLINE PLASIYER</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
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
            {isUserAdmin(user) || isUserMerchant(user) ? <NavLink to="/products/create/">Add Product</NavLink> : null}
          </Nav>
          <div className="ml-auto">
            <div className="end-item">
              {isUserCustomer(user) && <CustomerBasketIcon />}
              <button
                className="btn nav-btn"
                type="button"
                onClick={() => {
                  this.setState({ shouldShowLogoutPopup: true });
                }}
              >
                Logout
              </button>
            </div>
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
          </div>
        </Navbar.Collapse>
      </Navbar>
    ) : (
      <div>Loading</div>
    );

    return <div>{!isLoggedIn ? notAuthElements : authElements}</div>;
  }
}

interface IHeaderState {
  shouldShowLogoutPopup: boolean;
  shouldShowLoginPopup: boolean;
  shouldShowSignupPopup: boolean;
}
interface IHeaderProps extends IWithAuthUserComponentProps {}

export default withAuthUser(Header);
