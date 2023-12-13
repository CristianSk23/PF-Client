import axios from "axios";

export const uploadImageToCloudinary = async (imageUrl) => {
  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dy2ekajhi/image/upload/",
      {
        file: imageUrl,
        upload_preset: "technook",
      }
    );

    // Devuelve la nueva URL de la imagen
    return response.data.secure_url;
  } catch (error) {
    throw error; // Reenvía el error para manejarlo donde sea que llames a esta función
  }
};


export const uploadImageFileToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "technook");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dy2ekajhi/image/upload/",
      formData
    );

    // Devuelve la nueva URL de la imagen
    return response.data.secure_url;
  } catch (error) {
    throw error; // Reenvía el error para manejarlo donde sea que llames a esta función
  }
};

export const uploadImageByFileToCloudinary = async (event, setProduct, product) => {
  const files = event.target.files;

  // Subir cada imagen a Cloudinary y actualizar el estado con las URL
  const newImageUrls = await Promise.all(
    Array.from(files).map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "technook"); // Reemplaza con tu upload preset

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dy2ekajhi/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();

        return data.secure_url;
      } catch (error) {
        console.error("Error al subir la imagen a Cloudinary:", error);
        return null;
      }
    })
  );

  // Actualizar el estado con las URLs de las imágenes cargadas
  setProduct({
    ...product,
    image: [...product.image, ...newImageUrls.filter((url) => url !== null)],
  });
};