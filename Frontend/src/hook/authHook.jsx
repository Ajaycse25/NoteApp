import { useMutation } from "@tanstack/react-query";

// import { logout, login, signup } from "@/services/api/api";
import { signUp, requestOTP, login, logout } from "../services/api";
import { useNavigate } from "react-router-dom";

// import { useDispatch } from "react-redux";

export const useAuth = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const logoutMutation = useMutation({
  //   mutationFn: logout,
  //   onSuccess: () => {
  //     dispatch({ type: "CLEAR_USER" });
  //     console.log("Logout successful");
  //   },
  //   onError: (error) => {
  //     console.error("Logout failed", error);
  //   },
  // });

  const signupMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log("Signup successful", data);
    },
    onError: (error) => {
      console.error("Signup failed", error);
    },
  });

  const requestOtpMutation = useMutation({
    mutationFn: requestOTP,
    onSuccess: (data) => {
      console.log("Signup successful");
    },
    onError: (error) => {
      console.error("Signup failed", error);
    },
  });
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("Login successful", data);
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      // dispatch({ type: "CLEAR_USER" });
      navigate("/signin");
    },
    onError: (error) => {
      console.error("Logout failed", error);
    },
  });

  return { signupMutation, requestOtpMutation, loginMutation, logoutMutation };
};
