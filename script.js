const upperDisplay = document.querySelector('.upper-display');
const lowerDisplay = document.querySelector('.lower-display');
const buttons = document.querySelectorAll('.buttons');

buttons.forEach((button) => { 

   button.addEventListener('click', display);
});


const data = {
    expression: [],
    number1: [],
    operator: null,
    number2: [],
    result: null,
    update() {
        this.number1 = [this.result];
        this.expression.splice(0, 3, `${this.result}`);
        this.operator = ''
        this.number2 = [];
    },
    clear() {
        this.expression = [];
        this.number1 = [];
        this.operator = null;
        this.number2 = [];
        this.result = null;
        upperDisplay.innerHTML = '';
        lowerDisplay.innerHTML = '';
        n = 0;
    },
    backspace() {
        
        if(this.expression.length == 3) {
            this.number2 = [];
        }

        else if(this.expression.length == 2) {
            this.operator = null;
        }

        else {
            this.number1 = [];
        }

        this.expression.pop();
        upperDisplay.innerHTML = data.expression.join('');
        this.result = null;
        lowerDisplay.innerHTML = '';
    }
}

let operators = ["÷", "×", "−", "+"],
num1,
num2,
result;


function display (e) {
 
    const target = e.target;
   
    if (target.classList.contains('clear')) {
        data.clear();
    }

    else if (target.classList.contains('percent')) {
        if(data.result) {
        updateValue()
    }

        print("%");
    }

    else if (target.classList.contains('backspace')) {
        data.backspace();
        console.log(data.expression);
        console.log(data.number1);
        console.log(data.operator);
        console.log(data.number2);
        console.log(data.result);
    }

    else if (target.classList.contains('division')) {
        updateValue();
        print("÷");
    }

    else if (target.classList.contains('seven')) {
        print("7");
    }

    else if (target.classList.contains('eight')) {
        print("8");
    }

    else if (target.classList.contains('nine')) {
        print("9");
    }

    else if (target.classList.contains('multiplication')) {
        updateValue();
        print("×");
    }

    else if (target.classList.contains('four')) {
        print("4");
    }

    else if (target.classList.contains('five')) {
        print("5");
    }

   
    else if (target.classList.contains('six')) {
        print("6");
    }

    else if (target.classList.contains('minus')) {
          updateValue();
          print("−");
    }

    else if (target.classList.contains('one')) {
          print("1");
    }

    else if (target.classList.contains('two')) {
          print("2");
    }

    else if (target.classList.contains('three')) {
          print("3");
          console.log(data.expression);
          console.log(data.result);
    }

    else if (target.classList.contains('plus')) {
        updateValue();
        print("+");
        console.log(data.expression);
    }

    else if (target.classList.contains('zero')) {
        print("0");
    }

    else if (target.classList.contains('period')) {
        period();
    }

    else if (target.classList.contains('equal')) {
        calculate();
        lowerDisplay.innerHTML = data.result;
    }
}












function print(string) {
    
    if(operators.forEach((sign) => data.expression.includes(sign))) {
        data.expression[3] = string;
    }

    else if (operators.includes(string)) {
        data.operator = string;
        data.expression[1] = data.operator;
    }

    else if(!(data.operator)) {
        data.number1.push(string);
        data.expression[0] = data.number1.join('');
    }

    

    else {
        data.number2.push(string);
        data.expression[2] = data.number2.join('');
    }   

        upperDisplay.innerHTML = data.expression.join("");
}
  

function updateValue() {
    if(data.expression.length == 3) {
        calculate();
        data.update();
        upperDisplay.innerHTML = data.expression.join('');
        lowerDisplay.innerHTML = "";
        
    }
}

function calculate() {
    console.log(data.expression);
    if(data.expression.length == 3) {
        result = data.expression
        .filter((item) => !(data.operator == item))
        .map(item => { if(item.includes("%")) { return Number(item.slice(0, item.length - 1)) / 100 }
         else return Number(item);
         })
         .reduce((num1, num2) => {
         
          if(data.operator == "+") {
            return add(num1, num2);

    }

          else if(data.operator == "−") {
            console.log(num1);
            console.log(num2);
            return substract(num1, num2);
    }

    
          else if(data.operator == "×") {
            return multiply(num1, num2);
    
    }
          else if(data.operator == "÷") {
            return divide(num1, num2);
    }
        });
        
        if(result % 1 !== 0) {
            data.result = result.toFixed(2);
        }

        else {
            data.result = result;
        }
    };
}

function add(num1, num2) {
    return num1 + num2;
}

function substract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if(num2 != 0) {
    return num1 / num2;
    }
    
    else return "Error: You just took an L by dividing by zero!";
}

function percent(number) {
    return Number(number) / 100;
}

function period() {
    if(data.result !== null && data.result % 1 === 0) {
        updateValue();
        print(".");
    }
    else if(data.operator != null && data.result == null) {
        print(".");
    }
    else if(data.operator != null && data.result !== null) {
        print(".");
    }
}

// function backspace() {
//     if(data.expression.length == 1) {
//         data.clear();
//         console.log("clear");
//     }

//     else { 
//         data.backspace();
//         console.log("backspace");
//     }
// }