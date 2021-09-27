export const useLogs = () => {
  const isProduction = process.env.NODE_ENV === "production";
  const debugStatus = true;

  function checkDisplay() {
    if (!isProduction && debugStatus) return true;

    return false;
  }

  function debugLog(payload) {
    if (checkDisplay()) return console.log(payload);
    return null;
  }
  function debugError(errors) {
    if (checkDisplay()) return console.error(errors);
    return null;
  }
  function debugAlert(payload) {
    if (checkDisplay()) return alert(JSON.stringify(payload));
    return;
  }

  return { debugLog, debugError, debugAlert };
};
