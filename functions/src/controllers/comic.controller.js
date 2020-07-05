const { admin } = require("../config/firebase-admin");
const { comicSchema } = require("../models/comic.model");
const { savePhoto, deletePhoto} = require("../services/file-service");
// const { referrerPolicy } = require("helmet");

const db = admin.firestore();

exports.findAll = async (req, res) => {
  const data = [];
  const ref = db.collection("commics");
  const snapshot = await ref.get();
  snapshot.forEach((doc) => {
    data.push(Object.assign({}, { uid: doc.id }, doc.data()));
  });
  return res.status(200).json(data);
};

exports.findById = (req, res) => {
  Comic.findById(req.params.id)
    .then((comic) => {
      if (comic) {
        res.json(comic);
      }
    })
    .catch((e) => {
      res.send(e);
    });
};

exports.save = async (req, res) => {
  // const path = !!req.file ? await savePhoto(req.file) : null;
  const commic = comicSchema(req.body);
  const commicCollection = db.collection("comics");
  const ref = await commicCollection.add(commic);
  const data = Object.assign({}, { uid: ref.id }, commic);
  return res.status(201).json(data);
};

exports.replace = (req, res) => {
  const options = { overwrite: true };
  Comic.update({ _id: req.params.id }, req.body, options)
    .exec()
    .then((result) => {
      if (result.n) {
        return Comic.findById(req.params.id);
      }
      return res.send(404);
    })
    .then((comic) => {
      res.json(comic);
    })
    .catch((e) => {
      res.send(e);
    });
};

exports.update = (req, res) => {
  const options = { new: true };
  Comic.findByIdAndUpdate(req.params.id, req.body, options)
    .then((comic) => {
      if (comic) {
        res.json(comic);
      } else {
        res.send(404);
      }
    })
    .catch((e) => {
      res.send(e);
    });
};

exports.delete = (req, res) => {
  Comic.remove({ _id: req.params.id })
    .exec()
    .then((result) => {
      if (result) {
        res.send(204);
      } else {
        res.send(404);
      }
    })
    .catch((e) => {
      res.send(e);
    });
};

// funções de upload
exports.saveImage = async (req, res) => {
  const comic_id = req.query.comic_id;
  const file = req.file;
  const comicRef = db.collection("comics").doc(""+comic_id);

  const doc = await comicRef.get();
  if (!doc.exists) {
    throw new Error("comic não existe!")
  }

  const { path, publicPath } = await savePhoto(`comics/${comic_id}`, file, true);

  await comicRef.set({
    ...doc.data(),
    images: !!doc.data().images 
    ? [ ...doc.data().images, { path, publicPath }]
    : [{ path, publicPath }],
  });

  return res.status(200).json({ path, publicPath });
}
