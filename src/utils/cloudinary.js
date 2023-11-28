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
    console.error(
      "Error al cargar la imagen desde la URL a Cloudinary:",
      error
    );
    throw error; // Reenvía el error para manejarlo donde sea que llames a esta función
  }
};
