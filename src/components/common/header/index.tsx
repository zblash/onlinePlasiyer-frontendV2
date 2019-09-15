import './style-header.scss';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Card, Form, Modal, Nav } from 'react-bootstrap';
import { Popup } from '~/components/ui';
import { LoginForm, SignupForm } from '~/components/common';
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
            <Modal show={shouldShowLoginPopup} onHide={this.closeLoginPopup}>
              <LoginForm
                onLoggedIn={() => {
                  this.closeLoginPopup();
                }}
              />
            </Modal>
            <button
              className="btn nav-btn"
              type="button"
              onClick={() => this.setState({ shouldShowSignupPopup: true })}
            >
              Signup
            </button>
            <Modal show={shouldShowSignupPopup} onHide={this.closeSignupPopup}>
              <SignupForm
                onSignup={() => {
                  this.closeSignupPopup();
                }}
              />
            </Modal>
          </div>
        </Navbar.Collapse>
      </Navbar>
    );
    const links = [
      {
        title: 'Categories',
        to: '/admin/categories',
        shouldRender: isUserAdmin(user),
      },
      {
        title: 'Users',
        to: '/admin/users',
        shouldRender: isUserAdmin(user),
      },
      {
        title: 'Orders',
        to: '/orders',
        shouldRender: isUserMerchant(user) || isUserCustomer(user),
      },
      {
        title: 'View Product',
        to: '/products',
        shouldRender: isUserAdmin(user) || isUserCustomer(user),
      },
      {
        title: 'Add Product',
        to: '/products/create',
        shouldRender: isUserAdmin(user) || isUserMerchant(user),
      },
    ].filter(link => link.shouldRender);
    const authElements = user ? (
      <>
        <Navbar bg="blue" variant="dark" expand="lg">
          <Navbar.Brand>
            <NavLink to="/">ONLINE PLASIYER</NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {links.map(link => (
              <Nav.Link as={NavLink} to={link.to} key={link.to}>
                {link.title}
              </Nav.Link>
            ))}
            <div className="ml-auto">
              <div className="end-item flex">
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
        {isUserCustomer(user) && (
          <>
            <div className="mb-2" />
            <div className="container-fluid">
              <div className="row">
                <div className="col-1">
                  <Card>
                    <Card.Img variant="top" src="asadsd.jpg" />
                    <Card.Body>
                      <Card.Text>Deneme</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-1">
                  <Card>
                    <Card.Img variant="top" src="asadsd.jpg" />
                    <Card.Body>
                      <Card.Text>Deneme</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-1">
                  <Card>
                    <Card.Img variant="top" src="asadsd.jpg" />
                    <Card.Body>
                      <Card.Text>Deneme</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-1">
                  <Card>
                    <Card.Img variant="top" src="asadsd.jpg" />
                    <Card.Body>
                      <Card.Text>Deneme</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-1">
                  <Card>
                    <Card.Img variant="top" src="asadsd.jpg" />
                    <Card.Body>
                      <Card.Text>Deneme</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-1">
                  <Card>
                    <Card.Img variant="top" src="asadsd.jpg" />
                    <Card.Body>
                      <Card.Text>Deneme</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-1">
                  <Card>
                    <Card.Img variant="top" src="asadsd.jpg" />
                    <Card.Body>
                      <Card.Text>Deneme</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-1">
                  <Card>
                    <Card.Img variant="top" src="asadsd.jpg" />
                    <Card.Body>
                      <Card.Text>Deneme</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-1">
                  <Card>
                    <Card.Img variant="top" src="asadsd.jpg" />
                    <Card.Body>
                      <Card.Text>Deneme</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-1">
                  <Card>
                    <Card.Img variant="top" src="asadsd.jpg" />
                    <Card.Body>
                      <Card.Text>Deneme</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-1">
                  <Card>
                    <Card.Img variant="top" src="asadsd.jpg" />
                    <Card.Body>
                      <Card.Text>Deneme</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-1">
                  <Card>
                    <Card.Img variant="top" src="asadsd.jpg" />
                    <Card.Body>
                      <Card.Text>Deneme</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    ) : (
      <div>Loading</div>
    );

    return <div className="mb-5">{!isLoggedIn ? notAuthElements : authElements}</div>;
  }
}

interface IHeaderState {
  shouldShowLogoutPopup: boolean;
  shouldShowLoginPopup: boolean;
  shouldShowSignupPopup: boolean;
}
interface IHeaderProps extends IWithAuthUserComponentProps {}

export default withAuthUser(Header);
