import { Modal } from "react-bootstrap";
import React, { useState } from "react";
// import { CopyIconss } from "../Icons/Icons";
import toast from "react-hot-toast";
import Input from "../Input";
// import { walletNames } from "../../utils/wallets";
// import { getWalletIcons } from "../../constant/walletIcons";
import { QRCodeComponent } from "../QRCode";

const DirectDepositModal = ({ show, handleClose, details }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (address) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(address).then(
        () => {
          setIsClicked(true);
          setTimeout(() => setIsClicked(false), 2000);
        },
        (err) => {
          console.error("Failed to copy: ", err);
          fallbackCopyTextToClipboard(address);
        }
      );
    } else {
      console.error("Clipboard API not supported");
      fallbackCopyTextToClipboard(address);
    }
  };

  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const successful = document.execCommand("copy");
      const msg = successful ? "successful" : "unsuccessful";
      toast.success("Address copied to clipboard!");
    } catch (err) {
      console.error("Fallback: Oops, unable to copy", err);
      toast.error("Failed to copy Address to clipboard.");
    } finally {
      if (textArea.parentNode === document.body) {
        document?.body?.removeChild(textArea);
      }
    }
  };

  return (
    <div>
      <Modal
        backdrop="static"
        size="lg"
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Body>
          <Modal.Title className="modal-title mt-2">Deposit</Modal.Title>
          <div className="mt-3 position-relative">
            <Input
              className="nfdsnfdkf"
              htmlFor="network"
              disabled
              value="Polygone"
              // value={walletNames(details.network)}
              style={{ WebkitAppearance: "none", MozAppearance: "textfield" }}
            />
            <div className="icon-input-crypto">
              {/* {getWalletIcons("ethUSDTWallet")} */}
            </div>
          </div>
          <div className="position-relative">
            <button className="mdkj3ehfury76567 d-flex justify-content-between pt-2 mt-3">
              <span className={`redgultedettxt pl-2 mr-2`}>
                {details.address}
              </span>
            </button>
            <div className="copy-iconforaddress78">
              <span
                onClick={() => handleClick(details.address)}
                onTouchStart={() => handleClick(details.address)} // Ensures compatibility with touch devices
                className={`pointer 
      ${isClicked ? "copy-click-effect123" : "nocopy-click-effect123"}
    `}
              >
                Copy
              </span>
              {isClicked && (
                <div style={{ color: "#fff" }} className="copy-feedback">
                  Copied!
                </div>
              )}
            </div>
          </div>
          <h4 className="redgultedettxt mt-3">
            Copy this wallet address to deposit the desired crypto.
          </h4>
          <h3 className="djnefu7t56789QR mt-3">OR</h3>

          <h4 className="djnefu7t56789 mt-3">Scan the following QR Code.</h4>

          <div className="d-flex justify-content-center align-items-center">
            <QRCodeComponent
              height="100"
              width="100"
              referralLink={details.address}
              className="mr-0"
            />
          </div>
          <h4 className="redgultedettxt mt-3">
            By proceeding you confirm, that you have ensured and correctly
            copied and pasted the recipient cryptocurrency wallet address from
            the platform. Please understand that cryptocurrency transactions are
            irreversible, and any funds sent to an incorrect address cannot be
            recovered. It is your responsibility to double-check the address
            before proceeding with the deposit. To ensure accuracy, it is
            advisable to perform a small test transaction before sending larger
            amounts.
          </h4>
          <div className="d-flex justify-content-center align-items-center">
            <button className="depositBtn mt-3" onClick={handleClose}>
              Done
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DirectDepositModal;
