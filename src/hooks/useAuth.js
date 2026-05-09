import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { api, authApi } from "../config/axiosConfig";
import { serverRoutes } from "../routes/serverRoutes";
import { browserRoutes } from "../routes/browserRoutes";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/authSlice";
import { ROLES } from "../constant/roles";
import { useDebounce } from "use-debounce";

const register = (data) => {
  return authApi.post(serverRoutes.SIGN_UP, data);
};

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation(register, {
    onSuccess: (data) => {
      toast.success("Please check your email for OTP!");
      navigate(browserRoutes.VERIFY_EMAIL);
    },
    onError: (error) => {
      console.log("error", error);
      toast.error(
        error.response.data.msg || error?.response?.data?.errors[0]?.message
      );
    },
  });
};

const create = (data) => {
  return authApi.post(serverRoutes.CREATE_PASSWORD, data);
};

export const useCreatePassword = () => {
  const navigate = useNavigate();
  return useMutation(create, {
    onSuccess: (data) => {
      toast.success("Password created Successfully");
      navigate(browserRoutes.ADD_CONTACT);
    },
    onError: (error) => {
      console.log("error", error);
      toast.error(error?.response?.data?.errors[0]?.message);
    },
  });
};

const update = (data) => {
  return authApi.post(serverRoutes.UPDATE_PASSWORD, data);
};

export const useUpdatePassword = () => {
  const navigate = useNavigate();
  return useMutation(update, {
    onSuccess: (data) => {
      toast.success("Password updated Successfully");
      navigate(browserRoutes.LOGIN);
    },
    onError: (error) => {
      console.log("error", error);
      toast.error(error?.response?.data?.errors[0]?.message);
      // toast.error(error?.response?.data?.[0]?.message);
      // toast.error(error?.response?.data?.msg);
    },
  });
};

const addPhon = (data) => {
  return authApi.post(serverRoutes.ADD_CONTACT, data);
};

export const useAddPhone = () => {
  const navigate = useNavigate();
  return useMutation(addPhon, {
    onSuccess: (data) => {
      toast.success("Phone Number Added Successfully");
      navigate(browserRoutes.VERIFY_PHONE_NUMBER);
    },
    onError: (error) => {
      console.log("error", error);
      toast.error(error?.response?.data?.errors[0]?.message);
      // toast.error(error?.response?.data?.[0]?.message);
      // toast.error(error?.response?.data?.msg);
    },
  });
};

const login = (data) => {
  return authApi.post(serverRoutes.LOGIN, data);
};

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation(login, {
    onSuccess: (data) => {
      console.log("Login", data);
      dispatch(setUser(data?.data));
      if (data.data.role === ROLES.ADMIN) {
        navigate(browserRoutes.PROPERTIES);
      } else if (data.data.isFullyRegistered === false) {
        navigate(browserRoutes.ADD_CONTACT);
      } else {
        navigate(browserRoutes.DASHBOARD);
      }
      toast.success("Signed In successfully!");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.msg || error?.response?.data?.errors[0]?.message
      );
      console.log("Error", error);
    },
  });
};

const verifyOtp = (data) => {
  return authApi.post(serverRoutes.VERIFY_OTP, data);
};

export const useVerfiyOTP = () => {
  const navigate = useNavigate();

  return useMutation(verifyOtp, {
    onSuccess: (data) => {
      toast.success("Email verified successfully!");
      navigate(browserRoutes.CREATE_PASSWORD);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.errors[0]?.message);
      console.log("OTP Errors", error);
    },
  });
};

const verifyPhoneNumber = (data) => {
  return authApi.post(serverRoutes.VERIFY_PHONE_NUMBER, data);
};

export const useVerfiyPhoneNumber = () => {
  const navigate = useNavigate();

  return useMutation(verifyPhoneNumber, {
    onSuccess: (data) => {
      console.log("OTP1", data);
      toast.success("Phone Number verified successfully!");
      navigate(browserRoutes.LOGIN);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.errors[0]?.message);
      console.log("OTP Errors", error);
    },
  });
};

const getAllProperty = async (status, skip, limit, query, isRemoved) => {
  const data = await api.get(
    `${serverRoutes.GET_ALL_PROPERTY}?status=${status}&skip=${skip}&limit=${limit}&query=${query}&isRemoved=${isRemoved}`
  );
  return data?.data;
};

export const useGetAllProperty = (
  status,
  skip = 0,
  limit,
  query,
  isRemoved
) => {
  const [debou] = useDebounce(query, 1000);
  return useQuery(
    ["getAllProperties", status, skip, limit, debou, isRemoved],
    () => getAllProperty(status, skip, limit, debou, isRemoved),
    {
      onSuccess: (data) => {
        // toast.success("Get All Cards Details successfully!");
      },
      onError: (error) => {
        toast.error(error?.response?.data?.errors[0]?.message);
        console.error("Cards Fetching Error", error);
      },
    }
  );
};

const getAllUsers = async () => {
  const response = await api.get(`${serverRoutes.GET_ALL_USERS}`);
  return response.data;
};

export const useGetAllUsers = () => {
  return useQuery(["getAllUsers"], () => getAllUsers(), {
    onSuccess: (data) => {},
    onError: (error) => {
      console.error("USer Fetching Error", error);
    },
  });
};

const resetPassword = (data) => {
  return authApi.post(serverRoutes.FORGOT_PASSWORD, data);
};

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation(resetPassword, {
    onSuccess: (data) => {
      // toast.success("Email verified successfully!");
      toast.success(data?.data?.msg);
      navigate(browserRoutes.VERIFY_OTP);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.msg || error?.response?.data?.errors[0]?.message
      );
      console.log("OTP Errors", error);
    },
  });
};

const resetPasswordOtp = (data) => {
  return authApi.post(serverRoutes.FORGOT_PASSWORD_OTP, data);
};

export const useResetPasswordOTP = () => {
  const navigate = useNavigate();

  return useMutation(resetPasswordOtp, {
    onSuccess: (data) => {
      toast.success("Email verified successfully!");
      navigate(browserRoutes.CREATE_NEW_PASSWORD);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.errors[0]?.message);
      console.log("OTP Errors", error);
    },
  });
};

const resendOTP = (data) => {
  return authApi.post(serverRoutes.RESEND_OTP, data);
};

export const useResendOTP = (setTimeLeft) => {
  return useMutation(resendOTP, {
    onSuccess: (data) => {
      toast.success(data?.data?.msg);
      setTimeLeft(10);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.errors[0]?.message);
      console.log("RESND OTP Errors", error);
    },
  });
};
