const { Schema, model } = require('mongoose');
const isURL = require('validator/lib/isURL');

const movieSchema = new Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
      validate: {
        validator: (v) => Number(v) <= new Date().getFullYear(),
        message: (props) => `Год выпуска - ${props.value} - не может быть будущим`,
      },
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      validate: {
        validator: (v) => isURL(v),
        message: (props) => `${props.value} is not a valid URL!`,
      },
      required: true,
    },
    trailerLink: {
      type: String,
      validate: {
        validator: (v) => isURL(v),
        message: (props) => `${props.value} is not a valid URL!`,
      },
      required: true,
    },
    thumbnail: {
      type: String,
      validate: {
        validator: (v) => isURL(v),
        message: (props) => `${props.value} is not a valid URL!`,
      },
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

module.exports = model('movie', movieSchema);
