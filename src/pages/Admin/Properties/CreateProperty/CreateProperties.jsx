import Input from "../../../../components/Input";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  CancelIcon,
  DatePicketIcon,
  RedUploadIcon,
  UploadIcondddssss,
} from "../../../../components/Icons/Icons";
import "../property.css";
import { useState } from "react";
import { useAddCreateProperty } from "../../../../hooks/useProperties";
import { ameniteisOptions } from "../../../../constant/propertyOptions";
import MultiSelectDropdown from "../../../../components/MultiSelect/Index";
import { browserRoutes } from "../../../../routes/browserRoutes";
import { useNavigate } from "react-router-dom";
import { propertySchema } from "../../../../schemas/propertySchema";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../../../components/Button/index";

const CreateProperties = () => {
  const { mutate, isLoading, isSuccess, data } = useAddCreateProperty();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(propertySchema),

    mode: "onChange",
  });

  const [latestFundDate, setLatestFundDate] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [thumbnail, setThumbnail] = useState();
  const [documentFiles, setDocumentFiles] = useState([]);
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length) {
      setImageFiles((prev) => [...prev, ...files]);
      setValue("images", [...imageFiles, ...files]);
    }
  };

  const handleCancelImage = (index, e) => {
    e.stopPropagation();
    e.preventDefault();
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleThumnailChange = (event) => {
    setThumbnail(event.target.files[0]);
    setValue("thumbnail", event.target.files[0]);
  };

  const handleCancelDocs = (index, e) => {
    e.stopPropagation();
    e.preventDefault();
    setDocumentFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDocumentChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length) {
      setDocumentFiles((prev) => [...prev, ...files]);
      setValue("documents", [...documentFiles, ...files]);
    }
  };
  const type = watch("type");
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const excludedKeys = ["latestFundDate", "thumbnail", "images", "documents"];
    const formData = new FormData();

    if (data.amenities) {
      const sanitizedAmenities = Array.isArray(data.amenities)
        ? [
            ...new Set(
              data.amenities.flatMap((item) =>
                typeof item === "string"
                  ? item.split(",").map((i) => i.trim())
                  : item
              )
            ),
          ]
        : [];

      sanitizedAmenities.forEach((amenity, index) => {
        formData.append(`amenities[${index}]`, amenity);
      });
    }

    Object.keys(data).forEach((key) => {
      if (!excludedKeys.includes(key) && key !== "amenities") {
        if (key === "price") {
          const price = parseFloat(data[key]);
          formData.append(key, isNaN(price) ? 0 : price);
        } else {
          formData.append(key, data[key]);
        }
      }
    });
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });
    documentFiles.forEach((file) => {
      formData.append("documents", file);
    });
    formData.append("thumbnail", thumbnail);
    formData.append("latestFundDate", latestFundDate?.toISOString());
    mutate(formData);
  };

  return (
    <div className="container-fluid main-container">
      <h2 className="main-title-09888 pt-4">Create Property</h2>
      <div className="row">
        <div className="col-xl-6">
          <div className="mt-3 position-relative">
            <Input
              {...register("title")}
              htmlFor="title"
              label="Name of Property"
              placeholder="Enter Name"
              type="text"
              name="title"
              error={errors?.title?.message}
            />
          </div>
        </div>
        <div className="col-xl-6">
          <div className="mt-3 position-relative">
            <Input
              {...register("initialInvestment", {
                setValueAs: (value) => parseFloat(value),
              })}
              htmlFor="initialInvestment"
              label="Initial Investment Threshold"
              placeholder="e.g 150 USDT"
              type="text"
              name="initialInvestment"
              error={errors?.initialInvestment?.message}
            />
          </div>
        </div>
        <div className="col-xl-6">
          <div className="mt-3 position-relative">
            <label htmlFor="media-type" className="form-label">
              Type
            </label>
            <select
              {...register("type")}
              name="type"
              className="form-control"
              required
            >
              <option style={{ color: "#b4a9a9" }} value="" disabled>
                Type
              </option>
              <option value="bed">Bed</option>
              <option value="studio">Studio</option>
            </select>
          </div>
        </div>
        <div className="col-xl-6">
          <div className="mt-3 position-relative">
            <Input
              {...register("numberOfBed", {
                setValueAs: (value) => (value === "" ? 0 : parseFloat(value)),
              })}
              htmlFor="numberOfBed"
              label="Number Of Bed"
              placeholder="0"
              type="number"
              name="numberOfBed"
              disabled={type === "studio"}
              error={errors?.numberOfBed?.message}
            />
          </div>
        </div>
        <div className="col-xl-6">
          <div className="mt-3 position-relative">
            <Input
              {...register("size")}
              htmlFor="size"
              label="Property Size in Sq.Ft"
              placeholder="300"
              type="text"
              name="size"
              error={errors?.size?.message}
            />
          </div>
        </div>
        <div className="col-xl-6">
          <div className="mt-3 position-relative">
            <Input
              {...register("price")}
              htmlFor="price"
              label="Price"
              placeholder="USDT"
              type="text"
              name="price"
              error={errors?.price?.message}
            />
          </div>
        </div>
        <div className="col-xl-6">
          <div className="mt-3 position-relative">
            <Input
              {...register("transactionCost")}
              htmlFor="transactionCost"
              label="Transaction Cost"
              placeholder="e.g 40000 USDT"
              type="text"
              name="transactionCost"
              error={errors?.transactionCost?.message}
            />
          </div>
        </div>
        <div className="col-xl-6">
          <div className="mt-3 position-relative">
            <Input
              {...register("propertyValueGrowth")}
              htmlFor="accountTitle"
              label="Property Value Growth"
              placeholder="e.g 10%"
              type="text"
              name="propertyValueGrowth"
              error={errors?.propertyValueGrowth?.message}
            />
          </div>
        </div>

        <div className="col-xl-6">
          <div className="mt-3 position-relative">
            <Input
              {...register("annualRental")}
              htmlFor="annualRental"
              label="Expected Annual Gross Rent (Year 1)"
              placeholder="e.g 24000 USDT"
              type="text"
              name="annualRental"
              error={errors?.annualRental?.message}
            />
          </div>
        </div>
        <div className="col-xl-6">
          <div className="mt-3 position-relative">
            <Input
              {...register("serviceCharges")}
              htmlFor="serviceCharges"
              label="Expected Service Charges (Year 1)"
              placeholder="e.g 2400 USDT"
              type="text"
              name="serviceCharges"
              error={errors?.serviceCharges?.message}
            />
          </div>
        </div>
        <div className="col-xl-6">
          <div className="mt-3 position-relative">
            <Input
              {...register("maintainceCost")}
              htmlFor="maintainceCost"
              label="Mgmt. and Maintanance Cost (Year 1)"
              placeholder="e.g 3000 USDT"
              type="text"
              name="maintainceCost"
              error={errors?.maintainance?.message}
            />
          </div>
        </div>

        <div className="col-xl-6">
          <div className="mt-3 position-relative">
            <Input
              {...register("location")}
              htmlFor="location"
              label="Location"
              placeholder="Enter Location"
              type="text"
              name="location"
              error={errors?.location?.message}
            />
          </div>
        </div>

        <div className="col-xl-6">
          <div className="mt-3 position-relative">
            <label className="form-label">Property Overview</label>
            <div>
              <textarea
                {...register("description")}
                htmlFor="accountTitle"
                className="textaree-908"
                placeholder="Enter"
                rows="5"
                type="text"
                name="description"
              />
              {errors?.description && (
                <p className="error-class-form">
                  {errors?.description?.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="col-xl-6">
          <div className="mt-3 position-relative">
            <Input
              {...register("currentValuation", {
                setValueAs: (value) => parseFloat(value),
              })}
              htmlFor="currentValuation"
              label="Current Valuation"
              placeholder="USDT"
              type="text"
              name="currentValuation"
              error={errors?.currentValuation?.message}
            />
          </div>
        </div>
        <div className="col-xl-6">
          <div className="mt-3 position-relative">
            <label className="form-label">Pictures</label>
            <div className="file-uploader">
              <label
                className="upload-label"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="upload-text pl-2 mx-1 ">
                  {imageFiles.length > 0
                    ? imageFiles?.map((img, i) => (
                        <div className="image-preview" key={i}>
                          <img
                            src={URL.createObjectURL(img)}
                            alt=""
                            className="fiedldImg"
                          />
                          <span
                            className="cancel-icon"
                            onClick={(e) => handleCancelImage(i, e)}
                          >
                            <CancelIcon />
                          </span>
                        </div>
                      ))
                    : "Upload"}
                </span>
                <span>
                  <RedUploadIcon
                    onClick={(e) => {
                      e.stopPropagation();
                      document.getElementById("fileInput").click();
                    }}
                  />
                  <input
                    type="file"
                    id="fileInput"
                    className="file-input"
                    {...register("images")}
                    onChange={handleImageChange}
                    accept="image/jpeg,image/png,image/gif,image/jpg"
                    multiple
                  />
                </span>
              </label>
            </div>
            {errors?.images && (
              <p className="error-class-form">{errors?.images?.message}</p>
            )}
          </div>
        </div>
        <div className="col-xl-6">
          <div className="mt-3 position-relative">
            <label className="form-label">Thumbnail</label>
            <div className="file-uploader">
              <label htmlFor="thumbnail" className="upload-label">
                <span className="upload-text pl-2">
                  {thumbnail ? (
                    <img
                      src={URL.createObjectURL(thumbnail && thumbnail)}
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
                </span>
              </label>
              <input
                type="file"
                id="thumbnail"
                className="file-input"
                {...register("thumbnail")}
                onChange={handleThumnailChange}
                accept="image/jpeg,image/png,image/gif,image/jpg"
              />
            </div>
            {errors?.thumbnail && (
              <p className="error-class-form">{errors?.thumbnail?.message}</p>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-6">
          <div className="mt-3 position-relative">
            <label className="form-label">Documents</label>
            <div className="file-uploader">
              <label
                htmlFor="docInput"
                className="upload-label"
                onClick={(e) => e.stopPropagation()}
              >
                <UploadIcondddssss />
                <span className="upload-text pl-2">
                  {documentFiles.length > 0
                    ? documentFiles.map((file, i) => (
                        <div className="image-preview" key={i}>
                          {file?.name}
                          <span
                            className="cancel-icon-docs"
                            onClick={(e) => handleCancelDocs(i, e)}
                          >
                            <CancelIcon />
                          </span>
                        </div>
                      ))
                    : "Upload"}
                </span>
              </label>
              <input
                type="file"
                id="docInput"
                className="file-input"
                {...register("documents")}
                onChange={handleDocumentChange}
                accept="application/pdf,application/msword,application/odt,application/xlsx,application / vnd.openxmlformats - officedocument.spreadsheetml.sheet"
                multiple
              />
            </div>
            {errors && (
              <p className="error-class-form">{errors?.documents?.message}</p>
            )}
          </div>
        </div>
        <div className="col-xl-6">
          <div className="mt-3 position-relative">
            <Controller
              control={control}
              name="latestFundDate"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <div className="mt-3 position-relative">
                  <label className="form-label"> Latest Funding Date</label>
                  <div className="date-picker-container">
                    <DatePicker
                      selected={value}
                      onChange={(date) => {
                        onChange(date);
                        setLatestFundDate(date);
                      }}
                      placeholderText="MM/DD/YYYY"
                      className="date-input"
                    />
                    <div className="datepicker-09889">
                      <DatePicketIcon />
                    </div>
                  </div>
                  {error && <p className="error-class-form">{error.message}</p>}
                </div>
              )}
            />
          </div>
        </div>
        <div className="col-xl-6"></div>
        <div className="col-xl-6">
          <div className="position-relative"></div>
        </div>
        <div className="col-lg-6 col-md-12 ">
          <div className="mt-3 position-relative form-label">
            <MultiSelectDropdown
              control={control}
              name="amenities"
              options={ameniteisOptions}
              label="Amenities"
              error={errors?.amenities?.message}
            />
          </div>
        </div>
        {/* <div className="col-xl-6">
          <div className="position-relative mt-3">
            {/* <label className="form-label">Last Funding Date</label>
            <div className="date-picker-container">
              <DatePicker
                selected={lastFundedDate}
                onChange={(date) => setLastFundedDate(date)}
                placeholderText="MM/DD/YYYY"
                className="date-input"
              />
              <div className="datepicker-09889">
                <DatePicketIcon />
              </div>
            </div>
            {errors.lastFundDate && (
              <p className="error-class-form">
                {errors?.startFundDate?.message}
              </p>
            )} */}
        {/* <Controller
              control={control}
              name="lastFundedDate"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <div className="mt-3 position-relative">
                  <label className="form-label">Last Funding Date</label>
                  <div className="date-picker-container">
                    <DatePicker
                      selected={value}
                      onChange={(date) => {
                        onChange(date);
                        setLastFundedDate(date);
                      }}
                      placeholderText="MM/DD/YYYY"
                      className="date-input"
                    />
                    <div className="datepicker-09889">
                      <DatePicketIcon />
                    </div>
                  </div>
                  {error && <p className="error-class-form">{error.message}</p>}
                </div>
              )}
            /> */}
        {/* </div>
        </div> */}{" "}
        <div className="col-xl-6"></div>
        <div className="d-flex mt-4 mx-3">
          {!isSuccess ? (
            <Button
              className={`mt-4 ${
                isLoading ? "walletbtn-099434" : "walletbtn-0993"
              }`}
              text={"Create"}
              disabled={isLoading}
              isLoading={isLoading}
              onClick={handleSubmit(onSubmit)}
            />
          ) : (
            <div className="ml-3">
              <Button
                text={"Proceed"}
                type="submit"
                className="savedraftbtrn mt-4"
                // onClick={saveAsDraft}
                onClick={() =>
                  navigate(browserRoutes.CREATE_TOKEN, {
                    state: data?.data?.data,
                  })
                }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateProperties;
