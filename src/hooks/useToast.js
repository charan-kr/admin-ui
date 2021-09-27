import { useDispatch } from "react-redux";
import { toastMessage } from "../redux/toast/action";

export const useToast = () => {
  const dispatch = useDispatch();
  function toast({
    severity = "info",
    summary = "Summary Field is missing",
    ...rest
  }) {
    return dispatch(toastMessage({ severity, summary, ...rest }));
  }
  return toast;
};
