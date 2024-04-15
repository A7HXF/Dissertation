const questions = [
    {
        question: "What is government impersonation?",
        answers: [
            {text: "Legitimate government communication for tax purposes", correct: false},
            {text: "Scammers posing as government officials to extract personal information or money", correct: true},
            {text: "A new form of government digital communication service", correct: false},
            {text: "Official government surveys for census data collection", correct: false}
        ]
    },
    {
        question: "What is a common result of falling for a government impersonation scam?",
        answers: [
            {text: "Receiving a government grant", correct: false},
            {text: "Financial loss due to fake fines or fees", correct: true},
            {text: "Improved credit score", correct: false},
            {text: "Official recognition from a government agency", correct: false}
        ]
    },
    {
        question: "Which of the following is an example of a government impersonation scam?",
        answers: [
            {text: "An email from a scammer claiming your Social Security number has been suspended", correct: true},
            {text: "A newsletter from the local government about community events", correct: false},
            {text: "A verified letter from the IRS regarding your tax return", correct: false},
            {text: "An official government website providing health guidelines", correct: false}
        ]
    },
    {
        question: "How can you protect yourself from government impersonation scams?",
        answers: [
            {text: "Respond quickly to urgent requests for money", correct: false},
            {text: "Verify the authenticity of the communication through official channels", correct: true},
            {text: "Provide personal information when requested by phone or email to verify your identity", correct: false},
            {text: "Trust all callers claiming to be from government agencies", correct: false}
        ]
    },
    {
        question: "What should you do if you receive a call claiming you owe back taxes and must pay immediately?",
        answers: [
            {text: "Pay immediately using a gift card or wire transfer", correct: false},
            {text: "Hang up and verify the claim by contacting the IRS through their official website or phone number", correct: true},
            {text: "Provide your banking information to the caller to verify your identity", correct: false},
            {text: "Agree to the demands to avoid potential arrest", correct: false}
        ]
    },
    {
        question: "What indicates a communication might be a government impersonation scam?",
        answers: [
            {text: "The caller uses a government phone number and email address", correct: false},
            {text: "Urgent demands for immediate payment or personal information", correct: true},
            {text: "The use of formal language and government logos", correct: false},
            {text: "Communication via official government websites", correct: false}
        ]
    },
    {
        question: "Why should you report government impersonation scams?",
        answers: [
            {text: "To claim a reward", correct: false},
            {text: "To help prevent others from becoming victims", correct: true},
            {text: "To receive compensation for your losses", correct: false},
            {text: "To enroll in a government protection program", correct: false}
        ]
    },
    {
        question: "What is NOT a recommended prevention strategy for government impersonation scams?",
        answers: [
            {text: "Sharing personal information freely on social media", correct: true},
            {text: "Keeping personal and financial information secure", correct: false},
            {text: "Educating yourself about common scam tactics", correct: false},
            {text: "Verifying suspicious contacts through official means", correct: false}
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