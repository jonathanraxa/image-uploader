import { message } from "antd";

import { deleteImage } from "../api";
import type { ImageItem } from "../types";

interface UseDeleteProps {
  updateImages: () => void;
}

export const useDelete = ({ updateImages }: UseDeleteProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  const success = (imageName: string) => {
    messageApi.success(`Successfully deleted ${imageName}!`);
  };

  const handleDeleteImage = (img: ImageItem) => {
    deleteImage(img.id)
      .then(() => {
        success(img.originalName);
        updateImages();
      })
      .catch((error: any) => {
        console.error("Delete failed:", error);
      });
  };

  return { handleDeleteImage, contextHolder };
};
