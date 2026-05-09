import { useMutation, useQuery, useQueryClient } from "react-query";
import { api } from "../config/axiosConfig";
import { serverRoutes } from "../routes/serverRoutes";
import { useNavigate } from "react-router-dom";
import { browserRoutes } from "../routes/browserRoutes";
import toast from "react-hot-toast";
import { useDebounce } from "use-debounce";

const getAllTokens = (skip, debou) => {
  return api.get(
    `${serverRoutes.GET_ALL_TOKENS}?skip=${skip}&limit=${10}&query=${debou}`
  );
};

export const useGetAlLToken = (skip = 0, query) => {
  const [debou] = useDebounce(query, 1000);

  return useQuery(
    ["getAllTokens", skip, debou],
    () => getAllTokens(skip, debou),
    {
      onSuccess: () => {},
      onError: (error) => {
        toast.error(error?.response?.data?.errors[0]?.message);
        console.error("Cards Fetching Error", error);
      },
    }
  );
};

const finaliseSale = (data) => {
  return api.post(serverRoutes.FINALISE_SALE, { saleId: data });
};

export const useFinaliseSale = () => {
  return useMutation(finaliseSale, {
    onSuccess: (data) => {
      toast.success(data?.data?.msg);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.errors[0]?.message);
    },
  });
};

const createToken = (data) => {
  return api.post(serverRoutes.ADD_TOKEN, data);
};

export const useAddCreateToken = () => {
  const navigate = useNavigate();

  return useMutation(createToken, {
    onSuccess: (data) => {
      toast.success(data?.data?.msg);
      navigate(browserRoutes.TOKEN);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.errors[0]?.message);
    },
  });
};

const startSale = (data) => {
  return api.post(serverRoutes.START_SALE, data);
};

export const useStartSale = (handleClose) => {
  const queryClient = useQueryClient();

  return useMutation(startSale, {
    onSuccess: (data) => {
      toast.success(data?.data?.msg);
      queryClient.invalidateQueries("getAllTokens");
      handleClose();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.errors[0]?.message);
      console.log("start sale Errors", error);
    },
  });
};
