import React from "react";
import { Button, Upload } from "antd";
import { uploadImage } from "../../api";
import "./upload-button.scss";

export interface UploadButtonProps {
  updateImages: () => void;
}

export const UploadButton: React.FC<UploadButtonProps> = ({ updateImages }) => {
  return (
    <div className="upload-button-container">
      <Upload
        name="image"
        accept=".jpg,.jpeg,.png,.gif"
        onChange={({ file }) => {
          console.log("File changed:", file);
          uploadImage(file)
            .then(() => {
              updateImages();
            })
            .catch((error: any) => {
              console.error("Upload failed:", error);
            });
        }}
        beforeUpload={() => false}
        showUploadList={false}
      >
        <Button>Upload</Button>
      </Upload>
    </div>
  );
};
