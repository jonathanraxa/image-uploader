import React from "react";
import { Button, Upload, message } from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { uploadImage } from "../../api";
import "./upload-button.scss";

interface UploadButtonProps {
  updateImages: () => void;
}

export const UploadButton: React.FC<UploadButtonProps> = ({ updateImages }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const success = (file: UploadFile) => {
    messageApi.success(`Uploaded ${file.name} successfully!`);
  };

  return (
    <div className="upload-button-container">
      {contextHolder}
      <Upload
        name="image"
        accept=".jpg,.jpeg,.png,.gif"
        onChange={({ file }) => {
          uploadImage(file)
            .then(() => {
              success(file);
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
