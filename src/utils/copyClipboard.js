import toast from "react-hot-toast";

export const handleCopyCommon = (idd, title) => {
  if (idd) {
    if (navigator.clipboard) {
      navigator?.clipboard
        ?.writeText(idd)
        .then(() => {
          toast.success(`${title} copied to the clipboard!`);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
          fallbackCopyTextToClipboardCommon(idd, title);
        });
    } else {
      fallbackCopyTextToClipboardCommon(idd, title);
    }
  }
};

const fallbackCopyTextToClipboardCommon = (text, title) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    const successful = document.execCommand("copy");
    toast.success(`${title} copied to the clipboard!`);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
    toast.error(`Failed to copy ${title} to clipboard.`);
  } finally {
    if (textArea.parentNode === document.body) {
      document?.body?.removeChild(textArea);
    }
  }
};
