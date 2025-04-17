import axios from "axios";

export const uploadImageToCloudinary = async (imageFile, categories) => {
  if (!(imageFile instanceof File)) {
    console.log("Invalid image file provided");
    return null;
  }

  const formData = new FormData();
  formData.append("file", imageFile);
  formData.append("upload_preset", "BlogProject");
  formData.append("folder", categories);

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dob0mslox/image/upload",
      formData
    );
    console.log("response", response);
    return response.data.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};

export const deleteImageFromCloudinary = async (imageUrl) => {
  try {
    const publicId = imageUrl.split("/").pop().split(".")[0];
    const cloudName = "dob0mslox";

    await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/delete_by_token`,
      { token: publicId }
    );
  } catch (error) {
    console.error("Cloudinary Deletion Error:", error);
  }
};
