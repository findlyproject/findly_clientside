import { httpService } from "./httpService";

// Define types for the response and file types
interface UploadResponse {
  url: string;
  // Add other response properties as needed
}

type ResourceType = "image" | "video";

interface UploadRequest {
  file: string;
  resourceType: ResourceType;
}

// Convert file to base64
const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

// Generic upload function to reduce code duplication
const uploadFile = async (
  ev: React.ChangeEvent<HTMLInputElement>,
  resourceType: ResourceType
): Promise<UploadResponse> => {
  try {
    const file = ev.target.files?.[0];

    if (!file) {
      throw new Error("No file selected");
    }

    const base64File = await toBase64(file);

    const response = await httpService.post<UploadResponse>("cloudinary/upload", {
      file: base64File,
      resourceType,
    } as UploadRequest);

    return response;
  } catch (err) {
    console.error(`Error uploading ${resourceType}:`, err instanceof Error ? err.message : String(err));
    throw err;
  }
};

export const uploadImg = async (
  ev: React.ChangeEvent<HTMLInputElement>
): Promise<UploadResponse> => {
  return uploadFile(ev, "image");
};

export const uploadVid = async (
  ev: React.ChangeEvent<HTMLInputElement>
): Promise<UploadResponse> => {
  return uploadFile(ev, "video");
};