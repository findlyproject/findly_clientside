
import { toast } from "react-toastify";


type AsyncFunction<T> = (...args: unknown[]) => Promise<T>;


const handleAsync = async <T>(fn: AsyncFunction<T>): Promise<T | null> => {
  try {
    return await fn();
  } catch (error: unknown) {
    console.error("API Error:", error);


    if (isAxiosError(error)) {
      if (error.response) {
        if (error.response.status >= 500) {
          toast.error("Server error, please try again later");
        } else {
          toast.warning(error.response.data?.message || "Something went wrong!");
        }
      } else {
        toast.error("Network error, please try again later");
      }
    } else if (error instanceof Error) {
      toast.error(error.message || "Something went wrong!");
    } else {
      toast.error("Something went wrong!");
    }
    
    return null;
  }
};

function isAxiosError(error: unknown): error is { response?: { status: number; data?: { message?: string } } } {
  return typeof error === "object" && error !== null && "response" in error;
}

export default handleAsync;
