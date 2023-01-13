let enter_button, prompt, div_context, div_answer,highest_score,lowest_score;
const accBERT_RESULT = (array) => { //highest and lowest from (answers)
    let max = 0, min = 0, max_index = 0, min_index = 0;
    for(let i in array){
        if(array[i]["score"] < max){
            max_index = i;
            max = array[i]["score"];
        } else {
            min_index = i;
            min = array[i]["score"];
        }
    }
    highest_score.innerHTML = `${array[max_index]["text"]} (score = ${array[max_index]["score"]})`;
    lowest_score.innerHTML = `${array[min_index]["text"]} (score = ${array[min_index]["score"]})`;
}
const searchBERT = async () => {
    qna.load().then(model => {
        model.findAnswers(prompt.value, div_context.value).then(answers => {
            div_answer.innerHTML =
                answers.map(answer => `${answer.text} (score = ${answer.score}) (start = ${answer.startIndex}) (end = ${answer.endIndex})` )
                    .join('<br>');
            try{ //to avoid automatic function calls -> when loadPage()
                accBERT_RESULT(answers);//logging answer with the highest and lowest scores
            }catch(e){}
        });
    })
};
const loadPage = () => { //load page
    prompt = document.getElementById('prompt');
    div_context = document.getElementById('context');
    enter_button = document.getElementById('enter');
    div_answer = document.getElementById('answers');
    highest_score = document.getElementById('highest_score');
    lowest_score = document.getElementById('lowest_score');

    enter_button.addEventListener("click",searchBERT,false);
}

window.onload = loadPage;
