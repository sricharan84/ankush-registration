var Users = require('./models/users');

function getUsers(res) {
    Users.find(function (err, users) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(users); // return all todos in JSON format
    });
};

function isExistingUser(num) {
    Users.find({aadharNumber: num},function(err, docs){
        if(docs.length){
            cb('Candidate already exists', null);
        }else{
            next();
        }
    });
}

module.exports = function (app, upload) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getUsers(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/register', upload.any(), function (req, res) {

        //isExistingUser(req.body.aadharNumber);

        req.body.dob = new Date(req.body.dob).toLocaleString().split(',')[0];
        req.body.createdOn = new Date().toLocaleString();

        // create a todo, information comes from AJAX request from Angular
        Users.create(req.body, function (err, todo) {
            if (err)
                res.send(err);

            getUsers(res);
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Users.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getUsers(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
