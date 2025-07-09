import { deleteImage } from "../api";
import type { ImageItem } from "../types";

interface UseDeleteProps {
  updateImages: () => void;
}

export const useDelete = ({ updateImages }: UseDeleteProps) => {
  const handleDeleteImage = (img: ImageItem) => {
    deleteImage(img.id)
      .then(() => {
        updateImages();
      })
      .catch((error: any) => {
        console.error("Delete failed:", error);
      });
  };

  return { handleDeleteImage };
};
