import { useMutation } from "@tanstack/react-query";
import { signUp, requestOTP, login, logout } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useAuth = () => {
  const navigate = useNavigate();

  const signupMutation = useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      console.log("Signup successful", data);
      toast.success("Registration successful!");
    },
    onError: (error) => {
      console.error("Signup failed", error);
      toast.error(error?.response?.data?.message || "Registration failed!");
    },
  });

  const requestOtpMutation = useMutation({
    mutationFn: requestOTP,
    onSuccess: () => {
      console.log("OTP requested successfully");
      toast.success("OTP sent to your email!");
    },
    onError: (error) => {
      console.error("OTP request failed", error);
      toast.error(error?.response?.data?.message || "Failed to request OTP.");
    },
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("Login successful", data);
      toast.success("Login successful!");
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error("Login failed", error);
      toast.error(error?.response?.data?.message || "Login failed!");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      toast.success("Logout successful!");
      navigate("/signin");
    },
    onError: (error) => {
      console.error("Logout failed", error);
      toast.error("Logout failed!");
    },
  });

  return { signupMutation, requestOtpMutation, loginMutation, logoutMutation };
};
