import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/Input";
import Button from "../../components/Button";
import LoginPic from "../../assets/images/bg.png";
import { signupSchema } from "../../schemas/signUpSchema";
import { useRegister } from "../../hooks/useAuth";
import { setUserOtpEmail } from "../../store/slices/authSlice";
import { browserRoutes } from "../../routes/browserRoutes";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });
  const { mutate, isLoading } = useRegister();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(setUserOtpEmail(data?.email));
    mutate(data);
  };

  return (
    <div className="d-flex">
      <div className="login-page">
        <div className="">
          <div className="mainlogin-001">
            <h1>Create Account</h1>
            <p className="login-sub-text pt-3">
              Sign up today to experience the convenience of our
              <br /> premium services.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="pb-4 pt-4">
              <Input
                htmlFor="name"
                label="Full Name"
                placeholder="Enter full name"
                type="text"
                error={errors?.fullName?.message}
                name={"fullName"}
                register={register}
              />
              <div className="mt-3 position-relative">
                <Input
                  htmlFor="email"
                  label="Email"
                  placeholder="Enter email"
                  type="text"
                  error={errors?.email?.message}
                  register={register}
                  name={"email"}
                />
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <p className="loginline-001">
                Already have an account?
                <Link to={browserRoutes.LOGIN}>
                  <span className="loginline-002"> Login</span>
                </Link>
              </p>
            </div>
            <div className="mt-4">
              <Button
                text="Sign Up"
                variant="primary"
                size="lg"
                type="submit"
                disabled={isLoading}
                isLoading={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="login-pagesidetwo">
        <div className="">
          <img className="widthforpic" src={LoginPic} />
        </div>
      </div>
    </div>
  );
};

export default Signup;
