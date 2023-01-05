const AuthorModel = require('../models/authorModel')
const BlogModel = require('../models/blogModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


const authentication = function (req, res, next) {
      try {
            let token = req.headers["x-api-key"];
            if (!token) {
                  return res.status(400).send({ status: false, Error: "authentication error" })
            }
            try {
                  let decodedToken = jwt.verify(token, "functionup")
                  req.headers["loggedUserId"] = decodedToken.userId
                  
                  next();
            }
            catch (err) {
                  return res.status(400).send({ status: false, msg: "invalid token" })
            }
      }
      catch (err) {
            return res.status(500).send({ status: false, msg: err.message })
      }
}

const authorization = async function (req, res, next) {
      loggedUserId = req.headers["loggedUserId"]
      if (Object.keys(req.params).length != 0) {
            let blogsData = await BlogModel.findOne({ _id: req.params.blogsId })
            let authorId = blogsData.authorId
            if (authorId != loggedUserId) {
                  return res.status(403).send({ status: false, msg: "you are not authorized" })
            }
      }
      if (req.query.authorId) {
            if (req.query.authorId != loggedUserId) {
                  return res.status(403).send({ status: false, msg: req.query.authorId })
            }
      }
      next();
}





module.exports.authentication = authentication;
module.exports.authorization = authorization;



