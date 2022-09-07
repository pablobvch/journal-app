export const fileUpload = async (file) => {
  if (!file) {
    return null;
  }

  const cloudUrl = `https://api.cloudinary.com/v1_1/dcmmildv8/upload`;

  const formData = new FormData();
  formData.append("upload_preset", "react-journal");
  formData.append("file", file);

  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData
    });

    if (!resp.ok) throw new Error("The image couldn't be uploaded");

    const cloudResp = await resp.json();

    return cloudResp.secure_url;
  } catch (error) {
    return null;
  }
};
