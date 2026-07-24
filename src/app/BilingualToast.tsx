import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";

const TOAST_ID = "bilingual-notice";

export function BilingualToast() {
  const { t } = useTranslation();

  useEffect(() => {
    if (toast.isActive(TOAST_ID)) {
      return;
    }

    toast.info(t("general.bilingualNotice"), {
      toastId: TOAST_ID,
      position: "bottom-right",
      autoClose: 6000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  }, [t]);

  return <ToastContainer />;
}
