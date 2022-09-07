import { v2 as cloudinary } from "cloudinary";
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
  cloud_name: "dcmmildv8",
  api_key: "214675878844844",
  api_secret: "7NbJUjJu9dDN03cR360umTutR_0",
  secure: true
});

describe("testing fileUpload utility", () => {
  test("should upload the file to cloudinary", async () => {
    const imageUrl =
      "https://tse3.mm.bing.net/th?id=OIP.YWWO9wgdOiVLLqGCjQNO7wHaHa&pid=Api&P=0";
    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], "foto.jpg");
    const url = await fileUpload(file);
    expect(typeof url).toBe("string");

    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".jpg", "");

    const cloudResp = await cloudinary.api.delete_resources(
      [`journal/${imageId}`],
      { resource_type: "image" }
    );
  });

  test("should return null", async () => {
    const file = new File([], "foto.jpg");
    const url = await fileUpload(file);
    expect(url).toBe(null);
  });
});
