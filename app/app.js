'use strict';

// =================================================================================
// App Configuration
// =================================================================================

const {App} = require('jovo-framework');

const config = {
    logging: true,
    requestLogging: false,
    responseLogging: false,
    requestLoggingObjects: [],
    responseLoggingObjects: [],
    saveUserOnResponseEnabled: true,
    userDataCol: 'userData',
    inputMap: {},
    intentMap: {},
    intentsToSkipUnhandled: [],
    saveBeforeResponseEnabled: false,
    allowedApplicationIds: [],
    db: {
        type: 'file',
        localDbFilename: 'db',
    },
    userMetaData: {
        lastUsedAt: true,
        sessionsCount: true,
        createdAt: true,
        requestHistorySize: 0,
        devices: false,
    },
    context: {
        prevLevel: 1,
        prev: {
            request: {
                intent: true,
                state: true,
                timestamp: true,
            },
            response: {
                speech: true,
                reprompt: true,
                state: true,
                timestamp: true,
            },
        },
    },
    analytics: {
        intentsToSkip: [],
        usersToSkip: [],
        services: {},
    },
    alexaSkill: {},
    googleAction: {},
};

const app = new App(config);

// =================================================================================
// App Logic
// =================================================================================

app.setHandler({
    'LAUNCH' : function() {
      let speech = 'Are you looking for some motivation?';
      let reprompt = 'Want some inspiration?';
      this.followUpState('MotivationState')
          .ask(speech, reprompt);
    },

    'MotivationState' : {
      'YesIntent' : function() {
        this.toStateIntent('MotivationState', 'QuoteIntent');
      },

      'QuoteIntent' : function() {
        var randomQuote = quotes[Math.floor(Math.random()*quotes.length)]
        let speech = this.speechBuilder()
        speech
            .addText(randomQuote)
            .addBreak('1s')
            .addText('Want more inspiration?')
        this.followUpState('MotivationState')
            .ask(speech,'Want more inspiration?');
      },

      'NoIntent' : function() {
        this.endSession();
      },

      'Unhandled': function() {
        let speech = 'Are you looking for some motivation?';
        let reprompt = 'Want some inspiration?';
        this.ask(speech, reprompt);
      },

      'RepeatIntent': function() {
        this.repeat();
      },
    },
    'END' : function() {
      this.endSession();
    }
});

// =================================================================================
// Quotes
// =================================================================================

var quotes = [
  "The best preparation for tomorrow is doing your best today.",
  "Put your heart, mind, and soul into even your smallest acts. This is the secret of success.",
  "Happiness is not something you postpone for the future; it is something you design for the present.",
  "I can\’t change the direction of the wind, but I can adjust my sails to always reach my destination.",
  "It is during our darkest moments that we must focus to see the light.",
  "Start by doing what’s necessary; then do what’s possible; and suddenly you are doing the impossible.",
  "Someone is sitting in the shade today because someone planted a tree a long time ago.",
  "When you have a dream, you\’ve got to grab it and never let go.",
  "No act of kindness, no matter how small, is ever wasted.",
  "Nothing is impossible, the word itself says I\’m possible!",
  "Keep your face always toward the sunshine, and shadows will fall behind you.",
  "No matter what people tell you, words and ideas can change the world.",
  "Believe you can and you\’re halfway there.",
  "What lied behind you and what lies in front of you, pales in comparison to what lies inside of you.",
  "Thousands of candles can be lighted from a single candle, and the life of the candle will not be shortened. Happiness never decreases by being shared.",
  "As we express our gratitude, we must never forget that the highest appreciation is not to utter words, but to live by them.",
  "We know what we are, but know not what we may be.",
  "I hated every minute of training, but I said, Don\’t quit. Suffer now and live the rest of your life as a champion.",
  "Two roads diverged in a wood and I took the one less travelled by, and that has made all the difference.",
  "Even if I knew that tomorrow the world would go to pieces, I would still plant my apple tree.",
  "The grass is always greener on the other side.",
  "A champion is defined not by their wins but by how they can recover when they fall.",
  "Each person must live their life as a model for others.",
  "Life changes very quickly, in a very positive way, if you let it.",
  "You must do the things you think you cannot do.",
  "Don\'t wait. The time will never be just right.",
  "You are never too old to set another goal or to dream a new dream.",
  "Life is like riding a bicycle. To keep your balance, you must keep moving.",
  "It isn\'t where you came from. It's where you're going that counts.",
  "If I cannot do great things, I can do small things in a great way.",
  "Sometimes you will never know the value of a moment, until it becomes a memory.",
  "If you have good thoughts they will shine out of your face like sunbeams and you will always look lovely.",
  "The first step towards success is taken when you refuse to be a captive of the environment in which you first find yourself.",
  "The way to get started is to quit talking and begin doing.",
  "We keep moving forward, opening new doors, and doing new things, because we're curious and curiosity keeps leading us down new paths.",
  "All our dreams can come true, if we have the courage to pursue them.",
  "It\'s kind of fun to do the impossible",
  "The pessimist sees difficulty in every opportunity. The optimist sees opportunity in every difficulty.",
  "You learn more from failure than from success. Don\'t let it stop you. Failure builds character.",
  "It\'s not whether you get knocked down, it\'s whether you get up.",
  "If you are working on something exciting that you really care about, you don\'t have to be pushed. The vision pulls you.",
  "People who are crazy enough to think they can change the world, are the ones who do.",
  "Failure will never overtake me if my determination to succeed is strong enough.",
  "Knowing is not enough; we must apply. Wishing is not enough; we must do.",
  "We generate fears while we sit. We overcome them by action.",
  "Whether you think you can or think you can\'t, you\'re right.",
  "The man who has confidence in himself gains the confidence of others.",
  "Fake it until you make it! Act as if you had all the confidence you require until it becomes your reality.",
  "For every reason it\'s not possible, there are hundreds of people who have faced the same circumstances and succeeded.",
  "One of the lessons that I grew up with was to always stay true to yourself and never let what somebody else says distract you from your goals.",
  "The only way to do great work is to love what you do. If you haven\'t found it yet, keep looking. Don\'t settle.",
  "Leaders set high standards. Refuse to tolerate mediocrity or poor performance.",
  "Our greatest glory is not in never falling, but in rising every time we fall.",
  "Believe in yourself. You are braver than you think, more talented than you know, and capable of more than you imagine.",
  "There is only one thing that makes a dream impossible to achieve: the fear of failure.",
  "Your mind is a powerful thing. When you fill it with positive thoughts, your life will start to change.",
  "Most of the important things in the world have been accomplished by people who have kept on trying when there seemed to be no hope at all.",
  "I am not a product of my circumstances. I am a product of my decisions.",
  "Success is no accident. It is hard work, perseverance, learning, studying, sacrifice and most of all, love of what you are doing or learning to do.",
  "My favorite things in life don\'t cost any money. It\'s really clear that the most precious resource we all have is time.",
  "If you haven\'t found it yet, keep looking. Don\'t settle. As with all matters of the heart, you\'ll know when you find it. And, like any great relationship, it just gets better and better as the years roll on."
];

var randomQuote = quotes[Math.floor(Math.random()*quotes.length)]

module.exports.app = app;
