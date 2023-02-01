const bookModel = require('../models/bookModel')
const reviewModel = require('../models/reviewModel')
const userModel = require('../models/userModel')
const ObjectId = require('mongoose').Types.ObjectId;
const moment = require('moment')
const { isValid } = require('../validator/validation')
const aws = require('aws-sdk')



aws.config.update({
    accessKeyId: "AKIAY3L35MCRZNIRGT6N",
    secretAccessKey: "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",
    region: "ap-south-1",
   

})

let uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {

        let s3 = new aws.S3({ apiVersion: '2006-03-01' });


        var uploadParams = {
            ACL: "public-read",
            Bucket: "classroom-training-bucket",
            Key: "abc/" + file.originalname,
            Body: file.buffer
        }


        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ "error": err })
            }
            console.log(data)
            console.log("file uploaded succesfully")
            return resolve(data.Location)
        })
        


    })
}
// creating a book---------------------------------
const createBook = async function (req, res) {
    try {

        let data = req.body
        let files = req.files

        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, message: "Please provide data" })

        // validation for userId //
        if (!isValid(data.userId)) return res.status(400).send({ status: false, message: "userId is mandatory" })
        data.userId = data.userId.trim()
        if (!ObjectId.isValid(data.userId)) return res.status(400).send({ status: false, message: "user id is not valid" })

        //Authorization -----------------------------------------------------------------------------------------
        if (req.decode.id != data.userId) return res.status(403).send({ status: false, message: "you are not authorized" })

        // validation for title//
        if (!isValid(data.title)) return res.status(400).send({ status: false, message: "title is mandatory" })

        let book = await bookModel.findOne({ title: data.title.toUpperCase(), isDeleted: false })
        if (book) return res.status(400).send({ status: false, message: "book already created" })

        // validation for excerpt//
        if (!isValid(data.excerpt)) return res.status(400).send({ status: false, message: "excerpt is mandatory" })

        // validation for ISBN//
        if (!isValid(data.ISBN)) return res.status(400).send({ status: false, message: "ISBN is mandatory" })
        data.ISBN = data.ISBN.trim()// trim ISBN
        if (data.ISBN.length != 13) return res.status(400).send({ status: false, message: "ISBN is not valid" })
        book = await bookModel.findOne({ ISBN: data.ISBN })
        if (book) return res.status(400).send({ status: false, message: "ISBN must be unique" })

        // validation for category //
        if (!isValid(data.category)) return res.status(400).send({ status: false, message: "category is mandatory" })
        data.category = data.category.trim()

        // validation for subcategory //
        if (!isValid(data.subcategory)) return res.status(400).send({ status: false, message: "subcategory is mandatory" })
        data.subcategory = data.subcategory.trim()
        console.log(files)
        if (files && files.length > 0) {
            var fileLink = await uploadFile(files[0])
            if (!fileLink) {
                return res.status(404).send({ status: false, message: "no file found" })
            }
        }

        // console.log(fileLink)
        data.bookCover = fileLink

        data.releasedAt = moment().format('YYYY-MM-DD')// adding a current  date in releasedAt

        let savedata = await bookModel.create(data)
        res.status(201).send({ status: true, data: savedata })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}
// get books -----------------------------------------------------------------------------------------------
const getBooks = async function (req, res) {
    try {
        let queries = req.query
        queries.isDeleted = false

        let books = await bookModel.find(queries).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, releasedAt: 1, reviews: 1 })
        if (books.length == 0) return res.status(404).send({ status: false, message: "books not found" })
        books = books.sort((a, b) => (a.title >= b.title) ? 1 : -1)
        res.status(200).send({ status: true, message: 'Books list', data: books })

    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}
// get books by ID -----------------------------------------------------------------------------------------
const getBookById = async function (req, res) {
    try {
        const bookId = req.params.bookId

        if (!ObjectId.isValid(bookId)) return res.status(400).send({ status: false, message: "book id is not valid from path params" })
        let book = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!book) return res.status(404).send({ status: false, message: "book not found" })

        const reviewsData = await reviewModel.find({ bookId: bookId, isDeleted: false }).select({ _id: 1, bookId: 1, reviewedBy: 1, reviewedAt: 1, rating: 1, review: 1 })
        book = book.toObject()
        book.reviewsData = reviewsData
        res.status(200).send({ status: true, message: 'Books list', data: book })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}
// update by ID ----------------------------------------------------------------------------------------------
const updateBookByID = async function (req, res) {
    try {
        const updationDetails = req.body
        const bookId = req.params.bookId

        if (!ObjectId.isValid(bookId)) return res.status(400).send({ status: false, message: "book id is not valid from path params" })

        const book = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!book) return res.status(404).send({ status: false, message: "book not found" })// if book not present in DB
        console.log(updationDetails)// console 
        //authorization
        if (req.decode.id != book.userId) return res.status(403).send({ status: false, message: "you are not authorized" })

        if (Object.keys(updationDetails).length == 0) return res.status(400).send({ status: false, message: "there is no details for updation" })// if data is empty//

        if (updationDetails.title) updationDetails.title = updationDetails.title.toUpperCase()
        const bookWithTitle = await bookModel.findOne({ $or: [{ title: updationDetails.title }, { ISBN: updationDetails.ISBN }] }) // Db call if title is present //

        if (bookWithTitle) {
            if (bookWithTitle.title == updationDetails.title) return res.status(400).send({ status: false, message: "title with that you want to update already exist" })// if title already  present in Db //

            if (bookWithTitle.ISBN == updationDetails.ISBN) return res.status(400).send({ status: false, message: "ISBN with that you want to update already exist" }) // if ISBN is already present in Db //
        }
        updationDetails.releasedAt = moment().format('YYYY-MM-DD') // adding updating time in releasedAt
        const updatedBook = await bookModel.findByIdAndUpdate(bookId, { $set: updationDetails }, { new: true })
        res.status(200).send({ status: true, messgae: "book updated succesfully", data: updatedBook })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

// delete by id --------------------------------------------------------------------------------------------
const deleteBookByID = async function (req, res) {
    try {
        const bookId = req.params.bookId

        if (!ObjectId.isValid(bookId)) return res.status(400).send({ status: false, message: "book id is not valid from path params" })
        const book = await bookModel.findOne({ _id: bookId, isDeleted: false })

        if (!book) return res.status(404).send({ status: false, message: "book not found" })// if book not present in Db

        //authorization
        if (req.decode.id != book.userId) return res.status(403).send({ status: false, message: "you are not authorized" })
        const updatedBook = await bookModel.findByIdAndUpdate(bookId, { $set: { isDeleted: true, deletedAt: Date.now() } }, { new: true })
        res.status(200).send({ status: true, message: "Book deleted succesfully" })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }

}


module.exports.createBook = createBook
module.exports.getBooks = getBooks
module.exports.getBookById = getBookById
module.exports.updateBookByID = updateBookByID
module.exports.deleteBookByID = deleteBookByID











