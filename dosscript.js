const questions = [
    {
        question: "What is the primary goal of a Denial-of-Service attack?",
        answers: [
            {text: "To steal sensitive data", correct: false},
            {text: "To make a service unavailable to its users", correct: true},
            {text: "To install malware on the target's network", correct: false},
            {text: "To physically damage computer hardware", correct: false}
        ]
    },
    {
        question: "What does a Denial-of-Service attack typically involve?",
        answers: [
            {text: "Sending high volumes of data requests to crash systems", correct: true},
            {text: "Phishing emails to trick users", correct: false},
            {text: "Spyware to monitor user activities", correct: false},
            {text: "None of the above", correct: false}
        ]
    },
    {
        question: "Which issue is NOT caused by Denial-of-Service attacks?",
        answers: [
            {text: "Disruption of Services", correct: false},
            {text: "Theft of personal information", correct: true},
            {text: "Financial Losses", correct: false},
            {text: "Reputational Damage", correct: false}
        ]
    },
    {
        question: "What is a buffer overflow attack?",
        answers: [
            {text: "A method to steal data", correct: false},
            {text: "Overloading the target system's memory to cause crashes", correct: true},
            {text: "A phishing technique", correct: false},
            {text: "Encrypting data for ransom", correct: false}
        ]
    },
    {
        question: "What is the effect of an ICMP Flood attack?",
        answers: [
            {text: "It steals user credentials", correct: false},
            {text: "It overloads the target with ping packets", correct: true},
            {text: "It sends spam emails", correct: false},
            {text: "It corrupts data on the target server", correct: false}
        ]
    },
    {
        question: "Which of the following is a prevention tip for DoS attacks?",
        answers: [
            {text: "Install antivirus software on all devices", correct: false},
            {text: "Use firewalls to block malicious traffic", correct: true},
            {text: "Regularly change passwords", correct: false},
            {text: "Only connect to secure Wi-Fi", correct: false}
        ]
    },
    {
        question: "How does employing load balancers help prevent DoS attacks?",
        answers: [
            {text: "They encrypt data transmitted over the network", correct: false},
            {text: "They distribute incoming traffic across multiple servers", correct: true},
            {text: "They monitor email traffic for phishing attempts", correct: false},
            {text: "They filter out malicious URLs", correct: false}
        ]
    },
    {
        question: "What should be included in a network's design to ensure continuity during a DoS attack?",
        answers: [
            {text: "Data encryption protocols", correct: false},
            {text: "Redundant systems and backup servers", correct: true},
            {text: "Biometric security measures", correct: false},
            {text: "Regular software updates", correct: false}
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