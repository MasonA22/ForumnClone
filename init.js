Meteor.methods({
    initData: function(){
        console.log("Initializing the app with data...");
        Meteor.call("initBadges", function(error, result){});
        Meteor.call("initFeedback", function(error, result){});
        Meteor.call("initRooms", function(error, result){});
    },
    initBadges: function(){
        console.log("Initializing app with badges...");
        Badges.insert({         
            "name": "Everyone's a winner",
            "description": "Participation badge",
            createdAt: new Date()
        });

        Badges.insert({         
            "name": "Rank Change Royalty",
            "description": "The player who had the largest rank change increase",
            createdAt: new Date()
        });

        Badges.insert({         
            "name": "Fatality",
            "description": "The player who had the largest rank change decrease",
            createdAt: new Date()
        });

        Badges.insert({         
            "name": "Can we get much higher?",
            "description": "For those who had a rank change increase of more than 35",
            createdAt: new Date()
        });

        Badges.insert({         
            "name": "Never Tell Me the Odds",
            "description": "For those who bet all of their points on a wager question",
            createdAt: new Date()
        });

        Badges.insert({         
            "name": "Baby, I've got the bends",
            "description": "For those who had a rank change decrease of more than 35",
            createdAt: new Date()
        });

        Badges.insert({         
            "name": "I heart Forum-Live",
            "description": "Voted on over 20 questions",
            createdAt: new Date()
        });

        Badges.insert({         
            "name": "Room Hopper",
            "description": "For anyone who answered a question from a different room than the one they were currently in",
            createdAt: new Date()
        });

        Badges.insert({     
            "name": "There is no rock bottom",
            "description": "For anyone who ended the game with negative points",
            createdAt: new Date()
        });

        Badges.insert({         
            "name": "Til the bitter end",
            "description": "Voted on every single question",
            createdAt: new Date()
        });
    },
    initFeedback: function(){
        console.log("Initializing app with feedback data...");
        FeedbackTypes.insert({          
            name: "Not relevant to me",
            createdAt: new Date()
        });

        FeedbackTypes.insert({          
            name: "Too long",
            createdAt: new Date()
        });

        FeedbackTypes.insert({          
            name: "Information went over my head",
            createdAt: new Date()
        });

        FeedbackTypes.insert({          
            name: "Too technical",
            createdAt: new Date()
        });

        FeedbackTypes.insert({          
            name: "Not technical enough",
            createdAt: new Date()
        });

        FeedbackTypes.insert({          
            name: "Boring",
            createdAt: new Date()
        });
    },
    initRooms: function(){
        console.log("Initializing app with room data...");
        Rooms.insert({
            name: "Count Basie A",
            createdAt: new Date()
        }, function(error, result){
            if (error){
            }
            else{
                Meteor.call("initRoomAQuestions", result, function(error, result){});
            }
        });

        Rooms.insert({
            name: "Count Basie B",
            createdAt: new Date()
        }, function(error, result){
            if (error){
            }
            else{
                Meteor.call("initRoomBQuestions", result, function(error, result){});
            }
        });
    },
    initRoomAQuestions: function(roomId){
        console.log("Initializing app with room A question data...");

        Questions.insert({
            questionType: "isTrivia",
            questionFormHash: {
                question: "What is DST's ticker symbol on the NY stock exchange?",
                sessionName: "Tech Forum Kickoff",
                askOrder: 1,
                points: "2000",
                isTrivia: true,
                answers: [
                    {
                        text: "CYA",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "WTH",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "DST",
                        votes: 0,
                        users: [],
                        correct: "true"
                    },
                    {
                        text: "LOL",
                        votes: 0,
                        users: [],
                        correct: "false"
                    }
                ],
                roomId: roomId,
                wagerEnabled: false,
                feedbackEnabled: false,
                feedback: {
                    good: 0,
                    bad: 0,
                    feedbackUsers: []
                },
                answerData: {
                    correct: 0,
                    partiallyCorrect: 0,
                    incorrect: 0
                }
            },
            rank: [],
            activeQuestion: false,
            showTimer: false,
            startTime: 0,
            createdAt: new Date()
        });

        Questions.insert({
            questionType: "isTrivia",
            questionFormHash: {
                question: "Who is sponsoring our Happy Hour at the end of today?",
                sessionName: "Tech Forum Kickoff",
                askOrder: 2,
                points: "3000",
                isTrivia: true,
                answers: [
                    {
                        text: "CBS",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "Trump Steaks",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "IBM",
                        votes: 0,
                        users: [],
                        correct: "true"
                    },
                    {
                        text: "Apple",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "Mack Trucks",
                        votes: 0,
                        users: [],
                        correct: "false"
                    }
                ],
                roomId: roomId,
                wagerEnabled: false,
                feedbackEnabled: false,
                feedback: {
                    good: 0,
                    bad: 0,
                    feedbackUsers: []
                },
                answerData: {
                    correct: 0,
                    partiallyCorrect: 0,
                    incorrect: 0
                }
            },
            rank: [],
            activeQuestion: false,
            showTimer: false,
            startTime: 0,
            createdAt: new Date()
        });

        Questions.insert({
            questionType: "isTrivia",
            questionFormHash: {
                question: "The Tech Forum is being held in the Count Basie rooms at the Marriott. Who was Count Basie?",
                sessionName: "Tech Forum Kickoff",
                askOrder: 3,
                points: "3000",
                isTrivia: true,
                answers: [
                    {
                        text: "Count Dracula’s 2nd Cousin",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "A famous American jazz pianist",
                        votes: 0,
                        users: [],
                        correct: "true"
                    },
                    {
                        text: "A French hotel owner",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "An infamous Kansas City mobster",
                        votes: 0,
                        users: [],
                        correct: "false"
                    }
                ],
                roomId: roomId,
                wagerEnabled: false,
                feedbackEnabled: false,
                feedback: {
                    good: 0,
                    bad: 0,
                    feedbackUsers: []
                },
                answerData: {
                    correct: 0,
                    partiallyCorrect: 0,
                    incorrect: 0
                }
            },
            rank: [],
            activeQuestion: false,
            showTimer: false,
            startTime: 0,
            createdAt: new Date()
        });

        Questions.insert({
            questionType: "isTrivia",
            questionFormHash: {
                question: "True or False - DST’s Strategy is to be a Growth Company in the Financial Services and Healthcare sectors.",
                sessionName: "Tech Forum Kickoff",
                askOrder: 4,
                points: "3000",
                isTrivia: true,
                answers: [
                    {
                        text: "True",
                        votes: 0,
                        users: [],
                        correct: "true"
                    },
                    {
                        text: "False",
                        votes: 0,
                        users: [],
                        correct: "false"
                    }
                ],
                roomId: roomId,
                wagerEnabled: false,
                feedbackEnabled: true,
                feedback: {
                    good: 0,
                    bad: 0,
                    feedbackUsers: []
                },
                answerData: {
                    correct: 0,
                    partiallyCorrect: 0,
                    incorrect: 0
                }
            },
            rank: [],
            activeQuestion: false,
            showTimer: false,
            startTime: 0,
            createdAt: new Date()
        });

        Questions.insert({
            questionType: "isTrivia",
            questionFormHash: {
                question: "How many associates does IFDS have?",
                sessionName: "State of IT",
                askOrder: 5,
                points: "1000",
                isTrivia: true,
                answers: [
                    {
                        text: "8000",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "10000",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "12600",
                        votes: 0,
                        users: [],
                        correct: "true"
                    },
                    {
                        text: "15200",
                        votes: 0,
                        users: [],
                        correct: "false"
                    }
                ],
                roomId: roomId,
                wagerEnabled: false,
                feedbackEnabled: true,
                feedback: {
                    good: 0,
                    bad: 0,
                    feedbackUsers: []
                },
                answerData: {
                    correct: 0,
                    partiallyCorrect: 0,
                    incorrect: 0
                }
            },
            rank: [],
            activeQuestion: false,
            showTimer: false,
            startTime: 0,
            createdAt: new Date()
        });

        Questions.insert({
            questionType: "isTrivia",
            questionFormHash: {
                question: "How many items were mailed by DST’s Customer Communications business in 2015?",
                sessionName: "Enterprise Architecture Concepts",
                askOrder: 6,
                points: "7000",
                isTrivia: true,
                answers: [
                    {
                        text: "1 Million",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "2.5 Million",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "1 Billion",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "2.9 Billion",
                        votes: 0,
                        users: [],
                        correct: "true"
                    }
                ],
                roomId: roomId,
                wagerEnabled: false,
                feedbackEnabled: true,
                feedback: {
                    good: 0,
                    bad: 0,
                    feedbackUsers: []
                },
                answerData: {
                    correct: 0,
                    partiallyCorrect: 0,
                    incorrect: 0
                }
            },
            rank: [],
            activeQuestion: false,
            showTimer: false,
            startTime: 0,
            createdAt: new Date()
        });

        Questions.insert({
            questionType: "isTrivia",
            questionFormHash: {
                question: "What is the average length of our top 5 Financial Services client relationships?",
                sessionName: "Argus - Evolution and Growth",
                askOrder: 7,
                points: "9000",
                isTrivia: true,
                answers: [
                    {
                        text: "10 years",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "18 years",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "31 years",
                        votes: 0,
                        users: [],
                        correct: "true"
                    },
                    {
                        text: "40 years",
                        votes: 0,
                        users: [],
                        correct: "false"
                    }
                ],
                roomId: roomId,
                wagerEnabled: false,
                feedbackEnabled: true,
                feedback: {
                    good: 0,
                    bad: 0,
                    feedbackUsers: []
                },
                answerData: {
                    correct: 0,
                    partiallyCorrect: 0,
                    incorrect: 0
                }
            },
            rank: [],
            activeQuestion: false,
            showTimer: false,
            startTime: 0,
            createdAt: new Date()
        });

        Questions.insert({
            questionType: "isTrivia",
            questionFormHash: {
                question: "What percentage increase in growth has the DST Summer Internship Program experienced over the past 5 years?",
                sessionName: "Acquiring Talent",
                askOrder: 8,
                points: "4000",
                isTrivia: true,
                answers: [
                    {
                        text: "68%",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "222%",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "567%",
                        votes: 0,
                        users: [],
                        correct: "true"
                    },
                    {
                        text: "750%",
                        votes: 0,
                        users: [],
                        correct: "false"
                    }
                ],
                roomId: roomId,
                wagerEnabled: false,
                feedbackEnabled: true,
                feedback: {
                    good: 0,
                    bad: 0,
                    feedbackUsers: []
                },
                answerData: {
                    correct: 0,
                    partiallyCorrect: 0,
                    incorrect: 0
                }
            },
            rank: [],
            activeQuestion: false,
            showTimer: false,
            startTime: 0,
            createdAt: new Date()
        });

        Questions.insert({
            questionType: "isTrivia",
            questionFormHash: {
                question: "Who leads DST’s Healthcare business?",
                sessionName: "eContent Enterprise Solution",
                askOrder: 9,
                points: "10000",
                isTrivia: true,
                answers: [
                    {
                        text: "Jonathan Boehm",
                        votes: 0,
                        users: [],
                        correct: "true"
                    },
                    {
                        text: "Simon Hudson-Lund",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "Ned Burke",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "Mike Abbaei",
                        votes: 0,
                        users: [],
                        correct: "false"
                    }
                ],
                roomId: roomId,
                wagerEnabled: false,
                feedbackEnabled: true,
                feedback: {
                    good: 0,
                    bad: 0,
                    feedbackUsers: []
                },
                answerData: {
                    correct: 0,
                    partiallyCorrect: 0,
                    incorrect: 0
                }
            },
            rank: [],
            activeQuestion: false,
            showTimer: false,
            startTime: 0,
            createdAt: new Date()
        });

        Questions.insert({
            questionType: "isTrivia",
            questionFormHash: {
                question: "True or False – DST’s Strategy is to be a Growth Company in the Financial Services and Healthcare sectors?",
                sessionName: "End User Computing",
                askOrder: 10,
                points: "10000",
                isTrivia: true,
                answers: [
                    {
                        text: "True",
                        votes: 0,
                        users: [],
                        correct: "true"
                    },
                    {
                        text: "False",
                        votes: 0,
                        users: [],
                        correct: "false"
                    }
                ],
                roomId: roomId,
                wagerEnabled: false,
                feedbackEnabled: true,
                feedback: {
                    good: 0,
                    bad: 0,
                    feedbackUsers: []
                },
                answerData: {
                    correct: 0,
                    partiallyCorrect: 0,
                    incorrect: 0
                }
            },
            rank: [],
            activeQuestion: false,
            showTimer: false,
            startTime: 0,
            createdAt: new Date()
        });

        Questions.insert({
            questionType: "isTrivia",
            questionFormHash: {
                question: "True or False – DST’s Brand Promise is to Help our clients master complexity in the worlds’ most demanding industries to ensure they continually stay ahead of and capitalize on ever-changing client, business and regulatory needs.",
                sessionName: "Cognitive Computing",
                askOrder: 11,
                points: "10000",
                isTrivia: true,
                answers: [
                    {
                        text: "True",
                        votes: 0,
                        users: [],
                        correct: "true"
                    },
                    {
                        text: "False",
                        votes: 0,
                        users: [],
                        correct: "false"
                    }
                ],
                roomId: roomId,
                wagerEnabled: false,
                feedbackEnabled: true,
                feedback: {
                    good: 0,
                    bad: 0,
                    feedbackUsers: []
                },
                answerData: {
                    correct: 0,
                    partiallyCorrect: 0,
                    incorrect: 0
                }
            },
            rank: [],
            activeQuestion: false,
            showTimer: false,
            startTime: 0,
            createdAt: new Date()
        });

        Questions.insert({
            questionType: "isTrivia",
            questionFormHash: {
                question: "What was the first year that the Kansas City Royals went to the World Series?",
                sessionName: "Tech Forum Kickoff/Day 2",
                askOrder: 12,
                points: "4000",
                isTrivia: true,
                answers: [
                    {
                        text: "1969",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "1985",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "1980",
                        votes: 0,
                        users: [],
                        correct: "true"
                    },
                    {
                        text: "2014",
                        votes: 0,
                        users: [],
                        correct: "false"
                    }
                ],
                roomId: roomId,
                wagerEnabled: false,
                feedbackEnabled: true,
                feedback: {
                    good: 0,
                    bad: 0,
                    feedbackUsers: []
                },
                answerData: {
                    correct: 0,
                    partiallyCorrect: 0,
                    incorrect: 0
                }
            },
            rank: [],
            activeQuestion: false,
            showTimer: false,
            startTime: 0,
            createdAt: new Date()
        });

        Questions.insert({
            questionType: "isTrivia",
            questionFormHash: {
                question: "In what year did Steve Hooley become the CEO of DST?",
                sessionName: "Tech Forum Kickoff/Day 2",
                askOrder: 13,
                points: "5000",
                isTrivia: true,
                answers: [
                    {
                        text: "2010",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "2011",
                        votes: 0,
                        users: [],
                        correct: "true"
                    },
                    {
                        text: "2012",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "2015",
                        votes: 0,
                        users: [],
                        correct: "false"
                    }
                ],
                roomId: roomId,
                wagerEnabled: false,
                feedbackEnabled: true,
                feedback: {
                    good: 0,
                    bad: 0,
                    feedbackUsers: []
                },
                answerData: {
                    correct: 0,
                    partiallyCorrect: 0,
                    incorrect: 0
                }
            },
            rank: [],
            activeQuestion: false,
            showTimer: false,
            startTime: 0,
            createdAt: new Date()
        });

        Questions.insert({
            questionType: "isTrivia",
            questionFormHash: {
                question: "What was DST's most recent acquisition?",
                sessionName: "Market Disruption",
                askOrder: 14,
                points: "5000",
                isTrivia: true,
                answers: [
                    {
                        text: "Kasina",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "Kaufman Rossin Fund Services (KRFS)",
                        votes: 0,
                        users: [],
                        correct: "true"
                    },
                    {
                        text: "ALPS",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "Red Rocks Capital",
                        votes: 0,
                        users: [],
                        correct: "false"
                    }
                ],
                roomId: roomId,
                wagerEnabled: false,
                feedbackEnabled: true,
                feedback: {
                    good: 0,
                    bad: 0,
                    feedbackUsers: []
                },
                answerData: {
                    correct: 0,
                    partiallyCorrect: 0,
                    incorrect: 0
                }
            },
            rank: [],
            activeQuestion: false,
            showTimer: false,
            startTime: 0,
            createdAt: new Date()
        });

        Questions.insert({
            questionType: "isTrivia",
            questionFormHash: {
                question: "What is DST’s ticker symbol on the NY Stock Exchange?",
                sessionName: "Open Source",
                askOrder: 15,
                points: "19000",
                isTrivia: true,
                answers: [
                    {
                        text: "DST",
                        votes: 0,
                        users: [],
                        correct: "true"
                    },
                    {
                        text: "WTF",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "CYA",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "LOL",
                        votes: 0,
                        users: [],
                        correct: "false"
                    }
                ],
                roomId: roomId,
                wagerEnabled: false,
                feedbackEnabled: true,
                feedback: {
                    good: 0,
                    bad: 0,
                    feedbackUsers: []
                },
                answerData: {
                    correct: 0,
                    partiallyCorrect: 0,
                    incorrect: 0
                }
            },
            rank: [],
            activeQuestion: false,
            showTimer: false,
            startTime: 0,
            createdAt: new Date()
        });

        Questions.insert({
            questionType: "isTrivia",
            questionFormHash: {
                question: "Which of the following industry trend impacts DST?",
                sessionName: "Offshore Colleagues",
                askOrder: 16,
                points: "21000",
                isTrivia: true,
                answers: [
                    {
                        text: "Aging population",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "Increased Demand for Data Security",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "Increased Complexity and Regulatory Oversight",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "All of the above",
                        votes: 0,
                        users: [],
                        correct: "true"
                    }
                ],
                roomId: roomId,
                wagerEnabled: false,
                feedbackEnabled: true,
                feedback: {
                    good: 0,
                    bad: 0,
                    feedbackUsers: []
                },
                answerData: {
                    correct: 0,
                    partiallyCorrect: 0,
                    incorrect: 0
                }
            },
            rank: [],
            activeQuestion: false,
            showTimer: false,
            startTime: 0,
            createdAt: new Date()
        });

        Questions.insert({
            questionType: "isTrivia",
            questionFormHash: {
                question: "True or False – DST has offices in more than 50 cities worldwide",
                sessionName: "DST's Analytics Platform",
                askOrder: 17,
                points: "17000",
                isTrivia: true,
                answers: [
                    {
                        text: "True",
                        votes: 0,
                        users: [],
                        correct: "true"
                    },
                    {
                        text: "False",
                        votes: 0,
                        users: [],
                        correct: "false"
                    }
                ],
                roomId: roomId,
                wagerEnabled: false,
                feedbackEnabled: true,
                feedback: {
                    good: 0,
                    bad: 0,
                    feedbackUsers: []
                },
                answerData: {
                    correct: 0,
                    partiallyCorrect: 0,
                    incorrect: 0
                }
            },
            rank: [],
            activeQuestion: false,
            showTimer: false,
            startTime: 0,
            createdAt: new Date()
        });
    },
    initRoomBQuestions: function(roomId){
        console.log("Initializing app with room B question data...");
        Questions.insert({
            questionType: "isTrivia",
            questionFormHash: {
                question: "How many test environments does Argus have?",
                sessionName: "Argus Technology Initiatives",
                askOrder: 1,
                points: "3000",
                isTrivia: true,
                answers: [
                    {
                        text: "3",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "11",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "26",
                        votes: 0,
                        users: [],
                        correct: "true"
                    },
                    {
                        text: "38",
                        votes: 0,
                        users: [],
                        correct: "false"
                    }
                ],
                roomId: roomId,
                wagerEnabled: false,
                feedbackEnabled: true,
                feedback: {
                    good: 0,
                    bad: 0,
                    feedbackUsers: []
                },
                answerData: {
                    correct: 0,
                    partiallyCorrect: 0,
                    incorrect: 0
                }
            },
            rank: [],
            activeQuestion: false,
            showTimer: false,
            startTime: 0,
            createdAt: new Date()
        });

        Questions.insert({
            questionType: "isTrivia",
            questionFormHash: {
                question: "How many retirement participants are on DST’s TRAC platform?",
                sessionName: "What's behind the Bluedoor",
                askOrder: 2,
                points: "15000",
                isTrivia: true,
                answers: [
                    {
                        text: "3 Million",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "5 Million",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "7 Million",
                        votes: 0,
                        users: [],
                        correct: "true"
                    },
                    {
                        text: "10 Million",
                        votes: 0,
                        users: [],
                        correct: "false"
                    }
                ],
                roomId: roomId,
                wagerEnabled: false,
                feedbackEnabled: true,
                feedback: {
                    good: 0,
                    bad: 0,
                    feedbackUsers: []
                },
                answerData: {
                    correct: 0,
                    partiallyCorrect: 0,
                    incorrect: 0
                }
            },
            rank: [],
            activeQuestion: false,
            showTimer: false,
            startTime: 0,
            createdAt: new Date()
        });

        Questions.insert({
            questionType: "isTrivia",
            questionFormHash: {
                question: "In what year was DST founded?",
                sessionName: "DST CC Modernization",
                askOrder: 3,
                points: "15000",
                isTrivia: true,
                answers: [
                    {
                        text: "1950",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "1969",
                        votes: 0,
                        users: [],
                        correct: "true"
                    },
                    {
                        text: "1972",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "1979",
                        votes: 0,
                        users: [],
                        correct: "false"
                    }
                ],
                roomId: roomId,
                wagerEnabled: false,
                feedbackEnabled: true,
                feedback: {
                    good: 0,
                    bad: 0,
                    feedbackUsers: []
                },
                answerData: {
                    correct: 0,
                    partiallyCorrect: 0,
                    incorrect: 0
                }
            },
            rank: [],
            activeQuestion: false,
            showTimer: false,
            startTime: 0,
            createdAt: new Date()
        });

        Questions.insert({
            questionType: "isTrivia",
            questionFormHash: {
                question: "For FSG Continuous Integration, who is Arthur?",
                sessionName: "FSG Development",
                askOrder: 4,
                points: "3000",
                isTrivia: true,
                answers: [
                    {
                        text: "80’s comedy starring Dudley Moore",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "The nickname for the SCM team lead",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "The superhero sidekick of the FSG CI environment",
                        votes: 0,
                        users: [],
                        correct: "true"
                    }
                ],
                roomId: roomId,
                wagerEnabled: false,
                feedbackEnabled: true,
                feedback: {
                    good: 0,
                    bad: 0,
                    feedbackUsers: []
                },
                answerData: {
                    correct: 0,
                    partiallyCorrect: 0,
                    incorrect: 0
                }
            },
            rank: [],
            activeQuestion: false,
            showTimer: false,
            startTime: 0,
            createdAt: new Date()
        });

        Questions.insert({
            questionType: "isPoll",
            questionFormHash: {
                question: "When do you think computers can replace most of the programming tasks today?",
                sessionName: "Machine Learning",
                askOrder: 5,
                points: "4000",
                isPoll: true,
                answers: [
                    {
                        text: "5 years",
                        votes: 0,
                        users: []
                    },
                    {
                        text: "10 years",
                        votes: 0,
                        users: []
                    },
                    {
                        text: "15 years or more",
                        votes: 0,
                        users: []
                    },
                    {
                        text: "Never",
                        votes: 0,
                        users: []
                    },
                    {
                        text: "Don't know",
                        votes: 0,
                        users: []
                    }

                ],
                roomId: roomId,
                wagerEnabled: false,
                feedbackEnabled: true,
                feedback: {
                    good: 0,
                    bad: 0,
                    feedbackUsers: []
                },
                answerData: {
                    correct: 0,
                    partiallyCorrect: 0,
                    incorrect: 0
                }
            },
            rank: [],
            activeQuestion: false,
            showTimer: false,
            startTime: 0,
            createdAt: new Date()
        });

        Questions.insert({
            questionType: "isTrivia",
            questionFormHash: {
                question: "Unity 3D can deploy to which of the following platforms?",
                sessionName: "Data Visialization with Virtual Reality",
                askOrder: 6,
                points: "5000",
                isTrivia: true,
                answers: [
                    {
                        text: "Android",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "iOS",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "Linux",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "WebGL",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "Tizen",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "A, B, C & E",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "All of the above",
                        votes: 0,
                        users: [],
                        correct: "true"
                    }
                ],
                roomId: roomId,
                wagerEnabled: false,
                feedbackEnabled: true,
                feedback: {
                    good: 0,
                    bad: 0,
                    feedbackUsers: []
                },
                answerData: {
                    correct: 0,
                    partiallyCorrect: 0,
                    incorrect: 0
                }
            },
            rank: [],
            activeQuestion: false,
            showTimer: false,
            startTime: 0,
            createdAt: new Date()
        });

        Questions.insert({
            questionType: "isTrivia",
            questionFormHash: {
                question: "Which of the following is not a joint venture between DST and State Street?",
                sessionName: "Topological Data Analysis",
                askOrder: 7,
                points: "15000",
                isTrivia: true,
                answers: [
                    {
                        text: "International Financial Data Services (IFDS)",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "McKay Hochman",
                        votes: 0,
                        users: [],
                        correct: "true"
                    },
                    {
                        text: "Boston Financial Data Services (BFDS)",
                        votes: 0,
                        users: [],
                        correct: "false"
                    }
                ],
                roomId: roomId,
                wagerEnabled: false,
                feedbackEnabled: true,
                feedback: {
                    good: 0,
                    bad: 0,
                    feedbackUsers: []
                },
                answerData: {
                    correct: 0,
                    partiallyCorrect: 0,
                    incorrect: 0
                }
            },
            rank: [],
            activeQuestion: false,
            showTimer: false,
            startTime: 0,
            createdAt: new Date()
        });

        Questions.insert({
            questionType: "isTrivia",
            questionFormHash: {
                question: "Who invented Bitcoin?",
                sessionName: "Blockchain",
                askOrder: 8,
                points: "7000",
                isTrivia: true,
                answers: [
                    {
                        text: "Satomi Nakamura",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "Satoshi Nakamoto",
                        votes: 0,
                        users: [],
                        correct: "true"
                    },
                    {
                        text: "Satori Nakagawa",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "Satoko Nakajima",
                        votes: 0,
                        users: [],
                        correct: "false"
                    }
                ],
                roomId: roomId,
                wagerEnabled: false,
                feedbackEnabled: true,
                feedback: {
                    good: 0,
                    bad: 0,
                    feedbackUsers: []
                },
                answerData: {
                    correct: 0,
                    partiallyCorrect: 0,
                    incorrect: 0
                }
            },
            rank: [],
            activeQuestion: false,
            showTimer: false,
            startTime: 0,
            createdAt: new Date()
        });

        Questions.insert({
            questionType: "isTrivia",
            questionFormHash: {
                question: "How does ALPS manage DB objects?",
                sessionName: "Development at ALPS",
                askOrder: 9,
                points: "7000",
                isTrivia: true,
                answers: [
                    {
                        text: "One file per deployment",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "Schema updates, alter procedures, transactional",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "Schema updates, drop/create procedures, transactional",
                        votes: 0,
                        users: [],
                        correct: "true"
                    },
                    {
                        text: "Manually run script files",
                        votes: 0,
                        users: [],
                        correct: "false"
                    },
                    {
                        text: "I don’t know",
                        votes: 0,
                        users: [],
                        correct: "false"
                    }
                ],
                roomId: roomId,
                wagerEnabled: false,
                feedbackEnabled: true,
                feedback: {
                    good: 0,
                    bad: 0,
                    feedbackUsers: []
                },
                answerData: {
                    correct: 0,
                    partiallyCorrect: 0,
                    incorrect: 0
                }
            },
            rank: [],
            activeQuestion: false,
            showTimer: false,
            startTime: 0,
            createdAt: new Date()
        });

        Questions.insert({
            questionType: "isTrivia",
            questionFormHash: {
                question: "True or False – DST has offices in more than 50 cities worldwide",
                sessionName: "DevOps is a Journey",
                askOrder: 10,
                points: "17000",
                isTrivia: true,
                answers: [
                    {
                        text: "True",
                        votes: 0,
                        users: [],
                        correct: "true"
                    },
                    {
                        text: "False",
                        votes: 0,
                        users: [],
                        correct: "false"
                    }
                ],
                roomId: roomId,
                wagerEnabled: false,
                feedbackEnabled: true,
                feedback: {
                    good: 0,
                    bad: 0,
                    feedbackUsers: []
                },
                answerData: {
                    correct: 0,
                    partiallyCorrect: 0,
                    incorrect: 0
                }
            },
            rank: [],
            activeQuestion: false,
            showTimer: false,
            startTime: 0,
            createdAt: new Date()
        });
    }
});