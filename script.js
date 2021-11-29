//console.log("SCROIPT");

let tolist = document.querySelector("#tolist");
let money = document.querySelector("#money");
let amount = document.querySelector("#amount");
let error = document.querySelector(".error");

let val1;
let val2;
let calculate;
let called;


let url1="http://api.currencylayer.com/live?access_key=156cbbba115d56b47592294d99377f1f";
fetch(url1)
.then((res)=>res.json())
.then( function(data){
    //console.log(data);
   display(data.quotes);
});
//getting above result and adding the available current to "to dropdown list"
//FROM IS ALWAYS USD
function display(obj){
    //console.log(obj);

    //convert object to array
    let arr = Object.keys(obj);

    for(x of arr){
        let str = x.split("USD");
        let option = document.createElement("option");
        option.value=str[1];
        option.innerHTML=str[1]

        //setting INR as default value 
        if(str[1]=="INR"){
            option.setAttribute("selected","selected");
        }
        tolist.appendChild(option);
        //and displaying it's exchange rate
        setTimeout(function(){
            let url3 = `http://api.currencylayer.com/live?access_key=156cbbba115d56b47592294d99377f1f&currencies=INR`
            fetch(url3)
            .then((res)=>res.json())
            .then(function(data){
                //console.log(data.quotes);
                //console.log(data.quotes[`USD${value}`])
                document.querySelector("#exrate").innerHTML=data.quotes[`USDINR`];

});
        },1000)
    }
}

//Once dropdown value selected exchange rate is displayed
function getRate(value){
    let url2 = `http://api.currencylayer.com/live?access_key=156cbbba115d56b47592294d99377f1f&currencies=${value}`
fetch(url2)
.then((res)=>res.json())
.then(function(data){
    //console.log(data.quotes);
    //console.log(data.quotes[`USD${value}`])
    document.querySelector("#exrate").innerHTML=data.quotes[`USD${value}`];

    if(Number(money.value.trim()>0) || Number(amount.value.trim()>0)){
        getAmount();
    }
});


}

function getAmount(){
    if(parseInt(money.value.trim())==undefined || parseInt(amount.value.trim())==undefined){
        error.innerHTML="Only numbers are allowed";
        error.style.display="block";
    }
    
    else if((money.value.trim()=="") && (amount.value.trim()=="")){
        
        error.innerHTML="Both the values cannot be empty";
        error.style.display="block";
    }
     else if((money.value.trim()!="") && (amount.value.trim()=="")){
        error.style.display="none";
        fromusd();
  
    }else if((amount.value.trim()!="") && (money.value.trim()=="")){
        error.style.display="none";
        tousd();
    }
    // else if(amount.value.trim()=="" && money.value.trim()==""){
    //     alert("Enter value in any one of the fields")
    // }
    else{
        error.style.display="none";
        if(money.value.trim()!=val1 && called!="tousd"){
            fromusd();
        }else {
            tousd();
        }
        
    }
  
}

function fromusd(){
    called="fromusd";
    val1=money.value.trim();
    calculate = (Number(money.value)* Number(document.querySelector("#exrate").innerHTML)).toFixed(3);
    //console.log(calculate);
    amount.value=calculate;
    var xValues = ["USD",tolist.value];
    var yValues = [money.value,amount.value];
    var barColors = [`rgb(${Math.random()*255},${Math.random()*251},${Math.random()*252})`,`rgb(${Math.random()*255},${Math.random()*253},${Math.random()*254})`];

    new Chart("myChart", {
    type: "bar",
    data: {
        labels: xValues,
        datasets: [{
        backgroundColor: barColors,
        data: yValues
        }]
    },
    options: {
        legend: {display: false},
        title: {
          display: true,
          text: `USA vs ${tolist.value}`
        }
      }
    });

}

function tousd(){
    called="tousd";
    val2=amount.value.trim();
   // console.log(tolist.value , money.value,amount.value,2)
calculate = (amount.value/ Number(document.querySelector("#exrate").innerHTML)).toFixed(3);
//console.log(calculate);
money.value=calculate;
var xValues = ["USD",tolist.value];
var yValues = [money.value,amount.value];
var barColors = ["red","blue"];

new Chart("myChart", {
type: "bar",
data: {
    labels: xValues,
    datasets: [{
    backgroundColor: barColors,
    data: yValues
    }]
},
options: {
    legend: {display: false},
    title: {
      display: true,
      text: `USA vs ${tolist.value}`
    }
  }
});
}




//create like enter fully-qualified domain name such as wikipedia.org, youtube.com, or bbc.co.uk.
//Sometimes, a website doesn't have any icons at all – or that site might not exist. But in your UI, you may want to still show an icon anyway, and a broken image doesn't look too nice.
//For this reason, we automatically serve a fallback icon
// let url5 ="https://icon.horse/icon/wikipedia.org"
// fetch(url5)
// .then((res)=>(console.log(res)))
// .catch((err)=>console.log(err))
//<img src="https://icon.horse/icon/youtube.com"> -->just load image like this
//display like 10 to compare and the search term


// let url7="https://api-thirukkural.vercel.app/api?num=8";
// fetch(url7)
// .then((res)=>res.json())
// .then((data)=>console.log(data))
// .catch((err)=>console.log(err));



// let url6="https://collectionapi.metmuseum.org/public/collection/v1/objects";
// fetch(url6)
// .then((res)=>res.json())
// .then((data)=>console.log(data))
// .catch((err)=>console.log(err));





