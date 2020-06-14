// import mongoose from 'mongoose';

export function comicSchema(data) {
  const {
    title,
    subtitle,
    description,
    series,
    language,
    publisher,
    cover,
    author,
    genre,
  } = data;

  const commic = {
    title,
    subtitle,
    description,
    series,
    language,
    publisher,
    cover,
    author,
    genre,
    createdAt: Date.now(),
  };

  return commic;
}

// const Comic = mongoose.model('Comic', comicSchema);
// export default Comic;
