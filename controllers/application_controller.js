var express = require('express');
var router  = express.Router();
var nodemailer = require('nodemailer');
var sgMail = require('@sendgrid/mail');

router.get('/', function(req, res) { 
	res.redirect('/index');
});

router.get('/index', function(req,res) {
  res.render('main/index', {
    layout: 'main-registration'
  });
});

// var transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//       user: 'badostudioemail@gmail.com',
//       pass: 'bado@2016'
//     },
//     tls: {
//         // do not fail on invalid certs
//         rejectUnauthorized: false
//     }
// });
// router.post('/send',function(req,res){

// 	  var mailOptions = {
// 	    from:     'no-reply',
// 	    to:       'hello@badostudio.com',
// 	    subject:  'Bado Studio submission',
// 	    text:     'you have a submission with the following... Name: '+req.body.name+'Email: '+req.body.email +'subject: '+req.body.subject + 'Message: '+req.body.message,
// 	    html:     '<p>You have received a submission with the following...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+ '</li><li>Subject: ' +req.body.email+ '</li><li>Message: '+req.body.message+'</li></ul>'
// 	  }

//     transporter.sendMail(mailOptions, function(error, info){
//         if(error){
//             console.log(error);
//         }else{
//             console.log('Message sent: ' + info.response);
//             res.send(200);
//         }
//     });        
// });


var helper = require('sendgrid').mail;
var from_email = new helper.Email('test@example.com');
var to_email = new helper.Email('mluo0301@gmail.com');
var subject = 'Hello World from the SendGrid Node.js Library!';
var content = new helper.Content('text/plain', 'Hello, Email!');
var mail = new helper.Mail(from_email, subject, to_email, content);

var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);


router.post('/send',function(req,res){


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
