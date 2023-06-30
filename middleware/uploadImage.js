const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");

// Configuration
cloudinary.config({
  cloud_name: "dobwefa5z",
  api_key: "399464392528469",
  api_secret: "8kZ2CK_ueNL0_pJ4oW0qWfGWY5w",
});

// Upload

const uploadImage = () => {
  function parseImage() {
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage }).fields([
      { name: "listingImage", maxCount: 1 },
    ]);
    return upload;
  }

  const uploadToCloudinary = async (req, res, next) => {
    try {
      const uploadImageIntoCloudinary = (image) => {
        return new Promise((resolve, reject) => {
          let cld_upload_stream = cloudinary.uploader.upload_stream(
            {
              folder: "PokharRentals",
            },
            function (error, result) {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );

          streamifier.createReadStream(image.buffer).pipe(cld_upload_stream);
        });
      };

      if (req.files?.listingImage && req.files.listingImage?.length) {
        const result = await uploadImageIntoCloudinary(
          req.files.listingImage[0]
        );

        req.body.image = result.secure_url || result.url;
      }

      next();
    } catch (e) {
      console.log(e.message);
      res.status(500).send("Couldn't upload Image");
    }
  };
  return [parseImage(), uploadToCloudinary];
};

module.exports = uploadImage;
