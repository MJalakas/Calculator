let buttons = document.querySelectorAll(".button");
let screen = document.querySelector(".numbers-wrapper");
let operatorScreen = document.querySelector(".operator-wrapper")
let history = document.querySelector(".history-wrapper");

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
    if (operator === "÷" && b === "0") {
        return "dont do that.";
    } else if (operator === "+") {
        return add(parseFloat(a), parseFloat(b));
    } else if (operator === "-") {
        return subtract(parseFloat(a), parseFloat(b));
    } else if (operator === "x") {
        return multiply(a, b);
    } else if (operator === "÷") {
        return divide(a, b);
    }
}

let operatorOnScreen, numberOnScreen, secondNumber, moreThanTwo, equalsClicked, midResult, lastButton;

buttons.forEach(function(button) {
    button.addEventListener("mousedown", function() {

        // initialize
        originalColor = button.style.backgroundColor;
        let colorChangeTimeout;
        clearTimeout(colorChangeTimeout);
        screen.style.fontSize = "75px";

        // change color
        button.style.borderColor = "#EBF6FF";
        button.style.backgroundColor = "peachpuff";


        if (button.textContent === "=") {
            if (operatorScreen.textContent === "" || lastButton === "operand") {
                // pass 

            } else {
                history.textContent = "";
                // save second number to variable from screen
                secondNumber = screen.textContent;
                // clean screen before result
                screen.textContent = "";
                operatorScreen.textContent = "";
                // calculate result & return on screen
                if (midResult === undefined) {
                    result = operate(operatorOnScreen, numberOnScreen, secondNumber);
                } else {
                    result = operate(operatorOnScreen, midResult, secondNumber);
                }

                if (String(result).length > 8) {
                    screen.style.fontSize = "35px";
                };
                screen.textContent = result;

                equalsClicked = true;
                midResult = undefined;
                operatorOnScreen = undefined;
                secondNumber = undefined;
                numberOnScreen = result;
            }

        } else if (button.textContent === "CLEAR") {
            screen.textContent = "";
            operatorScreen.textContent = "";
            operatorOnScreen = undefined;
            numberOnScreen = undefined;
            secondNumber = undefined;
            midResult = undefined;
            history.textContent = "";

        } else {
            // define the text on screen and add to screen
            if (button.textContent === "÷" || button.textContent === "x" ||
                button.textContent === "-" || button.textContent === "+") {

                // if operator is on screen, but no number, don't do anything.
                if (operatorScreen.textContent != "" && screen.textContent === "") {
                    // pass

                // if this is the first operator, do this:
                } else if (secondNumber === undefined) {
                    operatorOnScreen = button.textContent;
                    history.textContent += numberOnScreen;
                    operatorScreen.textContent = operatorOnScreen;
                    screen.textContent = "";
                    lastButton = "operand";

                // if there have been operators before, do this:
                } else {

                    if (midResult === undefined) {
                        midResult = operate(operatorOnScreen, numberOnScreen, secondNumber);
                        screen.textContent = midResult;
                        moreThanTwo = true;
                        history.textContent = midResult;
                        lastButton = "operand";

                    } else if (lastButton === "operand") {
                        // pass
                    
                    } else {
                        numberOnScreen = screen.textContent;
                        secondNumber = midResult;
                        midResult = operate(operatorOnScreen, numberOnScreen, secondNumber);
                        screen.textContent = midResult;
                        moreThanTwo = true;
                        history.textContent = midResult;
                        lastButton = "operand";
                    }

                    // after calculating with old operand, switch to new operand.
                    operatorOnScreen = button.textContent;
                    operatorScreen.textContent = operatorOnScreen;
                };

            } else {

                if (screen.textContent.length < 8) {

                    if (equalsClicked === true) {
                        equalsClicked = false;
                        screen.textContent = "";
                    };

                    if (moreThanTwo === true) {
                        moreThanTwo = false;
                        screen.textContent = "";
                    }; 

                    lastButton = "number";
                    

                    screen.textContent += button.textContent;

                    if (operatorOnScreen === undefined) {
                        numberOnScreen = screen.textContent;
                    } else {
                        secondNumber = screen.textContent;
                    }

                } else {
                    // pass
                }


            };
        };
        // change color back to original after x seconds
        colorChangeTimeout = setTimeout(function() {
            button.style.borderColor = "black";
            button.style.backgroundColor = originalColor;
        }, 100);
    });
});

// TO-DO: add keyboard support
