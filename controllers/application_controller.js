var express = require('express');
var router  = express.Router();
var helper = require('sendgrid').mail;

router.get('/', function(req, res) { 
	res.redirect('/index');
});

router.get('/index', function(req,res) {
  res.render('main/index', {
    layout: 'main-registration'
  });
});

var helper = require('sendgrid').mail;
var from_email = new helper.Email('test@example.com');
var to_email = new helper.Email('mluo0301@gmail.com');
var subject = 'Hello World from the SendGrid Node.js Library!';
var content = new helper.Content('text/plain', 'Hello, Email!');
var mail = new helper.Mail(from_email, subject, to_email, content);

var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);


router.post('/send',function(req,res){
  console.log("go")

  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  });

  sg.API(request, function(error, response) {
    console.log("tell me something")
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
  });


});

module.exports = router;
