import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const successNotification = (message) => {
  toast.success(message, { position: toast.POSITION.BOTTOM_RIGHT });
};

const errorNotification = (message) => {
  toast.error(message, { position: toast.POSITION.BOTTOM_RIGHT });
};

export { successNotification, errorNotification };
