import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredential } from "../slices/authSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userData) {
      navigate("/");
    }
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({
        username: userName,
        password: password,
      }).unwrap();
      dispatch(setCredential({ ...res }));
      toast.success("Log in successful!", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  return (
    <div className="screen">
      <div className=" d-flex justify-content-center align-items-center">
        <form
          onSubmit={handleSubmit}
          className="login-form card flex-column d-flex"
        >
          <div className="home-icon my-4">
            <Link to="/">
              <GoHomeFill />
            </Link>
          </div>
          <label>Username</label>
          <input
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            placeholder="Username"
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
          />
          <button className="loginbutton ">Login</button>
          <div className="notauser">
            Are you a hacker? If not <Link to="/register">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
