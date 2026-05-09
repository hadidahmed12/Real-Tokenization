import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { api } from "../config/axiosConfig";
import { serverRoutes } from "../routes/serverRoutes";
import { useDebounce } from "use-debounce";

const addKyc = (data) => {
  return api.post(serverRoutes.SUBMIT_KYC, data);
};

export const useAddKYCImages = (setBackSide, setFrontSide) => {
  const queryClient = useQueryClient();

  return useMutation(addKyc, {
    onSuccess: (data) => {
      toast.success(data?.data?.msg);
      setBackSide("");
      setFrontSide("");
      queryClient.invalidateQueries("getUserProfile");
    },
    onError: (error) => {
      console.log("error", error);
      toast.error(
        error?.response?.data?.msg || error?.response?.data?.errors[0]?.message
      );
    },
  });
};

const getUserKyc = async (skip, debou) => {
  const data = await api.get(
    `${
      serverRoutes.GET_ALL_KYC_REQUESTS
    }?query=${debou}&skip=${skip}&limit=${10}`
  );
  return data?.data;
};

export const useAllKycRequest = (skip = 0, query) => {
  const [debou] = useDebounce(query, 1000);

  return useQuery(
    ["getUserKycRequests", skip, debou],
    () => getUserKyc(skip, debou),
    {
      onSuccess: () => {},
      onError: (error) => {
        toast.error(error?.response?.data?.errors[0]?.message);
        console.error("user Fetching Error", error);
      },
    }
  );
};

const updateKycStatus = (data) => {
  return api.post(serverRoutes.UPDATE_KYC_STATUS, data);
};

export const useUpdateStatus = () => {
  const queryClient = useQueryClient();

  return useMutation(updateKycStatus, {
    onSuccess: (data) => {
      toast.success(data?.data?.msg);
      queryClient.invalidateQueries("getUserKycRequests");
    },
    onError: (error) => {
      console.log("error", error);
      toast.error(
        error?.response?.data?.msg || error?.response?.data?.errors[0]?.message
      );
    },
  });
};
