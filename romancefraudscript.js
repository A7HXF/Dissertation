const questions = [
    {
        question: "What is Romance Fraud?",
        answers: [
            {text: "A legitimate way of online dating", correct: false},
            {text: "A type of fraud involving fake romantic intentions to gain financial or personal advantage", correct: true},
            {text: "A new dating app for seniors", correct: false},
            {text: "A legal method of matchmaking", correct: false}
        ]
    },
    {
        question: "Which issue is a common consequence of romance fraud?",
        answers: [
            {text: "Increased social activity", correct: false},
            {text: "Financial Exploitation", correct: true},
            {text: "Improved mental health", correct: false},
            {text: "Enhanced financial literacy", correct: false}
        ]
    },
    {
        question: "What is a typical sign of an emergency scam in romance fraud?",
        answers: [
            {text: "The scammer asks for a small favor", correct: false},
            {text: "The scammer needs urgent money for a medical emergency", correct: true},
            {text: "The scammer sends you flowers", correct: false},
            {text: "The scammer provides a valid ID", correct: false}
        ]
    },
    {
        question: "Which scam involves the scammer asking for money to cover travel expenses?",
        answers: [
            {text: "Investment scam", correct: false},
            {text: "Travel scam", correct: true},
            {text: "Gift scam", correct: false},
            {text: "Loan scam", correct: false}
        ]
    },
    {
        question: "How can you protect yourself from romance fraud?",
        answers: [
            {text: "Send money to prove your trust", correct: false},
            {text: "Verify the person's identity through video calls", correct: true},
            {text: "Share personal details to build trust", correct: false},
            {text: "Invest in a business venture proposed by your online partner", correct: false}
        ]
    },
    {
        question: "Why is it advised to keep conversations on official dating platforms?",
        answers: [
            {text: "To make communication easier", correct: false},
            {text: "To ensure conversations are recorded for legal protection", correct: true},
            {text: "To prevent the dating service from losing revenue", correct: false},
            {text: "To enhance the quality of the conversation", correct: false}
        ]
    },
    {
        question: "What should you do if you suspect someone is trying to scam you online?",
        answers: [
            {text: "Confront the person directly", correct: false},
            {text: "Report the suspicious behavior to the platform", correct: true},
            {text: "Propose to meet in person immediately", correct: false},
            {text: "Ignore the suspicions and continue the relationship", correct: false}
        ]
    },
    {
        question: "Which of the following is NOT a recommended action if you're involved in an online relationship with financial aspects?",
        answers: [
            {text: "Sending expensive gifts to prove your affection", correct: true},
            {text: "Consulting with friends and family", correct: false},
            {text: "Performing a reverse image search of profile pictures", correct: false},
            {text: "Never sending money or gifts to someone you have not met in person", correct: false}
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = (currentQuestionIndex + 1) + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    };
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Try Again";
    nextButton.style.display = "block";
    handleRedirectionButton()
}


function handleRedirectionButton() {
    const backButton = document.getElementById("back-btn");
    backButton.style.display = "block"; // Make the button visible
    backButton.addEventListener("click", function() {
        window.location.href = "quizzes.html"; // Redirect on click
    });
}


function handleNextButton () {
    currentQuestionIndex ++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
    }else {
        showScore();
    }
}



nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else{
        startQuiz();
    }
})


startQuiz();