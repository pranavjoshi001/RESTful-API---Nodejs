let express = require('express');



let routes = function(books){

var bookRoutes = express.Router();
let bookController = require('../Controller/BookController')(books);

bookRoutes.route('/')
            .post(bookController.post)
            .get(bookController.get)

bookRoutes.use('/:bookId',(req,res,next)=>{
    books.findById(req.params.bookId,(err,book)=>{
        if(err)
            console.log(err);
        else if(book)
        {
            req.book = book;
            next();
        }
        else    
            res.status(404).send('book not found');
    })
});
bookRoutes.route('/:bookId')
            .get((req,res)=>{
                res.json(req.book);
            })
            .put((req,res)=>{
                        req.book.title = req.body.title;
                        req.book.author = req.body.author;
                        req.book.genre = req.body.genre;
                        req.book.save((err)=>{
                            if(err)
                                res.status(500).send(err);
                            else
                                res.json(req.book);
                        });
            })
            .patch((req,res)=>{
                if(res.body._id)
                    delete res.body._id
                for(let key in res.body)
                {
                    req.book[key] = res.body[key];
                }
                req.book.save((err)=>{
                    if(err)
                        res.status(500).send(err);
                    else
                        res.json(req.book);
                });
            })
            .delete((req,res)=>{
                req.book.remove((err)=>{
                if(err)
                    res.status(500).send(err);
                else
                    res.status(204).send('removed');

                });
            });

            return bookRoutes;
        }
module.exports = routes;