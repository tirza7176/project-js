const num1 = document.getElementById('num1');
const num2 = document.getElementById('num2');
const num3 = document.getElementById('num3');
const btna = document.getElementById('btna');
const btn = document.getElementById('btn');
const resetButton = document.getElementById("reset");
const operatorElement = document.getElementById('operator');
let operator;
function getRandomOperator() {
    const operators = ['+', '-', '*', '/'];
    return operators[Math.floor(Math.random() * operators.length)];

};

btna.addEventListener('click', function () {
    num1.value = Math.floor(Math.random() * 100 + 1)
    num2.value = Math.floor(Math.random() * 100 + 1)
    operator = getRandomOperator();
    operatorElement.textContent = operator;
    if (operator == '-' || operator == '/') {
        if (num1.value > num2.value) {
            return;
        }
        else {
            const tmp = num2.value;
            num2.value = num1.value;
            num1.value = tmp;

        }
    }
});


btn.addEventListener('click', function () {
    switch (parseInt(num3.value)) {
        case parseInt(num1.value) + parseInt(num2.value):
            alert("ידעת מצוין")
            break;
        case parseInt(num1.value) * parseInt(num2.value):
            alert("ידעת מצוין")
            break;
        case parseInt(num1.value) - parseInt(num2.value):
            alert("ידעת מצוין")
            break;
        case parseInt(num1.value) / parseInt(num2.value):
            alert("ידעת מצוין")
            break;

        default:
            alert("נסה שוב!")
    }
});
function reset() {
    num1 = " ";
    num2 = " ";
    num3 = " ";
    operator = " ";
};
resetButton.addEventListener("click", reset);