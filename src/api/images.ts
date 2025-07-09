const API_URL = "http://localhost:3001/api";

export const getImages = async (query?: string) => {
  try {
    const res: any = await fetch(`${API_URL}/images`);
    if (!res.ok) {
      throw new Error(`Error fetching images: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (e) {
    console.error("Failed to fetch images:", e);
    return [];
  }
};

export const deleteImage = async (id: string): Promise<void> => {
  try {
    const res = await fetch(`${API_URL}/image/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text);
    }
  } catch (error) {
    console.error("Error deleting image:", error);
  }
};

export const uploadImage = async (file: any): Promise<void> => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Upload failed:", text);
      throw new Error("Upload failed");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

export const searchImages = async (query: string): Promise<any[]> => {
  try {
    const res = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);

    if (!res.ok) {
      throw new Error(`Error searching images: ${res.statusText}`);
    }
    return await res.json();
  } catch (e) {
    console.error("Failed to search images:", e);
    return [];
  }
};
