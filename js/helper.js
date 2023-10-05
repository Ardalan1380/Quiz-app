const formatData = questionData => {
    const result =  questionData.map((item) => {
        const questionObject = {question : item.question};
        const answers = [...item.incorrect_answers];
        const correctAnswwerIndex = Math.floor(Math.random() * 4)
        answers.splice(correctAnswwerIndex , 0 ,item.correct_answer)
        questionObject.answers = answers;
        questionObject.correctAnswwerIndex = correctAnswwerIndex;        
        return questionObject
    })
    return result
}


export default formatData;