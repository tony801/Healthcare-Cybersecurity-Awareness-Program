// function to generate quiz questions, display them, and handle user submission
function genQuiz(questions, q3Container, r3Container, submitButton){
    
    // function to display questions and answer options
    function showQuestions(questions, q3Container){
        var output = []; // array to store html output
        var ans; // variable to store answer options
        for (var i=0; i<questions.length; i++){ // loop through each question
            ans = []; // reset answer options for each question
            for (letters in questions[i].ans){ // loop through answer options
                ans.push(
                    '<label>'
					+ '<input type="radio" name="q'+i+'" value="'+letters+'">'
					+ letters + ': '
					+ questions[i].ans[letters]
				+ '</label>' // create html for each answer option
                );
            }
            output.push(
                '<div class="qu">' + questions[i].q + '</div>' // add question html to output
                + '<div class="ans">' + ans.join('') + '</div>' // add answer options html to output
            );
        }
        q3Container.innerHTML = output.join(''); // display questions and answer options in specified container
    }
    
    // function to display quiz results
    function showResults(questions, q3Container, r3Container){
        var answerContainers = q3Container.querySelectorAll('.ans'); // get all answer containers
        var answerInput = ''; // variable to store user's answer
        var correctCount = 0; // variable to store count of correct answers
        for (var i = 0; i < questions.length; i++) { // loop through each question
            answerInput = (answerContainers[i].querySelector('input[name=q'+i+']:checked')||{}).value; // get user's selected answer
            if (answerInput === questions[i].correctAnswer) { // check if selected answer is correct
                correctCount++; // increment correct answer count
                answerContainers[i].style.color = 'lightgreen'; // highlight correct answer in green
            }
            else {
                answerContainers[i].style.color = 'red'; // highlight incorrect answer in red
            }
        }
        r3Container.innerHTML = correctCount + ' correct out of ' + questions.length; // display quiz results
    }
    
    // display quiz questions when page loads
    showQuestions(questions, q3Container);
    
    // event listener for submit button click
    submitButton.onclick = function(){
        showResults(questions, q3Container, r3Container); // display quiz results when submit button is clicked
    }
}

// execute code when window loads
window.onload = function() {
    var q3Container = document.getElementById('quiz3'); // get quiz container
    var r3Container = document.getElementById('results'); // get results container
    var submitButton = document.getElementById('submit'); // get submit button
    var questions = [ // define quiz questions and answers
        {
            q: "Why is data backing crucial for recovery??",
            ans: {
                a: "Restore systems and ensure data integrity",
                b: "To limit data accessibility",
                c: "To increase attack surface"
            },
            correctAnswer: 'a'
        },
        {   
            q: "What is not a common threat in healthcare cybersecurity?",
            ans: {
                a: "SQL injections",
                b: "Ransomware",
                c: "Physical data breaches"
            },
            correctAnswer: 'c'
        }
    ]
    genQuiz(questions, q3Container, r3Container, submitButton); // generate quiz using defined parameters
};