// function to generate quiz questions, display them, and handle user submission
function genQuiz(questions, q2Container, r2Container, submitButton){
    
    // function to display questions and answer options
    function showQuestions(questions, q2Container){
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
        q2Container.innerHTML = output.join(''); // display questions and answer options in specified container
    }
    
    // function to display quiz results
    function showResults(questions, q2Container, r2Container){
        var answerContainers = q2Container.querySelectorAll('.ans'); // get all answer containers
        var answerInput = ''; // var to store user's answer
        var correctCount = 0; // var to store count of correct answers
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
        r2Container.innerHTML = correctCount + ' correct out of ' + questions.length; // display quiz results
    }
    
    // display quiz questions when page loads
    showQuestions(questions, q2Container);
    
    // event listener for submit button click
    submitButton.onclick = function(){
        showResults(questions, q2Container, r2Container); // display quiz results when submit button is clicked
    }
}

// execute code when window loads
window.onload = function() {
    var q2Container = document.getElementById('quiz2'); // get quiz container
    var r2Container = document.getElementById('results'); // get results container
    var submitButton = document.getElementById('submit'); // get submit button
    var questions = [ // define quiz questions and answers
        {
            q: "What are the main regulatory frameworks for healthcare cybersecurity?",
            ans: {
                a: "GDPR and CCPA",
                b: "HIPAA and HITECH",
                c: "PCI DSS and ISO 27001"
            },
            correctAnswer: 'b'
        },
        {   
            q: "Which part of HIPAA establishes national standards for the protection of certain health information?",
            ans: {
                a: "Privacy Rule",
                b: "Security Rule",
                c: "Compliance Rule"
            },
            correctAnswer: 'a'
        }
    ]
    genQuiz(questions, q2Container, r2Container, submitButton); // generate quiz using defined parameters
};