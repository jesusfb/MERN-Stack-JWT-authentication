import { useSelector, useDispatch } from "react-redux";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutApiMutation } from "../slices/usersApiSlice";
import { logOut } from "../slices/authSlice";
import { LinkContainer } from "react-router-bootstrap";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Header = () => {
  const { userData } = useSelector((state) => state.auth);

  const [logoutApi] = useLogoutApiMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logOut());
      navigate("/");
      toast.success("Logged Out!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      {userData ? (
        <>
          <Navbar className="d-flex justify-content-between">
            <LinkContainer to="/">
              <Navbar.Brand>LoggedIn</Navbar.Brand>
            </LinkContainer>
            <Nav>
              <NavDropdown title={userData.name} id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar>
        </>
      ) : null}
    </div>
  );
};

export default Header;
