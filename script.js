const upperDisplay = document.querySelector('.upper-display');
const lowerDisplay = document.querySelector('.lower-display');
const buttons = document.querySelectorAll('.buttons');
const body = document.querySelector('body');

body.addEventListener("keydown", display);

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

    else if (target.classList.contains('percent') || (e.shiftKey == true && e.keyCode == 53)) {
        if(data.result) {
        updateValue()
    }

        print("%");
    }

    else if (target.classList.contains('backspace') || e.keyCode == 8) {
        data.backspace();
    }

    else if (target.classList.contains('division') || e.keyCode == 191) {
        updateValue();
        print("÷");
    }
    
    else if (target.classList.contains('multiplication') || (e.shiftKey == true && e.keyCode == 56)) {
        updateValue();
        print("×");
    }
    
    else if (target.classList.contains('plus') || (e.shiftKey == true && e.keyCode == 187)) {
        updateValue();
        print("+");
    }
    
    else if (target.classList.contains('minus') || e.keyCode == 189) {
        updateValue();
        print("−");
    }

    else if (target.classList.contains('seven') || e.keyCode == 55) {
        print("7");
    }

    else if (target.classList.contains('eight') || e.keyCode == 56) {
        print("8");
    }

    else if (target.classList.contains('nine') || e.keyCode == 57) {
        print("9");
    }

    else if (target.classList.contains('four') || e.keyCode == 52) {
        print("4");
    }

    else if (target.classList.contains('five') || e.keyCode == 53) {
        print("5");
    }

   
    else if (target.classList.contains('six') || e.keyCode == 54) {
        print("6");
    }

    else if (target.classList.contains('one') || e.keyCode == 49) {
          print("1");
    }

    else if (target.classList.contains('two') || e.keyCode == 50) {
          print("2");
    }

    else if (target.classList.contains('three') || e.keyCode == 51) {
          print("3");
    }

    else if (target.classList.contains('zero') || e.keyCode == 48) {
        print("0");
    }

    else if (target.classList.contains('period') || e.keyCode == 190) {
        period();
    }

    else if (target.classList.contains('equal') || e.keyCode == 13) {
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

