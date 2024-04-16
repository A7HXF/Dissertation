const questions = [
    {
        question: "What primarily does social engineering exploit to gain unauthorized access?",
        answers: [
            {text: "Computer vulnerabilities", correct: false},
            {text: "Human psychology", correct: true},
            {text: "Network infrastructure", correct: false},
            {text: "Physical security weaknesses", correct: false}
        ]
    },
    {
        question: "What is an outcome of successful social engineering?",
        answers: [
            {text: "Improved system performance", correct: false},
            {text: "Unauthorized access to restricted areas", correct: true},
            {text: "Increased network bandwidth", correct: false},
            {text: "Upgraded hardware security", correct: false}
        ]
    },
    {
        question: "What is pretexting in the context of social engineering?",
        answers: [
            {text: "Fixing technical issues remotely", correct: false},
            {text: "Creating a fabricated scenario to engage a targeted victim", correct: true},
            {text: "Sending malware through email attachments", correct: false},
            {text: "Physically securing data centers", correct: false}
        ]
    },
    {
        question: "What should you do if you receive an unexpected request for sensitive information?",
        answers: [
            {text: "Provide the information if the requester seems legitimate", correct: false},
            {text: "Verify the identity of the requester", correct: true},
            {text: "Ignore the request", correct: false},
            {text: "Report the request to law enforcement", correct: false}
        ]
    },
    {
        question: "Which technique is a form of social engineering?",
        answers: [
            {text: "Phishing", correct: true},
            {text: "SQL injection", correct: false},
            {text: "Brute force attack", correct: false},
            {text: "DDoS attack", correct: false}
        ]
    },
    {
        question: "What is a primary prevention tip for avoiding social engineering?",
        answers: [
            {text: "Installing antivirus software", correct: false},
            {text: "Being skeptical of unexpected requests", correct: true},
            {text: "Using strong passwords", correct: false},
            {text: "Keeping software up-to-date", correct: false}
        ]
    },
    {
        question: "What is baiting in social engineering?",
        answers: [
            {text: "Attacking with a virus", correct: false},
            {text: "Offering something enticing to extract private information", correct: true},
            {text: "Blocking access to services", correct: false},
            {text: "Sending spam emails", correct: false}
        ]
    },
    {
        question: "How can organizations reduce the risk of social engineering attacks?",
        answers: [
            {text: "By regularly updating firewall settings", correct: false},
            {text: "By conducting regular employee training on cybersecurity risks", correct: true},
            {text: "By increasing the physical security of their buildings", correct: false},
            {text: "By installing more surveillance cameras", correct: false}
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