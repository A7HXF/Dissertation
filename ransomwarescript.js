const questions = [
    {
        question: "What is ransomware?",
        answers: [
            {text: "A program that helps recover lost data", correct: false},
            {text: "Malicious software that encrypts a victim's files and demands a ransom", correct: true},
            {text: "Software used by governments to control cybercrime", correct: false},
            {text: "A security software that protects data from theft", correct: false}
        ]
    },
    {
        question: "What can be a consequence of a ransomware attack?",
        answers: [
            {text: "Quick recovery of all data", correct: false},
            {text: "Temporary increase in computer speed", correct: false},
            {text: "Loss of data and significant financial cost", correct: true},
            {text: "Enhanced system security after the attack", correct: false}
        ]
    },
    {
        question: "Which of the following is an example of ransomware?",
        answers: [
            {text: "WannaCry, which exploited vulnerabilities in Windows operating systems", correct: true},
            {text: "Linux, a popular operating system", correct: false},
            {text: "Norton Antivirus", correct: false},
            {text: "Google Chrome web browser", correct: false}
        ]
    },
    {
        question: "What should you do to prevent ransomware?",
        answers: [
            {text: "Install more applications to diversify the risk", correct: false},
            {text: "Keep regular backups of important files in separate locations", correct: true},
            {text: "Use older versions of software to avoid attracting attention", correct: false},
            {text: "Limit the use of antivirus to prevent software conflicts", correct: false}
        ]
    },
    {
        question: "Why is it important to update and patch systems regularly?",
        answers: [
            {text: "To keep the user interface trendy", correct: false},
            {text: "To prevent ransomware by fixing vulnerabilities", correct: true},
            {text: "To consume more internet bandwidth", correct: false},
            {text: "Updates are not important; it is a common misconception", correct: false}
        ]
    },
    {
        question: "What type of files did CryptoLocker target for encryption?",
        answers: [
            {text: "Files larger than 1GB only", correct: false},
            {text: "Only video files", correct: false},
            {text: "A wide range of file types to maximize impact", correct: true},
            {text: "CryptoLocker did not encrypt files, it only stole passwords", correct: false}
        ]
    },
    {
        question: "What should NOT be done when dealing with a ransomware attack?",
        answers: [
            {text: "Paying the ransom as it encourages further attacks", correct: true},
            {text: "Disconnecting from the network to prevent further spread", correct: false},
            {text: "Reporting the incident to cybersecurity authorities", correct: false},
            {text: "Using reputable antivirus software to scan and remove threats", correct: false}
        ]
    },
    {
        question: "What is a key preventative measure against ransomware?",
        answers: [
            {text: "Opening all email attachments to check for threats", correct: false},
            {text: "Using outdated security software to confuse attackers", correct: false},
            {text: "Avoiding suspicious links and attachments", correct: true},
            {text: "Regularly changing your computer's hardware components", correct: false}
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