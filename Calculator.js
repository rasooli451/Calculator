let nums = [];  //stores numbers
let oper = [];  //stores operations
let operation = false;  //a boolean value to avoid writing two operation to screen
let temp = ""; // a string var to store the numbers as the user types them in.
let opened = false; // a boolean value to help us determine if the bracket is open or not.
//handles inputs
function clicked(index, isnum){
    let val = document.querySelectorAll(".key")[index].innerHTML;
    let screen = document.querySelector(".display");
    let resscreen = document.querySelector(".result");
    if (isnum){
        operation = true;
        if (index != 16 && index != 0)
             screen.innerHTML += val;
        if (resscreen.innerHTML.length != 0){
            resscreen.innerHTML = "";
            }
        if (index == 16){
            temp  = document.querySelectorAll(".key")[index].value + temp;
            screen.innerHTML = screen.innerHTML.slice(0, screen.innerHTML.length - temp.length + 1) + "(" + temp;
            opened = true;
        }
        else if(index == 2){
            if (temp.length > 0){
                temp = String(Number(temp) / 100);
            }
        }
        else if(index == 0){
            screen.innerHTML = "";
            resscreen.innerHTML = "";
            nums = [];
            oper = [];
            temp = "";
            operation = false;    
        }
        else{
        temp += val;}
          }
    else{
        if (operation){
            if (opened){
                screen.innerHTML += ")" + val;
                opened = false;
            }
            else{
                screen.innerHTML += val;}
        operation = false;
        nums.push(Number(temp));
        temp = "";
        if (index != 19 && index != 0){
            oper.push(val);
        }
        if (index == 19){
            evaluate();
            resscreen.innerHTML = nums[0];
            screen.innerHTML = "";
            nums = [];
            oper = [];
        }
    }}
    
}

//handles clearing numbers
function clearit(){
    let screen = document.querySelector(".display");
    if (screen.innerHTML.length > 0){
        let tobecleared = screen.innerHTML.slice(screen.innerHTML.length-1);
        screen.innerHTML = screen.innerHTML.slice(0, screen.innerHTML.length - 1);
        if (isoperator(tobecleared)){
           oper = oper.slice(0, oper.length-1);
           operation = true;
           temp = String(nums[nums.length-1]);
           nums.pop();
        }
        else{
            temp = temp.substring(0, temp.length -1);
        }
        if (screen.innerHTML.length == 0){
            nums = [];
            oper = [];
            operation = false;
            temp = "";
            result = 0;
        }
    }
}

//uses recursion to evaluate until all operations are done, returns the result of expression.
function evaluate(){
     let replacer = 0;
     let index = 0;
     let op = "";
     if (oper.length == 0){
        console.log(nums[0]);
        return nums[0];
     }
     else if (oper.includes("×") || oper.includes("÷")){
        index = oper.indexOf("×");
        op = "×";
        if (index == -1){
            index = oper.indexOf("÷");
            op = "÷";
        }
        replacer = compute(nums[index],nums[index+1],op);
        cleanup(index, replacer);
        evaluate();    
     }
     else{
        replacer = compute(nums[0],nums[1],oper[0]);
        cleanup(0, replacer);
        evaluate();
     }
}
function isoperator(oper){
    if (oper == "+" || oper == "-" || oper == "×" || oper == "÷"){
        return true;
    }
    return false;
}

//given two values and type of operation, it will compute it, using switch cases and returns the result.
function compute(value1, value2, operation){
    let res = 0;
    switch (operation){
        case "+":
            res = value1 + value2;
            break;
        case "-":
            res = value1 - value2;
            break;
        case "×":
            res = value1*value2;
            break;
        case "÷":
            res = value1 / value2;
            break;
    }
    return res;
}
//removes operations that were done and replaces the two numbers with the result value.
function cleanup(index, replacer){
    nums.splice(index,1);
    nums.splice(index,1);
    oper.splice(index,1);
    nums.splice(index, 0 , replacer);
}