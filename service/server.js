var express = require ("express");
var app = express();
var mongoose = require ("mongoose");
var bodyParser = require ('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
var path = require ("path");
app.use (express.static(path.join(__dirname,'../client/dist')));

//****************Models */
mongoose.connect('mongodb://localhost/message');
var Schema = mongoose.Schema;

var QuestionSchema = new mongoose.Schema({
    user_name:{type: String},
    user_question: {type: String, required: true },
    description:{type: String, required: true},
    _answer: [{type: Schema.Types.ObjectId, ref: 'Answer'}]
   }, {timestamps: true });
mongoose.model('Question', QuestionSchema);
var Question = mongoose.model('Question', QuestionSchema);

var AnswerSchema = new mongoose.Schema({
    _question: {type: Schema.Types.ObjectId, ref: 'Question'},
    like:{type: Number},
    user_answer: {type: String},
    details:{type: String},
    user_name:{type: String}
   }, {timestamps: true });
mongoose.model('Answer', AnswerSchema);
var Answer = mongoose.model('Answer', AnswerSchema);

app.post('/newquestion', function(req, res){
    console.log(req.body)
    Question.create({
        user_name:req.body.user_name, 
        user_question: req.body.user_question,
        description:req.body.description
        }, function(err, results){
        if(err){
            console.log(err);
            res.json({message: 'YOU GOT AN ERRORRRR'});
        }else{
            console.log('it worked!')
            res.json(results);
        }
    })
})

//create a new answer to the question
app.post('/newanswer', function(req, res){
    console.log(req.body)
    Answer.create({
        user_name:req.body.user_name, 
        user_answer: req.body.user_answer, 
        details: req.body.details,
        like:0,
        }, function(err, results){
        if(err){
            console.log(err);
            res.json({message: 'YOU GOT AN ERRORRRR'});
        }else{
            res.json(results);
        }
    })
})

// binds the questions and answers together
app.post("/answer/:id", function(req, res) {
	Question.findOne({ _id:req.params.id }, function(err, result) {
		var newAnswer = new Answer({  user_name:req.body.user_name, user_answer:req.body.user_answer, details: req.body.details,like:0 });
		newanswer._question = question._id;
		question.update({ _id: question._id }, { $push: { _answer: newAnswer }}, function(err) {
		});
        newAnswer.save(function(err){
            if(err){
                console.log(err)
                res.json({message: 'You got an Error'})
            }
            else {
                res.json(result)
            }
        });
    });
});


// get results of all the questions
app.get('/all', function(req, res){
    Question.find({}, function(err, results){
        if(err){
            console.log(err);
            res.json({message: 'YOU GOT AN ERRORRRR'});
        }else{
            res.json(results);
        }
    })
})

//gets the questions instances and populates the answer field
app.get('/onequestion/:id', function (req, res){
    console.log('Error!')
    Question.findOne({_id: req.params.id})
    .populate('_answer')
    .exec(function(err, post) {
        if (err){
            console.log ({message: 'YOU GOT AN ERRORRRR'});
        }
        else{
            res.json(post)
        }
    })
   });

// get results of all the questions
app.get('/allanswers', function(req, res){
    Answer.find({}, function(err, results){
        if(err){
            console.log(err);
            res.json({message: 'YOU GOT AN ERRORRRR'});
        }else{
            res.json(results);
        }
    })
})



//delete a question by id
app.delete('/destroy/:id', function(req, res){
    Question.remove({_id:req.params.id}, function(err, result){
        if(err){
            console.log(err);
            res.json({message: 'YOU GOT AN ERRORRRR'});
        }else{
            res.json(result);
        }
    })
})

app.all("*", (req, res) => {
    res.sendFile(path.resolve("../client/dist/index.html"));
});

app.listen(8000,function(){
    console.log("listenging on port 8000");
})