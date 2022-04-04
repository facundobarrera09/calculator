const display = document.querySelector('.display span');
const buttons = document.querySelector('.buttons');

// Add buttons to html
const calculatorButtonsArray =  [[['AC', 'Delete'], ['DEL', 'Backspace']],
                                [['7', '7'], ['8', '8'], ['9', '9'], ['-', '-']],
                                [['4', '4'], ['5', '5'], ['6', '6'], ['+', '+']],
                                [['1', '1'], ['2', '2'], ['3', '3'], ['*', '*']],
                                [ '', ['0', '0'] , '', ['/', '/']],
                                [['=', '=']]];
                        
const calculatorButtons = calculatorButtonsArray.map
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

// Add buttons funtionality
