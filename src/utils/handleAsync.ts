// import axios from "axios";

// export const axiosErrorCatch = (error: unknown): string => {
//   if (axios.isAxiosError(error)) {
//     // If the error is an Axios error
//     if (error.response) {
//       return (
//         error.response.data?.message ||
//         `Error: ${error.response.status} - ${error.response.statusText}`
//       );
//     } else if (error.request) {
//       return "No response received from the server. Please try again later.";
//     } else {
//       return `Error in request setup: ${error.message}`;
//     }
//   } else if (error instanceof Error) {
//     return `Error: ${error.message}`;
//   } else {
//     return "An unknown error occurred. Please try again.";
//   }
// };


import { toast } from "react-toastify";


type AsyncFunction<T> = (...args: unknown[]) => Promise<T>;

const handleAsync = <T>(fn: AsyncFunction<T>) => {
  return async (...args: unknown[]): Promise<T | null> => {
    try {
      return await fn(...args); 
    } catch (error: unknown) {
      console.error("API Error:", error);

      if (error instanceof Error) {
        toast.error(error.message || "Something went wrong!");
      } else if (isAxiosError(error)) {
        if (error.response) {
          if (error.response.status >= 500) {
            toast.error("Server error, please try again later");
          } else {
            toast.warning(error.response.data?.message || "Something went wrong!");
          }
        }
      } else if (isAxiosError(error)) {
        toast.error("Network error, please try again later");
      } else {
        toast.error("Something went wrong!");
      }

      return null; 
    }
  };
};


function isAxiosError(error: unknown): error is { response?: { status: number; data?: { message?: string } } } {
  return typeof error === "object" && error !== null && "response" in error;
}

export default handleAsync;
