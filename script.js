const numbersDisplay = document.querySelector('.display #number');
const operatorDisplay = document.querySelector('.display #operator');
const buttons = document.querySelector('.buttons');

// Calculator
let total = undefined;
let queuedNumber = undefined;
let firstNumber = undefined, secondNumber = undefined;
let operation = undefined;
let operationPerformed = false;
let hasFloatingPoint = false;

function queueNumber(number)
{
    if (number === '.') 
        if (hasFloatingPoint)
            return;
        else 
            hasFloatingPoint = true;

    queuedNumber = `${(queuedNumber === undefined) ? 0 : queuedNumber}${number}`;

    if (number !== '.' && !hasFloatingPoint) queuedNumber = Number.parseFloat(queuedNumber);

    if (operationPerformed)
        updateDisplay(queuedNumber, operation);
    else
        updateDisplay(queuedNumber);
}

function deleteNumber()
{
    if (operationPerformed) return;

    const queuedNumberArray = `${queuedNumber}`.split('');
    const removed = queuedNumberArray.splice(queuedNumberArray.length-1,1);
    queuedNumber = queuedNumberArray.join('');

    if (removed[0] === '.') hasFloatingPoint = false;

    if (Number.isNaN(queuedNumber) === true) queuedNumber = undefined;

    updateDisplay(queuedNumber, operation);
}

function parseNumber()
{
    if (queuedNumber !== undefined)
    {
        queuedNumber = Number.parseFloat(queuedNumber);
        hasFloatingPoint = false;

        if (firstNumber === undefined)
            firstNumber = queuedNumber;
        else
            secondNumber = queuedNumber;
        
        queuedNumber = undefined;
    }
}

function queueOperator(operator)
{
    if (!operationPerformed) performOperation();
    else operationPerformed = false;
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

    total = Number.parseFloat(total.toFixed(4));

    if (isNaN(total)) 
    {
        let aux = total;
        resetCalculator();
        total = aux;
    }
    else
    {
        firstNumber = total;
        operationPerformed = true;
    }

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
    hasFloatingPoint = false;

    updateDisplay('0', '');
}

// Display

function updateDisplay(number, operator)
{
    numbersDisplay.textContent = (number !== undefined) ? number :
                                 (firstNumber !== undefined) ? firstNumber :
                                 0;
    operatorDisplay.textContent = (operator !== undefined) ? operator : '';
}

// Add buttons to html
const CALC_BUTTONS =  [[['AC', 'Delete'], ['DEL', 'Backspace']],
                                [['7', '7'], ['8', '8'], ['9', '9'], ['-', '-']],
                                [['4', '4'], ['5', '5'], ['6', '6'], ['+', '+']],
                                [['1', '1'], ['2', '2'], ['3', '3'], ['*', '*']],
                                [ '', ['0', '0'] , ['.', '.'], ['/', '/']],
                                [['=', '=']]];

const CALC_NUMBERS = ('0123456789.').split('');
const CALC_OPERATORS = ('+-*/').split('');
const CALC_EQUALS = ['=', 'Enter'];
const CALC_DELETE = ['DEL', 'Backspace'];
const CALC_AC = ['AC', 'Delete'];
                        
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

        if (calculatorButtons[x][y].name === 'AC' || calculatorButtons[x][y].name === 'DEL')
            button.style['background-color'] = 'aquamarine';

        if (calculatorButtons[x][y].key === undefined) button.style['visibility'] = 'hidden'; 

        line.appendChild(button);
    }

    buttons.appendChild(line);
}

// Buttons event listeners
window.addEventListener('click', buttonPressed);
window.addEventListener('keydown', buttonPressed);

function buttonPressed(e)
{
    // Get pressed key from window or keyboard
    let key;
    if (e.target.tagName === 'BUTTON' && e.type === 'click')
        key = e.target.textContent;
    else
        key = e.key;

    // Find what button was pressed
    if (CALC_NUMBERS.some(num => (key === num) ? true : false))
        queueNumber(key);
    else if (CALC_OPERATORS.some(op => (key === op) ? true : false))
        queueOperator(key);
    else if (CALC_EQUALS.some(eq => (key === eq) ? true : false))
        performOperation();
    else if (CALC_AC.some(ac => (key === ac) ? true : false))
        resetCalculator();
    else if (CALC_DELETE.some(del => (key === del) ? true : false))
        deleteNumber();
}
