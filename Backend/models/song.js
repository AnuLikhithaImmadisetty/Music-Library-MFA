const mongoose = require('mongoose');

const Schema= mongoose.Schema;

const songSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true }, // Could be a reference to an Artist model
  album: { type: String }, // Optional, if part of an album
  genre: { type: String }, // e.g., Pop, Rock, Jazz
  releaseDate: { type: Date },
  duration: { type: Number, required: true }, // Duration in seconds
  fileUrl: { type: String, required: true }, // Link to the song file (e.g., MP3)
  coverImageUrl: { type: String }, // Link to the song cover image
  
  addedBy: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to the user/admin who added the song
  createdAt: { type: Date, default: Date.now },
  
});



const Song = mongoose.model('Song', songSchema);

module.exports = Song;
