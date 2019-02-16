


let bookController = function(books){

    let post = (req,res)=>{
        let book = new books(req.body);
        book.save();
        res.status(201).send(book)
    };

    let get = (req,res)=>{
        let filter = {};
        if(req.query.title)
        {
            //filter.title = req.query.title;
            var regex = new RegExp(req.query.title, "i")
            filter = { title: regex };
        }
        books.find(filter ,(err,book)=>{
            if(err)
                console.log(err);
            else
                res.json(book);
        })
    };

    return{
        post : post,
        get : get
    }
}

module.exports = bookController;