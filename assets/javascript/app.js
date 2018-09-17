$(document).ready(function () {
    var allOptions = [
        {
            question: "Which one of the following is not an insect?", 
            choices: ["Mosquito", "Flea", "Tick", "Spider"],
            answer: 2,
            photo: "assets/images/Q1_tick.jpg"
         },
         {
            question: "Normal Monopoly boards have __ squares around the outside of the board?", 
            choices: ["60", "80", "15", "40"],
            answer: 3,
            photo: "assets/images/Q2_monopoly.jpg"
         }, 
         {
            question: "Who plays Lara Croft in the Tomb Raider series of films?", 
            choices: ["Nell McAndrew", "Angelina Jolie", " Minnie Driver  ", "Jennifer Aniston"],
            answer: 1,
            photo: "assets/images/Q3_Angelina.png"
        }, 
        {
            question: "Which country below has the world’s first publicly homosexual prime minister?", 
            choices: ["Iceland", "Norway", "Sweden", "Finland"],
            answer: 0,
            photo: "assets/images/Q4_Iceland_Flag.png"
        }, 
        {
            question: "Which is the longest-running American animated TV show?", 
            choices: ["Pokemon", "TV Funhouse", "Simpsons", "Rugrats" ],
            answer: 2,
            photo: "assets/images/Q5_Homer_Simpson.jpg"
        }, 
        {
            question: "At what temperature are Fahrenheit and Celsius the same?", 
            choices: ["-100", "92", "-40", "100"],
            answer: 2,
            photo: "assets/images/Q6_Cold_picture.jpg"
        }, 
        {
            question: "Which city does not have an official Disneyland?", 
            choices: ["Tokyo", "Moscow", "Hong Kong", "Orlando"],
            answer: 1,
            photo: "assets/images/Q7_Moscow.jpg"
        }];
    
    // Variables to keep score
    var numCorrect = 0;
    var numWrong = 0;
    var noAnswer = 0;
    
    // Variables to move the game along
    var qCount = allOptions.length;
    var timer = 15;
    var timerInterval;
    var userGuess ="";
    var running = false;
    var pick;
    var index;
    
    // Variables to hold selections and the random question from allOptions variable
    var newArray = [];
    var holder = [];
    
    
    //If the Play Again button is showing, this will hide it 
    $("#reset").hide();
    
    // Function to start the game:  hide the Start Game button, call the displayQuestion function, call the runTimer function, and randomly select one of the allOptions questions with a for loop
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < allOptions.length; i++) {
                holder.push(allOptions[i]);
            }
    })

    //Function to start the timer (and call it in the function for starting the game)
    function runTimer() {
        if (!running) {
            timerInterval = setInterval(decrement, 1000); 
            running = true;
        }
    }
    //Function for timer countdown to be displayed at 15 seconds using the timer variable 
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //Stop the time at 0
        if (timer === 0) {
            noAnswer++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choices[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //Function to stop the timer
    function stop() {
        running = false;
        clearInterval(timerInterval);
    }
    
    // Function for displaying questions and choices.  Start by randomly selecting the question
    function displayQuestion() {
        index = Math.floor(Math.random() * allOptions.length);
        pick = allOptions[index];
    
        //Go get the question block and display the random question chosen.  Then display the respective choices from that question and put them under the question in a div.  Append the userchoices div for display.
        $("#questionblock").html("<h2>" + pick.question + "</h2>");
        for(var i = 0; i < pick.choices.length; i++) {
            var userchoices = $("<div>");
            userchoices.addClass("answerchoices");
            userchoices.html(pick.choices[i]);
            userchoices.attr("data-guessvalue", i);
            $("#answerblock").append(userchoices);

    }
    
    //Click function for user to select an answer and the if/else statements to dictate the outcomes
    $(".answerchoices").on("click", function () {
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        // If/else for the outcomes
        if (userGuess === pick.answer) {
            stop();
            numCorrect++;
            userGuess="";
            $("#answerblock").html("<p>Nice Job!</p>");
            hidepicture();
    
        } else {
            stop();
            numWrong++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choices[pick.answer] + "</p>");
            hidepicture();
        }
    })
    
    }
    
    // Function for hiding the picture 
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        allOptions.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 15;
    
        //Display the results when all questions have been answered or the timer on the last question is finished
        if ((numWrong + numCorrect + noAnswer) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + numCorrect + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + numWrong + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + noAnswer + "</h4>" );
            
            // Reset the counts to 0
            $("#reset").show();
            numCorrect = 0;
            numWrong = 0;
            noAnswer = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 2500);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            allOptions.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
})