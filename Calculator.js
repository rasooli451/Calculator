let nums=[]
let oper =[];
let operation = false;
let temp = "";
let result = 0;
function clicked(index,isnum,others){
    let val=document.querySelectorAll(".key")[index].innerHTML;
    let screen = document.querySelector(".display");
    let resscreen = document.querySelector(".result");
    if (isnum){
        operation = true;
        if (index==16){
            screen.innerHTML += document.querySelectorAll(".key")[index].value;
            val = document.querySelectorAll(".key")[index].value;
        }
        else{
           screen.innerHTML += val;}
        temp += val;
        if (resscreen.innerHTML.length>0)
            resscreen.innerHTML = "";
    }
    else if(!isnum){
        if (operation){
            if (nums.length==0)
                nums.push(Number(temp));
            else
                nums[1] = Number(temp);
        temp = "";
        screen.innerHTML += val;
        operation = false;
        if (isoperator(val))
            oper.push(val);
        if (index==2){
            if (nums.length==1)
                 nums[0] = nums[0] /100;
            else
                 nums[1] = nums[1] / 100;
        }
        if (nums.length > 1 && oper.length >= 1){
            evaluate(oper[0]);
            oper = oper.slice(1);
        }
        
    }
    if (index==0){
        nums =[]
        oper =[]
        operation = false;
        temp = "";
        result = 0;
        screen.innerHTML = "";
        resscreen.innerHTML ="";            
    }
    if (index==19){
        resscreen.innerHTML = nums[0];
        screen.innerHTML ="";
        nums=[];
        oper=[];
        result = 0;
    }
}
}
function clearit(){
    let screen = document.querySelector(".display");
    if (screen.innerHTML.length > 0){
        let tobecleared = screen.innerHTML.slice(screen.innerHTML.length-1);
        screen.innerHTML = screen.innerHTML.slice(0, screen.innerHTML.length - 1);
        if (isoperator(tobecleared)){
           oper = oper.slice(0, oper.length-1);
           operation = true;}
        else{
            temp = temp.substring(0, temp.length -1);
        }
        if (screen.innerHTML.length==0){
            nums = [];
            operation = false;
            temp = "";
            result = 0;
        }
    }
}


function evaluate(operatio){
    switch (operatio){
        case "+":
           result = nums[0] + nums[1];
           nums[0] = result;
           break;
        case "-":
            result = nums[0] - nums[1];
            nums[0] = result;
            break;    
        case "x":
            result = nums[0] * nums[1];
            nums[0] = result;
            break;
        case "÷":
            result = nums[0] / nums[1];
            nums[0] = result;
            break;
        }
}

function isoperator(op){
    if (op=="+" || op=="-" || op=="x" || op=="÷")
         return true;
    else
        return false;
}