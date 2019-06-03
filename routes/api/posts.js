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

// Add Posts
router.post('/', async (req, res) => {
  const postObject = {
    'description': req.body.description,
    'createdAt': new Date(),
  };

  try {
    await addPostToCollection(postObject);
    res.status(201).send(postObject);
  } catch (error) {
    console.log(error.message);
    res.status(404).send();
    res.end('An error has occurred!');
  }
});

async function loadPostsCollection() {
  const client = await new MongoClient(mongoDbUriString, { useNewUrlParser: true }).connect();
  return client.db('blog-app').collection('posts');
}

async function addPostToCollection(post) {
  const client = await loadPostsCollection();
  await client.insertOne(post, async (err, result) => {
    if (err) console.log(err.message);
  });
}


module.exports = router;