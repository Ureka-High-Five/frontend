import { toast } from "sonner";
import { Success, Warning } from "@/assets/svg";

type ToastVariant = "success" | "warning";

export const makeToast = (message: string, variant: ToastVariant) => {
  toast.custom(
    () => (
      <div className="flex items-center w-[300px] gap-3 px-5 py-3 rounded-xl bg-[#363636] shadow-xl shadow-black/50">
        <img src={variant === "success" ? Success : Warning} alt={variant} />
        <span className="body-lg-pretendard text-white">{message}</span>
      </div>
    ),
    {
      duration: 3000,
    }
  );
};
