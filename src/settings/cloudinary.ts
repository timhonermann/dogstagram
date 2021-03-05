import axios, { AxiosResponse } from "axios";
import { v4 } from "uuid";
import cloudinary from "cloudinary";

type CloudinaryApiResponse = cloudinary.UploadApiResponse;

const Cloudinary = {
  upload: async (
    image: string
  ): Promise<AxiosResponse<cloudinary.UploadApiResponse>> => {
    const formData = new FormData();
    formData.append("api_key", "");
    formData.append("file", image);
    formData.append("public_id", v4());
    formData.append("upload_preset", "dogstagram");

    const url = "https://api.cloudinary.com/v1_1/dogstagram/image/upload";

    return axios.post(url, formData);
  }
};

export { Cloudinary, CloudinaryApiResponse };
