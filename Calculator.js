
const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.calculator__keys');

let display = document.querySelector('.calculator__display');

const reset = document.getElementById("reset");
const add = document.getElementById("add");
const minus = document.getElementById("minus");
const multiply = document.getElementById("multiply");
const divide = document.getElementById("divide");
const equal = document.getElementById("result");

const calculation = {
    calculatedvalue: 0,
    currentvalue: 0,
    operate_history: [],
    resulted: false
}

reset.addEventListener('click', (Event) => {
    if (Event.target.matches('button')) {
    display.textContent = Event.target.value;
    calculation.calculatedvalue = 0;
    calculation.operate_history = [];
    calculation.resulted = false;
    console.log(calculation);
}
});

const del = document.getElementById("delete");

del.addEventListener('click', (Event) => {
    if (Event.target.matches('button')){
        if (display.textContent.length > 0){
            display.textContent = display.textContent.substring(0,display.textContent.length-1);
            if (Number(display.textContent) === calculation.currentvalue){
                calculation.currentvalue = Number(display.textContent.substring(0,display.textContent.length-1));
            }
        }
    }
});

const percent = document.getElementById("percent");
percent.addEventListener('click', (Event) => {
    if (Event.target.matches('button')){
        display.textContent = String(Number(display.textContent) /100);
    }
})

const np = document.getElementById("pos/neg");

np.addEventListener('click', (Event) => {
    if (Event.target.matches('button')){
        if (display.textContent.length < 14){
            if (display.textContent[0] === "-"){
                display.textContent = display.textContent.substring(1);
            } else if (display.textContent.length < 13){
                console.log(display.textContent);
                display.textContent = "-" + display.textContent;
            }
        }
    }
});

keys.addEventListener('click', (Event) => {
    if (Event.target.matches('button')){
        if (display.textContent === "0") {
            if(Event.target.value === "."){
                display.textContent += ".";
            }
            else{display.textContent = Event.target.value;}
        } else if (display.textContent === "-0"){
            if(Event.target.value === "."){
                display.textContent += ".";
            }else if(Event.target.value){
                display.textContent = "-" + Event.target.value;
            }
        } else {
            if (display.textContent.length < 13){
                    if (Event.target.value !== "."){
                        display.textContent += Event.target.value;   
                    }else if(!display.textContent.includes(".")){
                        display.textContent += ".";
                    }
            }
        }
        if (!calculation.resulted) {
            calculation.currentvalue = Number(display.textContent) || 0;
        }
    }
 });

 function displayResult(calculation) {
     const prevalue = calculation.currentvalue;
     if (calculation.calculatedvalue === 0) {
         display.value = " " + String(calculation.calculatedvalue);
     }else{display.value = String(calculation.calculatedvalue);}
     display.textContent = display.value;
     calculation.currentvalue = prevalue;
 }

 function Calculated(calculation) {
    switch (calculation.operate_history[calculation.operate_history.length-1]){
        case ("+"):      
            calculation.calculatedvalue = calculation.calculatedvalue + calculation.currentvalue;
            break;
        case ("-"):       
            calculation.calculatedvalue = calculation.calculatedvalue - calculation.currentvalue;
            break;
        case ("*"):       
            calculation.calculatedvalue = calculation.calculatedvalue * calculation.currentvalue;
            break;
        case ("/"):       
            calculation.calculatedvalue = calculation.calculatedvalue / calculation.currentvalue;
            break;
    }
    const str = String(calculation.calculatedvalue);
    console.log(str);
    if (str.length > 14 && str.includes("."))
    {
        if (str.indexOf(".") < 12){
            calculation.calculatedvalue = Number(calculation.calculatedvalue.toFixed(5));
        }
    }
 }

add.addEventListener('click', (Event) => {
    if (Event.target.matches('button')){
        if(calculation.resulted) {
            calculation.resulted = false;
        }else {
            if (calculation.operate_history.length === 0){calculation.calculatedvalue = calculation.currentvalue;}
            else if (calculation.currentvalue !== 0){Calculated(calculation);}
        }
        display.textContent = "0";
        calculation.operate_history.push("+");
        console.log(calculation);
    }
});

minus.addEventListener('click', (Event) => {
    if (Event.target.matches('button')){
        if(calculation.resulted) {
            calculation.resulted = false;
        }else {
        if (calculation.operate_history.length == 0){calculation.calculatedvalue = calculation.currentvalue;}
        else if (calculation.currentvalue !== 0){Calculated(calculation);}}
        display.textContent = "0";
        calculation.operate_history.push("-");
        console.log(calculation);
    }
});

multiply.addEventListener('click', (Event) => {
    if (Event.target.matches('button')){
        if(calculation.resulted) {
            calculation.resulted = false;
        }else {
            if (calculation.operate_history.length === 0){calculation.calculatedvalue = calculation.currentvalue;}
            else if (calculation.currentvalue !== 0){Calculated(calculation);}
        }
        display.textContent = "0";
        calculation.operate_history.push("*");
        console.log(calculation);
    }
});

divide.addEventListener('click', (Event) => {
    if (Event.target.matches('button')){
        if(calculation.resulted) {
            calculation.resulted = false;
        }else {
            if (calculation.operate_history.length === 0){calculation.calculatedvalue = calculation.currentvalue;}
            else if (calculation.currentvalue !== 0){Calculated(calculation);}
        }
        display.textContent = "0";
        calculation.operate_history.push("/");
        console.log(calculation);
    }
});

equal.addEventListener('click', (Event) => {
    if (Event.target.matches('button')){
        if (calculation.calculatedvalue === 0 && calculation.currentvalue !== 0 && calculation.operate_history.length === 0){
            calculation.calculatedvalue = calculation.currentvalue;
        }else{Calculated(calculation);}
        console.log(calculation);
        displayResult(calculation);
        calculation.resulted = true;
        console.log("after result", calculation);
    }
});