import { useQuery } from "react-query";
import { api } from "../config/axiosConfig";
import { serverRoutes } from "../routes/serverRoutes";
import toast from "react-hot-toast";

const getUserProfile = () => {
  return api.get(serverRoutes.GET_USER);
};

export const useGetUser = () => {
  const { data } = useQuery("getUserProfile", getUserProfile, {
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error?.response?.data?.errors[0]?.message);
      console.error("user Fetching Error", error);
    },
  });
  return { user: data?.data?.data };
};
