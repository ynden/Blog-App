const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const router = express.Router();
const mongoDbUriString = `mongodb://abc123:abc123@ds261626.mlab.com:61626/?authSource=blog-app`;

// Get Posts
router.get('/', async (req, res) => {
  try {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
    res.end();
  } catch (error) {
    console.log(error);
  }
});

async function loadPostsCollection() {
  const client = await new MongoClient(mongoDbUriString, { useNewUrlParser: true }).connect();
  return client.db('blog-app').collection('posts');
}


module.exports = router;