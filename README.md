# MotivationGuru

A voice application created using the Jovo framework that enables cross platform apps. The app is designed to give inspirational quotes as you work throughout your day.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Install Node.js by running the following homebrew command

```
brew install node
```

### Installing

Clone the repository and install the jovo cli and dependencies by running

```
npm install -g jovo-cli
```

Once installed, run the following jovo commands to initialize, build, deploy, then finally run the voice app.

```
jovo init
jovo build
jovo deploy
jovo run
```

after you run the app, you will receive a webhook address that you can test in your browser.
Otherwise, you can upload the zip file under the "platforms" folder to Google's dialogflow or AlexaSkills.

## Built With

* [Node](https://nodejs.org/en/) - Runtime to initialize the application
* [Jovo](http://jovo.tech) - Framework that allows the voice app to be deployed cross platform

## Author

* **Jesse Jia** - [followingjesse](https://github.com/followingjesse)
