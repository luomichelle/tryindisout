# Setup Guide

This guide has been adapted from https://devcenter.heroku.com/articles/sendgrid#setup-api-key-environment-variable

Follow this guide to provision a new Heroku server and use that server's credentials to obtain an API Key from the SendGrid email service. And finally to configure environment variables on machine(s) from which you would like to send email.

> NOTE: This guide involves server-related instructions.

## Heroku Setup

Install Heroku CLI.

Login to Heroku from the CLI:

```shell
heroku login # then enter your Heroku username and password (and optionally enter your MFA code)
```

Provision a new Heroku server:

```shell
heroku apps:create example-name # use your own unique name instead of `example-email-app-py`, or omit the name and heroku will choose a fun one for you
```

Provision the Heroku server to use the free "SendGrid" email service:

```shell
heroku addons:create sendgrid:starter
```

### SendGrid Setup

go to heroku.com, and find "example-name" and click SendGrid under Resources page, it wil redirect you to SendGrid Apps Management Page without signin.

OR:

Get SendGrid credentials:

```shell
heroku config:get SENDGRID_USERNAME
heroku config:get SENDGRID_PASSWORD
```

Visit the [SendGrid Apps Management Console](https://app.sendgrid.com/settings/api_keys) and use the credentials to sign in!

Click the "Create API Key" at the top right of the page. Note the resulting "API Key", and copy it to your computer's clipboard.

### Computing Environment Setup

Configure your local machine and optionally also the Heroku server to use environment variables required by this application.

Use an operating-system-specific process to configure your own machine.

If configuring the Heroku server:

```shell
heroku config:set SENDGRID_API_KEY="xxxx_api_key_xxxx" -a example-email-app-py # specify app name only if you control multiple applications

heroku config:set MY_EMAIL_ADDRESS="your_address@gmail.com" -a example-email-app-py # specify app name only if you control multiple applications
```



Use the Heroku CLI’s config commands to add your API Key to be used by your applications:

```shell
heroku config:set SENDGRID_API_KEY=xxxx_api_key_xxxx

heroku config

heroku config:get SENDGRID_API_KEY

heroku config:unset SENDGRID_API_KEY
```


At this time, you should be able to run the app from your local machine and it should use the SendGrid service to send you an email! Note: sending may take a few minutes.
