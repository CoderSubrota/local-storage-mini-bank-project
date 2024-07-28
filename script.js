let option = document.getElementById("option");
let submite = document.getElementById("submit");
let amountInputFeild = document.getElementById("amountInputFeild");
//get document to set text
let depositeMoney = document.querySelector("#depositeMoney");
let withdrawMoney = document.querySelector("#withdrawMoney");
let transferMoney = document.querySelector("#transferMoney");
let totalMoney = document.querySelector("#totalMoney");
let message = document.querySelector("#message");
let transferNumber = document.querySelector("#transferNumber");
//get local storage data
let getData = JSON.parse(localStorage.getItem("mini-bank") || '{}');

//update money status
let depositeAmount = getData.depositeMoney?getData.depositeMoney:0;
let totalAmount = getData.totalMoney?getData.totalMoney:0;
let withdrawAmount = getData.withdrawMoney?getData.withdrawMoney:0;
let transferAmount = getData.transferMoney?getData.transferMoney:0;

//Display data after realoading //saved data 

depositeMoney.innerHTML = depositeAmount;
totalMoney.innerHTML = totalAmount;
withdrawMoney.innerHTML = withdrawAmount;
transferMoney.innerHTML = transferAmount;

//deposite function
function deposite(amountSet) {
  depositeAmount += parseInt(amountSet);
  totalAmount += parseInt(amountSet);
  depositeMoney.innerHTML = depositeAmount;
 totalMoney.innerHTML = totalAmount;
  amountInputFeild.value = "";
}
//withdraw function
function withdraw(amountSet) {
  totalAmount -= parseInt(amountSet);
  withdrawAmount += parseInt(amountSet);
  depositeMoney.innerHTML = depositeAmount;
  totalMoney.innerHTML = totalAmount;
  withdrawMoney.innerHTML = withdrawAmount;
  amountInputFeild.value = "";
}
//transfer function
function transfer(amountSet) {
  totalAmount -= parseInt(amountSet);
  transferAmount += parseInt(amountSet);
  totalMoney.innerHTML = totalAmount;
  transferMoney.innerHTML = transferAmount;
  amountInputFeild.value = "";
}
//message status
let messageStatus = false;
//message function
function messageFunction(text) {
  message.style.visibility = "visible";
  message.innerHTML = `<span> ${text} </span> &times;`;
  messageStatus = true;
  amountInputFeild.value = "";
}
//
function selectOption() {
  if (option.value === "transfer") {
    transferNumber.style.visibility = "visible";
  } else {
    transferNumber.style.visibility = "hidden";
  }
}

//submit data
submite.addEventListener("click", function () {
  let choice = option.value;
  let getAmount = amountInputFeild.value;

  //length of transfre account numbers
  let length = transferNumber.value.length;

  if (getAmount == "") {
    messageFunction("Please enter your amount in the input feild !!");
    return;
  } else if (parseInt(getAmount) > 500 || parseInt(getAmount) < 10) {
    messageFunction("Please enter your amount between 10 to 500 dollars");
    return;
  }
  if (choice === "deposite") {
    deposite(getAmount);
  } else if (choice === "withdraw") {
    if (totalAmount < parseInt(getAmount)) {
      messageFunction("Insufficient Amount to withdraw or transfer money !!");
      return;
    }
    withdraw(getAmount);
  } else if (choice === "transfer") {
    if (transferNumber.value === "" || length != 14) {
      messageFunction(
        "Please enter your 14 digits of transfer account numbers!!"
      );
      return;
    }

    if (totalAmount < parseInt(getAmount)) {
      messageFunction("Insufficient Amount !!");
      return;
    }
    transfer(getAmount);
  }

  //creat object to save data in local storage
  let miniBankObjectData = {
    depositeMoney: depositeAmount,
    withdrawMoney: withdrawAmount,
    transferMoney: transferAmount,
    totalMoney: totalAmount,
  };

  //save into local storage
  localStorage.setItem("mini-bank", JSON.stringify(miniBankObjectData));
});

message.addEventListener("click", function () {
  message.style.visibility = "hidden";
});

// local storage access key

/*
 
 1/ localStorage.setItem("myKey", "myValue") ;
 
2/ console.log(localStorage.getItem("myKey")) ;

3/ localStorage.removeItem("myKey") ;
 */



