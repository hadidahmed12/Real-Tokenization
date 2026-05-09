import { Modal } from "react-bootstrap";
import Button from "../Button";

const KycModal = ({ show, handleClose, fronSide, backSide }) => {
  return (
    <Modal backdrop="static" show={show} onHide={handleClose} centered>
      <Modal.Body>
        <Modal.Title className="modal-title mt-2">KYC Images</Modal.Title>
        <div className="col-lg-12 col-md-12 col-sm-12 col-12 mb-3">
          <label>Front side Image</label>
          <img
            style={{ borderRadius: "5px" }}
            width="100%"
            height="100%"
            className=""
            src={fronSide}
            alt={`Frontside Image`}
          />
          <label>Back side Image</label>

          <img
            style={{ borderRadius: "5px" }}
            width="100%"
            height="100%"
            className=""
            src={backSide}
            alt={`Backside Image}`}
          />
        </div>
        <div className="d-flex justify-content-center">
          <Button
            text={"Close"}
            onClick={handleClose}
            className={"kycImgMod px-5"}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default KycModal;
