import Input from "../../../components/Input";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { UploadIcondddssss } from "../../../components/Icons/Icons";
import "../Properties/property.css";
import { useState } from "react";
import { useAddCreateToken } from "../../../hooks/useToken";
import { useLocation } from "react-router-dom";
import Button from "../../../components/Button/index";
import { yupResolver } from "@hookform/resolvers/yup";
import { tokenSchema } from "../../../schemas/tokenSchema";

const CreateToken = () => {
  const { state } = useLocation();

  const { mutate, isLoading } = useAddCreateToken();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(tokenSchema),
    mode: "onSubmit",
  });

  const [imageFiles, setImageFiles] = useState();
  const handleImageChange = (event) => {
    setImageFiles(event.target.files[0]);
    setValue("icon", event.target.files[0]);
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    const suppli = Number(state?.price) / 150 || 0;

    Object.keys(data).forEach((key) => {
      if (!["icon"].includes(key)) {
        if (key === "supply") {
          formData.append(key, Math.round(suppli));
        } else {
          formData.append(key, data[key]);
        }
      }
    });
    formData.append("icon", imageFiles);
    formData.append("ownerName", "admin");
    formData.append("numberOfOwners", 10);
    formData.append("propertyId", state?._id);

    mutate(formData);
  };

  return (
    <div className="container-fluid main-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-xl-6">
            <div className="mt-3 position-relative">
              <Input
                {...register("name")}
                htmlFor="name"
                label="Name of Token"
                placeholder="Enter Name"
                type="text"
                name="name"
                error={errors?.name?.message}
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="mt-3 position-relative">
              <Input
                {...register("symbol")}
                htmlFor="symbol"
                label="Symbol Name"
                placeholder="Enter Symbol Name"
                type="text"
                name="symbol"
                error={errors?.symbol?.message}
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="mt-3 position-relative">
              <Input
                {...register("supply")}
                htmlFor="supply"
                label="Supply"
                placeholder="Enter"
                type="text"
                name="supply"
                disabled
                defaultValue={
                  Math.round(
                    // (Number(state?.price) + Number(state?.transactionCost)) /
                    Number(state?.price) / 150
                  ) || 0
                }
              />
            </div>
          </div>
          <div className="col-xl-6">
            <div className="mt-3 position-relative">
              <label className="form-label">Pictures</label>
              <div className="file-uploader">
                <label htmlFor="fileInput" className="upload-label">
                  {imageFiles ? (
                    <img
                      src={URL.createObjectURL(imageFiles && imageFiles)}
                      alt=""
                      className="fiedldImg"
                    />
                  ) : (
                    <span className="d-flex align-items-center p-0">
                      {" "}
                      <UploadIcondddssss />
                      Upload
                    </span>
                  )}
                </label>
                <input
                  type="file"
                  id="fileInput"
                  className="file-input"
                  {...register("icon")}
                  onChange={handleImageChange}
                />
              </div>
              {errors?.icon && (
                <p className="error-class-form">{errors?.icon?.message}</p>
              )}
            </div>
          </div>
          <div className="col-xl-6">
            <div className="mt-3 position-relative">
              <label className="form-label">Token Description</label>
              <div>
                <textarea
                  {...register("description")}
                  htmlFor="description"
                  className="textaree-908"
                  placeholder="Enter"
                  rows="5"
                  type="text"
                  name="description"
                />
              </div>
            </div>
            {errors?.description && (
              <p className="error-class-form">{errors?.description?.message}</p>
            )}
          </div>
        </div>
        <div className="row">
          <div className="d-flex">
            <Button
              className={`mt-4 ${
                isLoading ? "walletbtn-099434" : "walletbtn-0993"
              }`}
              text={"Proceed"}
              type={"submit"}
              disabled={isLoading}
              isLoading={isLoading}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateToken;
