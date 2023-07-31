import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredential } from "../slices/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [userName, setUserName] = useState();
  const [Name, setName] = useState();

  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userData) {
      navigate("/");
    }
  }, [userData, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password did not match,Bruh!");
    } else {
      try {
        const res = await register({
          name: Name,
          username: userName,
          password: password,
        }).unwrap();
        dispatch(setCredential({ ...res }));
        navigate("/");
        toast.success("You did great!Account Created Succesfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <div className="screen">
      <div className=" d-flex justify-content-center align-items-center">
        <form
          onSubmit={handleSubmit}
          className="login-form card flex-column d-flex"
        >
          <div className="home-icon ">
            <Link to="/">
              <GoHomeFill />
            </Link>
          </div>
          <label>Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={Name}
            placeholder="Name"
          />
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
          <label>Confirm Password</label>
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            placeholder="Confirm Password"
          />
          <button className="loginbutton ">Register</button>
          <div className="notauser">
            Why are you even here? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
