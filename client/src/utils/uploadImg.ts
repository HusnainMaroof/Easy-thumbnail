import cloudinary from "../lib/cloudinary";

export const uploadToCloudinary = async (
  buffer: Buffer
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "thumbnails",
      },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve(result.secure_url);
      }
    );

    stream.end(buffer);
  });
};