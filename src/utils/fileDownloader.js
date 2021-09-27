const MIME_TYPES = {
  pdf: "application/pdf",
  gif: "image/gif",
  doc: "application/octet-stream",
  jpeg: "image/jpeg",
  png: "image/png",
  svg: "image/svg+xml",
  csv: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

const signatures = {
  J: MIME_TYPES.pdf,
  R: MIME_TYPES.gif,
  0: MIME_TYPES.doc,
  "/": MIME_TYPES.jpeg,
  i: MIME_TYPES.png,
  P: MIME_TYPES.svg,
  V: MIME_TYPES.csv,
  U: MIME_TYPES.xlsx,
};

const detectMimeType = (b64) => {
  for (var s in signatures) {
    if (b64.indexOf(s) === 0) {
      return signatures[s];
    }
  }
  return 0;
};
export const getBase64Url = (base64) =>
  `data:${detectMimeType(base64)};base64,` + base64; //Image Base64 Goes here

export const downloadFile = (base64, name = null) => {
  let filename = name;
  const url = getBase64Url(base64);

  if (!filename) {
    const signature = detectMimeType(base64);
    if (signature) {
      let index = Object.values(MIME_TYPES).indexOf(signature);
      if (index !== -1) filename = `filename.${MIME_TYPES[index]}`;
      else return 0;
    } else return 0;
  }

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  // Append to html link element page
  document.body.appendChild(link);

  // Start download
  link.click();

  // Clean up and remove the link
  link.parentNode.removeChild(link);

  return 1;
};
