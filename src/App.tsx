import { useEffect, useState } from "react";
import { Flex, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import { UploadButton } from "./components/upload-button/";
import { SearchInput } from "./components/search-input";
import { useSearch, useDelete } from "./hooks";
import { getImages } from "./api";
import type { ImageItem } from "./types";

import "./App.scss";

function App() {
  const [allImages, setAllImages] = useState<ImageItem[]>([]);
  const { searchQuery, handleSearch } = useSearch({
    setAllImages,
  });

  const updateImages = async () => {
    const images = await getImages();
    setAllImages(images);
  };

  const { handleDeleteImage } = useDelete({
    updateImages,
  });

  useEffect(() => {
    updateImages();
  }, []);

  return (
    <div className="container">
      <div className="heading-container">
        <Flex justify="space-between" align="center">
          <SearchInput handleSearch={handleSearch} />
          <UploadButton updateImages={updateImages} />
        </Flex>
        {!!searchQuery && <p>{`Search results for "${searchQuery}"`}</p>}
      </div>
      <div className="images-container">
        <h2>{`${allImages.length} images`}</h2>
        <Flex justify="start" align="center" gap={20} wrap>
          {allImages.map((img) => {
            return (
              <div className="image-item-container" key={img.url}>
                <div className="image-item-delete">
                  <Button
                    onClick={() => {
                      handleDeleteImage(img);
                    }}
                    type="default"
                    shape="circle"
                    icon={<CloseOutlined />}
                  />
                </div>
                <img className="image-item" src={img.url} alt={img.name} />
              </div>
            );
          })}
        </Flex>
      </div>
    </div>
  );
}

export default App;
