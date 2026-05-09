import { useNavigate } from "react-router-dom";
import { serverRoutes } from "../routes/serverRoutes";
import { browserRoutes } from "../routes/browserRoutes";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { api } from "../config/axiosConfig";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setActiveStep } from "../store/slices/stepSlice";

const createProperty = (data) => {
  return api.post(serverRoutes.CREATE_PROPERTY, data);
};

export const useAddCreateProperty = () => {
  return useMutation(createProperty, {
    onSuccess: () => {
      toast.success(
        "Property added successfully, please click to Proceed to create Token"
      );
    },
    onError: (error) => {
      toast.error(error?.response?.data?.errors[0]?.message);
      console.log(" Errors", error);
    },
  });
};

const updateProperty = ({ id, data }) => {
  return api.patch(`${serverRoutes.UPDATE_PROPERTY}/${id}`, data);
};

export const useUpdateProperty = () => {
  return useMutation(updateProperty, {
    onSuccess: (data) => {
      toast.success(
        `${data?.data?.msg}, please click to Proceed to create Token.`
      );
    },
    onError: (error) => {
      toast.error(error?.response?.data?.errors[0]?.message);
      console.log("OTP Errors", error);
    },
  });
};

const deleteProperty = (id) => {
  return api.delete(`${serverRoutes.DELETE_PROPERTY}/${id}`);
};

export const useDeleteProperty = () => {
  const navigate = useNavigate();

  return useMutation(deleteProperty, {
    onSuccess: () => {
      toast.success("Property deleted successfully.");
      navigate(browserRoutes.PROPERTIES);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.errors[0]?.message || "Error deleting property."
      );
    },
  });
};

const propertyDetails = (id) => {
  return api.get(`${serverRoutes.GET_SINGLE_PROPERTY}/${id}`);
};

export const useGetSingleProperty = (id) => {
  return useQuery(["propertyDetails"], () => propertyDetails(id), {
    onSuccess: () => {},
    onError: (error) => {
      console.log("Property error", error);
    },
  });
};

const purchaseProperty = ({ data }) => {
  return api.post(serverRoutes.PURCHASE_PROPERTY, data);
};

export const usePurchaseProperty = (setIsLoading) => {
  const dispatch = useDispatch();

  return useMutation(purchaseProperty, {
    onSuccess: () => {
      setIsLoading(false);

      dispatch(setActiveStep(4));
    },
    onError: (error) => {
      setIsLoading(false);
      toast.error(error?.response?.data?.errors[0]?.message);
      console.log(
        "Failed to purchase properties.",
        error?.response?.data?.errors[0]?.message
      );
    },
  });
};

const claim = ({ claimData }) => {
  return api.post(serverRoutes.CLAIM, claimData);
};

export const useClaiming = (setIsLoading, setWalletAddress) => {
  const queryClient = useQueryClient();

  return useMutation(claim, {
    onSuccess: () => {
      toast.success("Successfully Claimed!");
      setIsLoading(false);
      setWalletAddress("");
      queryClient.invalidateQueries("propertyDetails");
    },
    onError: (error) => {
      setIsLoading(false);
      toast.error(error?.response?.data?.errors[0]?.message);
      console.log(
        "Failed to claim tokens",
        error?.response?.data?.errors[0]?.message
      );
    },
  });
};
