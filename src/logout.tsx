import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import { logOut } from "./firebaseConfig";
import { useDispatch } from "react-redux";
import { UserDataActions } from "./redux/slices/userData";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    logOut()
      .then(() => {
        dispatch(UserDataActions.logout());
        navigate("/");
        window?.location.reload();
      })
      .catch(() => {
        dispatch(UserDataActions.logout());
        navigate("/");
        window?.location.reload();
      });
  }, [navigate, dispatch]);

  return <></>;
};
export default Logout;
