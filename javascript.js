buttons = document.querySelectorAll(".button");
screen = document.querySelector(".numbers-wrapper");
operatorScreen = document.querySelector(".operator-wrapper")

function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};


function operate(operator, a, b) {
    if (operator === "+") {
        return add(parseFloat(a), parseFloat(b));
    } else if (operator === "-") {
        return subtract(parseFloat(a), parseFloat(b));
    } else if (operator === "x") {
        return multiply(a, b);
    } else if (operator === "÷") {
        return divide(a, b);
    }
}

let operatorOnScreen, numberOnScreen;

buttons.forEach(function(button) {
    button.addEventListener("mousedown", function() {
        // initialize
        let colorChangeTimeout;
        clearTimeout(colorChangeTimeout);
        screen.style.fontSize = "75px";

        // change color
        button.style.borderColor = "#EBF6FF";
        button.style.backgroundColor = "peachpuff";

        if (button.textContent === "=") {
            // save second number to variable from screen
            secondNumber = screen.textContent;
            // clean screen before result
            screen.textContent = "";
            operatorScreen.textContent = "";
            // calculate result & return on screen
            result = operate(operatorOnScreen, numberOnScreen, secondNumber);
            if (String(result).length > 8) {
                screen.style.fontSize = "35px";
            };
            screen.textContent = result;

        } else if (button.textContent === "CLEAR") {
            screen.textContent = "";
            operatorScreen.textContent = "";
        } else {
            // define the text on screen and add to screen
            if (button.textContent === "÷" || button.textContent === "x" ||
                button.textContent === "-" || button.textContent === "+") {
                operatorOnScreen = button.textContent;
                numberOnScreen = screen.textContent;
                console.log(numberOnScreen);
                operatorScreen.textContent = operatorOnScreen;
                screen.textContent = "";
            } else {
                if (screen.textContent.length < 8) {
                    screen.textContent += button.textContent;
                } else {
                    // pass
                }
            };
        };
        // change color back to original after x seconds
        colorChangeTimeout = setTimeout(function() {
            button.style.borderColor = "black";
            button.style.backgroundColor = "#75A1C5";
        }, 100);
    });
});

// TO-DO: add second line to show whole row in the screen
