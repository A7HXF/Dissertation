const questions = [
    {
        question: "What is a Man-in-the-Middle (MitM) attack?",
        answers: [
            {text: "A direct attack on a server to steal data", correct: false},
            {text: "An attack where the attacker intercepts and possibly alters the communication between two parties", correct: true},
            {text: "A software that protects users from cyber threats", correct: false},
            {text: "A method of strengthening network security", correct: false}
        ]
    },
    {
        question: "What can be intercepted during a MitM attack?",
        answers: [
            {text: "Only email messages", correct: false},
            {text: "Sensitive information like login credentials and personal data", correct: true},
            {text: "Hardware signals only", correct: false},
            {text: "Nothing, as it is a passive attack", correct: false}
        ]
    },
    {
        question: "Which example describes a MitM attack?",
        answers: [
            {text: "A virus that deletes files from a hard drive", correct: false},
            {text: "Setting up an unsecured Wi-Fi network to intercept data", correct: true},
            {text: "Sending spam emails to thousands of users", correct: false},
            {text: "Encrypting files and demanding a ransom", correct: false}
        ]
    },
    {
        question: "How can you prevent Man-in-the-Middle attacks when using public Wi-Fi?",
        answers: [
            {text: "By avoiding public Wi-Fi altogether", correct: false},
            {text: "Connecting without a password", correct: false},
            {text: "Using a reliable Virtual Private Network (VPN)", correct: true},
            {text: "Using public Wi-Fi frequently to confuse potential attackers", correct: false}
        ]
    },
    {
        question: "What does DNS spoofing involve?",
        answers: [
            {text: "Speeding up internet connections", correct: false},
            {text: "Improving website security", correct: false},
            {text: "Redirecting users to fraudulent websites", correct: true},
            {text: "Protecting DNS servers from attacks", correct: false}
        ]
    },
    {
        question: "Why is using encrypted connections important?",
        answers: [
            {text: "To speed up the browsing experience", correct: false},
            {text: "To prevent attackers from easily intercepting or altering your data", correct: true},
            {text: "Encryption does not help in security; it only complicates browsing", correct: false},
            {text: "It is not necessary; modern browsers are secure enough", correct: false}
        ]
    },
    {
        question: "What should be done to enhance security against MitM attacks on important accounts?",
        answers: [
            {text: "Use simple passwords for easier recovery", correct: false},
            {text: "Enable multi-factor authentication", correct: true},
            {text: "Share passwords with a trusted friend for backup", correct: false},
            {text: "Avoid updating the software to keep the original settings", correct: false}
        ]
    },
    {
        question: "What is a primary method to protect sensitive information over the internet?",
        answers: [
            {text: "Using antivirus software only", correct: false},
            {text: "Sending information over email without encryption", correct: false},
            {text: "Being cautious about sharing sensitive information on unsecured or unknown networks", correct: true},
            {text: "Posting sensitive data on social media for quick access", correct: false}
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