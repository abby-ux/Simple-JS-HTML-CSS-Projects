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


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer");
const nextButton = document.getElementById("next-btn");

questionElement.onclick = function(e){
    //do anything
    console.log(e.mouseLocation)
    
}

let currentQIndex = 0;
let correct = 0;

function startQuiz() {
    currentQIndex = 0;
    correct = 0;
    // Sets text to next for next button
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQ = questions[currentQIndex];
    let noQ = currentQIndex+1;
    // Update the text for the question that will be displayed 
    questionElement.innerHTML = noQ + ". " + currentQ.question;

    currentQ.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("quiz-btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        correct++;
    } else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You got ${correct} answers correct out of ${questions.length} questions.`;
    nextButton.innerHTML = 'Play Again';
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQIndex++;
    if(currentQIndex < questions.length){
        showQuestion();
    } else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if (currentQIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();

