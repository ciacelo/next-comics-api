const temp = require("temp");
const uniqid = require("uniqid");
const { admin } = require("../config/firebase-admin");

const bucket = admin.storage().bucket(process.env.STORAGE_BUCKET);

const savePhoto = async (destination, file, isPublic = false) => {
    temp.track();
    
    var stream = temp.createWriteStream();
    
    stream.write(file.buffer);
    
    const resource = await bucket.upload(stream.path, {
        destination: `${destination}/${uniqid() + file.originalname}`,
        contentType: "image/jpeg",
        public: isPublic
    });

    temp.cleanupSync();
    stream.end();

    return { path: resource[1].id, publicPath: resource[1].mediaLink };
};

const deletePhoto = async (origin) => {
    const response = await bucket.deleteFiles({
        prefix: origin
    });
    return response;
};

module.exports = {
    savePhoto,
    deletePhoto
}