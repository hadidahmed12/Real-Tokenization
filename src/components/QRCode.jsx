import React from "react";
import { QRCodeSVG } from "qrcode.react";

export const QRCodeComponent = ({
  referralLink,
  height = "124",
  width = "124",
  marginTop = "3",
  className,
}) => {
  return (
    <div
      style={{ width: `${height}px`, height: `${width}px` }}
      className={`d-flex justify-content-center align-items-center mt-${marginTop} Qrcodemobie ${className}`}
    >
      <QRCodeSVG
        // value={getReferralLink(referralLink)}
        value={referralLink}
        size={256}
        includeMargin={true}
      />
    </div>
  );
};
