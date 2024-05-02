// Note: I am just learning, so all the extra comments help me think through the code I write.

// Define the constants - in this case, just an array of quix questions.
const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Great whale", correct: false},
            { text: "Blue whale", correct: true},
            { text: "Great elephant", correct: false},
            { text: "Gray whale", correct: false},
        ]
    },
    {
        question: "Which is the largest state in the US?",
        answers: [
            { text: "Texas", correct: false},
            { text: "California", correct: false},
            { text: "Alaska", correct: true},
            { text: "Montana", correct: false},
        ]
    },
    {
        question: "Which is the largest tree in the world?",
        answers: [
            { text: "Sequoia sempervirens", correct: true},
            { text: "Cupressus torulosa", correct: false},
            { text: "Shorea faguetiana", correct: false},
            { text: "Oak", correct: false},
        ]
    },
];

// get the h2 element with id 'question' (could start empty if there is no predefined question)
const questionElement = document.getElementById("question");
// Get the div element named 'answer' - for me, starts out empty (as I have not added predefined answers)
const answerButtons = document.getElementById("answer");
// Get button element with id 'next-btn'
const nextButton = document.getElementById("next-btn");

// Example ---- commented out
// questionElement.onclick = function(e){
//     //do anything
//     console.log(e.mouseLocation)
    
// }

// Set the question index, answer correct to zero 
let currentQIndex = 0;
let correct = 0;

// Function that will show the beginning quiz display and reset the 
// question index and correct answers to zero.
function startQuiz() {
    currentQIndex = 0;
    correct = 0;
    // Sets text to "Next" for next button
    nextButton.innerHTML = "Next";
    showQuestion();
}


function showQuestion() {
    // Function that will hide next button and clear previous answer choices
    resetState();
    // Get the current qustion from the question array
    let currentQ = questions[currentQIndex];
    // The questoin number is one more than the index
    let qNum = currentQIndex+1;
    // Update the text for the question that will be displayed 
    questionElement.innerHTML = qNum + ". " + currentQ.question;
    // For each answer option of the question, create a button element, then add that
    // answer text to the button, and add this new button to the 'quiz-btn' class so it will
    // inherit that styling. Add all the new buttons to 'answerButtons'
    currentQ.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("quiz-btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            // Assign the value of answer.correct to a custom data 
            // attribute on the button called correct (boolean)
            button.dataset.correct = answer.correct;
        }
        // Adds event listener so if the button is clicked selectAnswer will run
        button.addEventListener("click", selectAnswer);
    });

}

// Function that hides the Next button until an answer is selected, and removes all of the 
// current answer choices so they will not show up on a new question.
function resetState() {
    // Hide the next button (because no answer is selected yet)
    nextButton.style.display = "none";
    // Runs loop until there are no children (answer buttons) in answerButtons
    while (answerButtons.firstChild){
        // Removes all of the answer options from answerButtons
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Takes in an event object (e) which represents the even that triggered the function.
// Function that colors the button correct/incorrect and shows next button when an answer is selected.
function selectAnswer(e) {
    // Gets the button element that was selected
    const selectedBtn = e.target;
    // Boolean to check is selectedBtn is correct
    const isCorrect = selectedBtn.dataset.correct === "true";
    // Add the button to the correct class so it will get proper styling
    if (isCorrect){
        selectedBtn.classList.add("correct");
        correct++;
    } else{
        selectedBtn.classList.add("incorrect");
    }
    // Loops through all the children (answer options) in answerButtons
    // Applies the correct styling to the correct button (no matter what)
    // Disables all the buttons
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    // Shows the next button
    nextButton.style.display = "block";
}

// Function that displays the score at the end of the quiz, and changes the next button to say play again.
function showScore() {
    // Hide/remove all questoion and answer text
    resetState();
    questionElement.innerHTML = `You got ${correct} answers correct out of ${questions.length} questions.`;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = "block";
}

// Function that either shows the score or the 
function handleNextButton(){
    currentQIndex++;
    if(currentQIndex < questions.length){
        showQuestion();
    } else{
        showScore();
    }
}

// Adds the an event listener to the next button, so it will either
// resart the quiz if it is at the end.
nextButton.addEventListener("click", ()=> {
    if (currentQIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();

