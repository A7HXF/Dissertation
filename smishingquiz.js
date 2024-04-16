const questions = [
    {
        question: "What is smishing?",
        answers: [
            {text: "A secure messaging protocol", correct: false},
            {text: "Phishing via SMS messages", correct: true},
            {text: "A type of malware", correct: false},
            {text: "A method to encrypt text messages", correct: false}
        ]
    },
    {
        question: "What is a common goal of smishing scams?",
        answers: [
            {text: "To improve SMS security", correct: false},
            {text: "To gain unauthorized access to financial details", correct: true},
            {text: "To provide user authentication", correct: false},
            {text: "To encrypt user data", correct: false}
        ]
    },
    {
        question: "Which issue is NOT directly caused by smishing?",
        answers: [
            {text: "Financial theft", correct: false},
            {text: "Software updates", correct: true},
            {text: "Personal data breach", correct: false},
            {text: "Device infection", correct: false}
        ]
    },
    {
        question: "What could a smishing text message falsely claim to be about?",
        answers: [
            {text: "A legitimate job offer", correct: false},
            {text: "Bank account alerts regarding irregular activity", correct: true},
            {text: "A confirmed package delivery", correct: false},
            {text: "A scheduled software update", correct: false}
        ]
    },
    {
        question: "What should you do if you receive a suspicious SMS that asks for personal information?",
        answers: [
            {text: "Reply with the requested information if the sender seems legitimate", correct: false},
            {text: "Verify the sender's identity through official channels", correct: true},
            {text: "Ignore the message completely without further action", correct: false},
            {text: "Forward the message to friends to check its authenticity", correct: false}
        ]
    },
    {
        question: "How can smishing texts affect your mobile device?",
        answers: [
            {text: "Improve the device's performance", correct: false},
            {text: "Install malware", correct: true},
            {text: "Enhance data encryption", correct: false},
            {text: "Increase storage capacity", correct: false}
        ]
    },
    {
        question: "Which of the following is an effective prevention tip against smishing?",
        answers: [
            {text: "Click links to verify their authenticity", correct: false},
            {text: "Avoid clicking on links in unsolicited SMS messages", correct: true},
            {text: "Respond quickly to all SMS alerts", correct: false},
            {text: "Regularly change your phone number", correct: false}
        ]
    },
    {
        question: "Why is educating yourself about smishing important?",
        answers: [
            {text: "It helps you create more secure passwords", correct: false},
            {text: "It helps you recognize and avoid scams", correct: true},
            {text: "It is required for installing mobile applications", correct: false},
            {text: "It increases your SMS quota", correct: false}
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