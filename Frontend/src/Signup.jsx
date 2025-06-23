import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Mail, User, Eye, EyeOff, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hook/authHook"; //
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const { signupMutation, requestOtpMutation } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    signupMutation.mutate(data);
  };
  const requestotp = async () => {
    const email = getValues("email");
    if (!email) {
      alert("Please enter your email to request otp");
      return;
    }
    console.log(email);
    requestOtpMutation.mutate(email);
  };

  const handleGoogleSignUp = () => {
    // Handle Google sign in logic here
    window.location.href = "http://localhost:5000/api/auth/google";
  };
  return (
    <div className="min-h-screen flex">
      {/* Left Column - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2 mb-8">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">HD</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Sign up</h1>
            <p className="text-gray-600">Join us to enjoy the future of UI</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Full Name */}
            {signupMutation.error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {signupMutation.error?.message}
                </AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  {...register("name", { required: true })}
                  aria-invalid={errors.name ? "true" : "false"}
                  placeholder="Jonas Kahnwald"
                  className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.name?.type === "required" && (
                  <p role="alert" className="text-base text-red-400">
                    *Full name is required
                  </p>
                )}
              </div>
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <Label
                htmlFor="dob"
                className="text-sm font-medium text-gray-700"
              >
                Date of Birth
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="dob"
                  name="dob"
                  type="date"
                  {...register("dob", { required: true })}
                  aria-invalid={errors.dob ? "true" : "false"}
                  className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.dob?.type === "required" && (
                  <p role="alert" className="text-base text-red-400">
                    *date of birth is required
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  {...register("email", { required: true })}
                  aria-invalid={errors.email ? "true" : "false"}
                  placeholder="jonas_kahnwald@gmail.com"
                  className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.email?.type === "required" && (
                  <p role="alert" className="text-base text-red-400">
                    *email is required
                  </p>
                )}
              </div>
            </div>
            <Button
              type="button"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              onClick={requestotp}
              disabled={requestOtpMutation.isPending}
            >
              request otp
            </Button>

            {/* otp */}
            <div className="space-y-2">
              <Label
                htmlFor="otp"
                className="text-sm font-medium text-gray-700"
              >
                otp
              </Label>
              <div className="relative">
                <Input
                  id="otp"
                  name="otp"
                  type={showPassword ? "text" : "password"}
                  {...register("otp", { required: true })}
                  placeholder="Enter your password"
                  className="pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
                {requestOtpMutation.error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      {requestOtpMutation.error.response?.data?.message}
                    </AlertDescription>
                  </Alert>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Sign Up Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              disabled={signupMutation.isPending}
            >
              Sign up
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            {/* Google Sign Up */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors bg-white"
              onClick={handleGoogleSignUp}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Visual */}
       <div className="hidden lg:flex flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800">
          <img
            src="authImg.jpg"
            alt="Abstract blue wave background"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
