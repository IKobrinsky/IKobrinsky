let minValue = 0;
let maxValue = 100;

let answerNumber  = 0;
let orderNumber = 1;
let gameRun = false;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

setListners();

initGame();

function startGame()
{
    orderNumber = 1;
    orderNumberField.innerText = orderNumber;
    setElementVisibility(true);
    answerNumber  = Math.floor((minValue + maxValue) / 2);
    answerField.innerText =  getQuestionString(answerNumber);
    return true;
}

function initGame()
{
    minValue = 0;
    maxValue = 100;
    document.getElementById("minValue").value = 0;
    document.getElementById("maxValue").value = 100;
    setElementVisibility(false);
    setInvitationText();
}

function getNumberValue(elementId, minLimit, maxLimit, defaultValue)
{
    let valueStr = document.getElementById(elementId).value;
    let value=0;
    value=+valueStr;
    value =  value || defaultValue;
    value = value < minLimit ? minLimit : (value > maxLimit ? maxLimit : value);
    document.getElementById(elementId).value = value;
    return value;
}

function setInvitationText()
{
    minValue = getNumberValue("minValue", -999, 998, 0);
    maxValue = getNumberValue("maxValue", -998, 999, 100);
    if (minValue>=maxValue) minValue=maxValue-1;
    document.querySelector(".form-header").innerText = `Загадайте число в пределах от ${minValue} до  ${maxValue}`;
}

function setListners()
{
    
document.querySelector(".btn-start").addEventListener("click", ()=> {gameRun = startGame();});

document.getElementById('btnRetry').addEventListener('click', ()=> { initGame();});

document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun){
        if (minValue === maxValue || maxValue== answerNumber){
            loose();
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = getQuestionString(answerNumber) ;
        }
    }
});

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun){
        
        if (minValue == maxValue || minValue== answerNumber){
            loose();
        } else {
            maxValue = answerNumber  - 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2) ;
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            answerField.innerText = getQuestionString(answerNumber) ;
        }
    }
});

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        answerField.innerText = getWinningString();
        gameRun = false;
    }
});

for(let element of document.getElementsByClassName("form-control-plaintext"))
{
    element.addEventListener("change",()=>
    {
        setInvitationText();
    }
    );
}

}

function loose()
{
    const phraseRandom = Math.floor( Math.random()*2);
    const answerPhrase = (phraseRandom === 1) ?
        `Вы загадали неправильное число!\n\u{1F914}` :
        `Я сдаюсь..\n\u{1F92F}`;

    answerField.innerText = answerPhrase;
    gameRun = false;
}

function getWinningString()
{
    let rnd =  Math.floor( Math.random()*3);
    switch (rnd) {
    case 0:
        return `Я всегда угадываю\n\u{1F60E}`;
    case 1: 
        return `Это было легко.`;
    case 2: 
        return `Я просто знал.`;
    }
    return "что это с рандомом?";     
}

function getQuestionString(answerNum)
{
    let rnd =  Math.floor( Math.random()*3);
    
    let numberString = numberToWords(answerNum)
    switch (rnd) {
    case 0:
        return `Вы загадали число ${numberString }?`;
    case 1: 
        return `Это ${numberString }?`;
    case 2: 
        return `Может быть ${numberString }?`;
    }
    return "что это с рандомом?";   
}



function setElementVisibility(bodyVisible)
{
    for(let input of document.getElementsByClassName("card-body"))
    {
        input.style.display = bodyVisible ? "block" : "none";
    }
    for(let input of document.getElementsByClassName("card-input"))
    {
        input.style.display =  !bodyVisible ? "block" : "none";
    }
    document.querySelector(".game-header").style.display = bodyVisible ? "block" : "none";
    document.querySelector(".btn-retry").style.display = bodyVisible ? "block" : "none";
    document.querySelector(".btn-start").style.display = !bodyVisible ? "block" : "none";
}



const units = ["", " один", " два", " три", " четыре", " пять", " шесть", " семь", " восемь", " девять"];
const dozens = ["", " десять", " двадцать", " тридцать", " сорок", " пятьдесят", " шестьдесят", " семьдесят", " восемьдесят", " девяносто"];
const hundreds = ["", " cто", " двести", " тристо", " четыресто", " пятьсот", " шестьсот", " семьсот", " восемьсот", " девятьсот"];
const elevenToNineteen = [" одинадцать", " двенадцать", " тринадцать", " четырнадцать", " пятнадцать", " шестнадцать", " семнадцать", " восемнадцать", " девятнадцать"];
const minus = "минус";
const zero = "ноль";
function numberToWords(n)
{
    if (n==0) return zero;
    let abs_n = Math.abs(n);
    let result = n<0? minus : ""
        + hundreds[Math.floor(abs_n / 100)]
        + ((abs_n % 100 > 10 && abs_n % 100 < 20) ? 
            elevenToNineteen[abs_n % 100 - 11] :
            dozens[Math.floor(abs_n % 100 / 10)])
        + ((abs_n % 100 > 10 && abs_n % 100 < 20) ? "" : units[Math.floor(abs_n % 10)]);
    result = result.trim();
    if(result.length>=20) return n.toString();
    return result;
}