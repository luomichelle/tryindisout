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



router.post('/send',function(req,res){
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'test@example.com',
    from: 'test@example.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail.send(msg);
});




module.exports = router;
