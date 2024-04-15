const questions = [
    {
        question: "What is Phishing?",
        answers: [
            {text: "A type of computer virus", correct: false},
            {text: "A deceptive practice to obtain sensitive information", correct: true},
            {text: "A security program to protect computers", correct: false},
            {text: "A method to speed up your internet connection", correct: false}
        ]
    },
    {
        question: "Which of the following is a main issue caused by phishing?",
        answers: [
            {text: "Improvement in system efficiency", correct: false},
            {text: "Financial loss", correct: true},
            {text: "Faster computer performance", correct: false},
            {text: "Enhanced data security", correct: false}
        ]
    },
    {
        question: "What is an example of email phishing?",
        answers: [
            {text: "An email from a friend sharing a photo", correct: false},
            {text: "An email impersonating a bank asking for account verification", correct: true},
            {text: "A regular newsletter from a verified source", correct: false},
            {text: "An update email from your antivirus software", correct: false}
        ]
    },
    {
        question: "What is SMS Phishing?",
        answers: [
            {text: "Receiving a promotional message from a known retailer", correct: false},
            {text: "Text messages asking to track a non-existent package", correct: true},
            {text: "A confirmation SMS for an online order", correct: false},
            {text: "An informational text about data charges", correct: false}
        ]
    },
    {
        question: "How can you protect yourself from phishing?",
        answers: [
            {text: "By opening all email attachments", correct: false},
            {text: "By using strong passwords only", correct: false},
            {text: "By verifying sources before providing sensitive information", correct: true},
            {text: "By using the internet less frequently", correct: false}
        ]
    },
    {
        question: "What should you do with links in unsolicited emails?",
        answers: [
            {text: "Click to find more information", correct: false},
            {text: "Ignore and delete the email", correct: true},
            {text: "Share the link with others to check", correct: false},
            {text: "Save the link for later review", correct: false}
        ]
    },
    {
        question: "What is a common sign of a phishing attack?",
        answers: [
            {text: "Emails that look exactly like they come from a legitimate source", correct: true},
            {text: "Emails that clearly state they are from a friend or family", correct: false},
            {text: "Emails that offer free software upgrades", correct: false},
            {text: "Emails that are well-formatted and error-free", correct: false}
        ]
    },
    {
        question: "Which feature can add an extra layer of security to protect against phishing?",
        answers: [
            {text: "Using popular passwords", correct: false},
            {text: "Disabling your antivirus", correct: false},
            {text: "Two-factor authentication", correct: true},
            {text: "Clearing your browsing history regularly", correct: false}
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