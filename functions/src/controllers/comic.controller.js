const { admin } = require("../config/firebase-admin");
const { comicSchema } = require("../models/comic.model");
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
  const commic = comicSchema(req.body);
  const commicCollection = db.collection("commics");
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
