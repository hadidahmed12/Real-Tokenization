import { serverRoutes } from "../routes/serverRoutes";
import { api } from "../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import { browserRoutes } from "../routes/browserRoutes";

const addBank = (data) => {
  return api.post(serverRoutes.ADD_BANK, data);
};

export const useAddBank = () => {
  const navigate = useNavigate();

  return useMutation(addBank, {
    onSuccess: () => {
      toast.success("Bank Account Added successfully!");
      navigate(browserRoutes.WALLET);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.msg || error?.response?.data?.errors[0]?.message
      );
      console.log("OTP Errors", error);
    },
  });
};

const getAllBank = () => {
  return api.get(serverRoutes.GET_ALL_BANK);
};

export const useGetAllBank = () => {
  return useQuery("getAllBanks", getAllBank, {
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error?.response?.data?.errors[0]?.message);
      console.error("Bank Fetching Error", error);
    },
    refetchOnWindowFocus: false,
  });
};

const getAllCards = () => {
  return api.get(serverRoutes.GET_ALL_CARD);
};

export const useGetAllCards = () => {
  return useQuery("getAllCards", getAllCards, {
    onSuccess: () => {},
    onError: (error) => {
      // toast.error(error?.response?.data?.errors[0]?.message);
      console.error("Cards Fetching Error", error);
    },
    refetchOnWindowFocus: false,
  });
};

const withdrawCrypto = (data) => {
  return api.post(serverRoutes.WITHDRAW_FUNDS, data);
};

export const useWithdrawCrypto = (handleClose) => {
  const queryClient = useQueryClient();

  return useMutation(withdrawCrypto, {
    onSuccess: (data) => {
      toast.success(data?.data?.msg);
      handleClose();
      queryClient.invalidateQueries("walletBalance");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.msg || error?.response?.data?.errors[0]?.message
      );
      console.log("OTP Errors", error);
    },
  });
};

const deleteBank = (cardId) => {
  return api.delete(`${serverRoutes.DELETE_BANK}/${cardId}`);
};

export const useDeleteBank = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteBank, {
    onSuccess: (data) => {
      toast.success(data?.data?.msg);
      queryClient.invalidateQueries("getAllBanks");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.errors[0]?.message || "Error deleting Bank."
      );
    },
  });
};

const deleteCard = (cardId) => {
  return api.delete(`${serverRoutes.DELETE_CARD}/${cardId}`);
};

export const useDeleteCard = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteCard, {
    onSuccess: (data) => {
      toast.success(data?.data?.msg);
      queryClient.invalidateQueries("getAllCards");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.errors[0]?.message || "Error deleting Bank."
      );
    },
  });
};

const gtAllTransactions = async (skip) => {
  const data = await api.get(
    `${serverRoutes.GET_WALLET_TRANSACTIONS}?skip=${skip}&limit=5`
  );
  return data?.data;
};

export const useGetAllTransactions = (skip) => {
  return useQuery(["getAllCards", skip], () => gtAllTransactions(skip), {
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error?.response?.data?.errors[0]?.message);
      console.error("Cards Fetching Error", error);
    },
    refetchOnWindowFocus: false,
  });
};

const getWalletBalance = async () => {
  const data = await api.get(`${serverRoutes.GET_WALLET_BALANCE}`);
  return data?.data;
};

export const useGetWalletBalance = () => {
  return useQuery(["walletBalance"], () => getWalletBalance(), {
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error?.response?.data?.errors[0]?.message);
      console.error("Cards Fetching Error", error);
    },
    refetchOnWindowFocus: false,
  });
};
