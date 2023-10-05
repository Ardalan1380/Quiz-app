import formatData from "./helper.js";

const level = localStorage.getItem("level") || "medium";

const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionText = document.getElementById("question-text");
const answerList = document.querySelectorAll(".answer-text");
const scoreText = document.getElementById("question-score");
const nextButton = document.getElementById("next-button");
const finishButton = document.getElementById("finish-button");
const questionNumber = document.getElementById("question-number");
const error = document.getElementById("error");

const CORRECT_BONUS = 10;
const URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;
let formatedData = null;
let questionIndex = 0;
let correctAnswer = null;
let score = 0;
let isAccepted = true;

const fetchData = async () => {
    try {
        const res = await fetch(URL);
        const json = await res.json()
        formatedData = formatData(json.results );
        start();    
    } catch (error) {
    loader.style.display = "none";
    loader.style.display = "block"
        
    }
}

const start = () => {
    showQuestion()
    loader.style.display = "none";
    container.style.display = "block";
}

const showQuestion = () => {
    questionNumber.innerText = questionIndex + 1
    const {question , answers , correctAnswwerIndex} =  formatedData[questionIndex];
    correctAnswer = correctAnswwerIndex	;
    questionText.innerText = question;
    answerList.forEach((button , index) => {
        button.innerText = answers[index];
    })
}

const checkAnswer = (index , event ) => {
    if(!isAccepted) return;
    isAccepted = false;
    const isCorrect = index === correctAnswer ? true : false
    // console.log(isCorrect)
    if(isCorrect) {
        event.target.classList.add('correct');
        score += CORRECT_BONUS;
        scoreText.innerText = score;
    }else {
        event.target.classList.add("incorrect");
        answerList[correctAnswer].classList.add("correct");
    }
    
}

const nextHandler = () => {
    if(questionIndex < formatedData.length - 1) {
        isAccepted = true
        questionIndex ++;
        removeClasses();
        showQuestion()
    }else {
        finishHandler()
    }
}

const finishHandler = () => {
    localStorage.setItem("score",JSON.stringify(score));
    window.location.assign("end.html")
}

const removeClasses = () => {
    answerList.forEach((button) => button.className = "answer-text")
}

window.addEventListener("load" , fetchData);
nextButton.addEventListener("click" , nextHandler);
finishButton.addEventListener("click" , finishHandler);
answerList.forEach((button , index) => {
    button.addEventListener("click" , (event) => checkAnswer(index , event))
})
