import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { setCredential } from "../slices/authSlice";
import { toast } from "react-toastify";

const Update = () => {
  const [userName, setUserName] = useState();
  const [Name, setName] = useState();

  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const [updateUser] = useUpdateUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userData } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password did not match,Bruh!");
    } else {
      try {
        const res = await updateUser({
          _id: userData._id,
          name: Name,
          username: userName,
          password: password,
        }).unwrap();
        dispatch(setCredential({ ...res }));

        toast.success("Profile Updated Succesfully!", {
          position: toast.POSITION.TOP_CENTER,
        });
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  useEffect(() => {
    setName(userData.name);
    setUserName(userData.username);
  }, [userData.name, userData.username]);
  return (
    <div className="screen">
      <div className=" d-flex justify-content-center align-items-center">
        <form
          onSubmit={handleSubmit}
          className="login-form my-2 card flex-column d-flex"
        >
          <div className="home-icon my-4">
            <h3 className=" d-flex justify-content-center align-items-center">
              Update Profile
            </h3>
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
          <h3 className="my-4 d-flex justify-content-center align-items-center">
            Update Password
          </h3>
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
          <button className="loginbutton ">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default Update;
