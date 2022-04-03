const buttons = document.querySelector('.buttons');

// Add buttons
const calculatorButtons = [['AC', 'DEL'],
                            ['7', '8', '9', '-'],
                            ['4', '5', '6', '+'],
                            ['1', '2', '3', '*'],
                            [ '', '0' , '', '/'],
                            ['=']];

for (let x = 0; x < calculatorButtons.length; x++)
{
    const line = document.createElement('div');
    line.classList.add('line');

    for (let y = 0; y < calculatorButtons[x].length; y++)
    {
        const button = document.createElement('button');
        button.classList.add('number-button');
        button.textContent = calculatorButtons[x][y];
        console.log(calculatorButtons[x][y] == '');

        if (calculatorButtons[x][y] == '') button.style['visibility'] = 'hidden'; 

        line.appendChild(button);
    }

    buttons.appendChild(line);
}