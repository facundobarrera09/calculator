const numbersDisplay = document.querySelector('.display #number');
const operatorDisplay = document.querySelector('.display #operator');
const buttons = document.querySelector('.buttons');

// Calculator
let total = undefined;
let queuedNumber = undefined;
let firstNumber = undefined, secondNumber = undefined;
let operation = undefined;
let operationPerformed = false;

function queueNumber(number)
{
    queuedNumber = Number.parseInt(
        `${(queuedNumber === undefined) ? 0 : queuedNumber}${number}`);

    if (operationPerformed)
        updateDisplay(queuedNumber, operation);
    else
        updateDisplay(queuedNumber);
}

function parseNumber()
{
    let aux;

    if (queuedNumber !== undefined)
    {
        /* if (operationPerformed && )
        {
            aux = queuedNumber;
            resetCalculator();
            queuedNumber = aux;
        } */

        if (firstNumber === undefined)
            firstNumber = queuedNumber;
        else
            secondNumber = queuedNumber;
        
        queuedNumber = undefined;
    }
}

function queueOperator(operator)
{
    performOperation();
    operation = operator;
    updateDisplay(undefined, operator);
}

function performOperation()
{
    parseNumber();

    if ([firstNumber, secondNumber, operation].some(elem => (elem === undefined) ? true : false))
        return;

    total = (operation === '+') ? firstNumber + secondNumber :
            (operation === '-') ? firstNumber - secondNumber :
            (operation === '*') ? firstNumber * secondNumber :
            (operation === '/') ? 
                ((secondNumber !== 0) ? firstNumber / secondNumber : 'math error') : 
            'syntax error';

    firstNumber = total;
    operationPerformed = true;

    updateDisplay(total, '=');
}

function resetCalculator()
{
    total = undefined;
    queuedNumber = undefined;
    firstNumber = undefined;
    secondNumber = undefined;
    operation = undefined;
    operationPerformed = false;

    updateDisplay('0', '');
}

// Display

function updateDisplay(number, operator)
{
    if (number !== undefined) numbersDisplay.textContent = number;
    operatorDisplay.textContent = (operator !== undefined) ? operator : '';
}

// Add buttons to html
const CALC_BUTTONS =  [[['AC', 'Delete'], ['DEL', 'Backspace']],
                                [['7', '7'], ['8', '8'], ['9', '9'], ['-', '-']],
                                [['4', '4'], ['5', '5'], ['6', '6'], ['+', '+']],
                                [['1', '1'], ['2', '2'], ['3', '3'], ['*', '*']],
                                [ '', ['0', '0'] , '', ['/', '/']],
                                [['=', '=']]];

const CALC_NUMBERS = ('0123456789').split('');
const CALC_OPERATORS = ('+-*/=').split('');
const CALC_DELETE = ['DEL', 'DELETE'];
const CALC_AC = ['AC', 'CLEAR'];
                        
const calculatorButtons = CALC_BUTTONS.map
                            (line => line.map
                            (keyData => ({ name: keyData[0], key: keyData[1] })
                            ));

for (let x = 0; x < calculatorButtons.length; x++)
{
    const line = document.createElement('div');
    line.classList.add('line');

    for (let y = 0; y < calculatorButtons[x].length; y++)
    {
        const button = document.createElement('button');
        button.classList.add('number-button');
        button.textContent = calculatorButtons[x][y].name;
        button.setAttribute('data-key', calculatorButtons[x][y].key);

        if (calculatorButtons[x][y].key === undefined) button.style['visibility'] = 'hidden'; 

        line.appendChild(button);
    }

    buttons.appendChild(line);
}

// Buttons event listeners
window.addEventListener('click', buttonPressed);

function buttonPressed(e)
{
    if (e.target.tagName !== 'BUTTON') return;

    let key = e.target.textContent;

    if (CALC_NUMBERS.some(num => (key === num) ? true : false))
        queueNumber(Number.parseFloat(key));
    else if (CALC_OPERATORS.some(op => (key === op) ? true : false))
        queueOperator(key);
    else if (CALC_AC.some(ac => (key === ac) ? true : false))
        resetCalculator();
    else if (CALC_DELETE.some(del => (key === del) ? true : false))
        console.log('not implemented');
}