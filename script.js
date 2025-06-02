let dropDowns = document.querySelectorAll(".dropdown select");
let button = document.querySelector(".container button");
let input = document.querySelector(".input-box input");
let fromCountry = document.querySelector(".from select");
let toCountry=document.querySelector(".to select");
let msgBox = document.querySelector(".msg");



dropDowns.forEach((select)=>{
    for(let currencyCode in countryList){
        let element = document.createElement("option");
        element.innerHTML=`${countryName[currencyCode]}`;
        element.value=`${currencyCode}`;

        select.append(element);

        if(select.name === "from" && element.value === "USD"){
            element.selected= "selected";
        }
        else if(select.name === "to" && element.value === "NPR"){
            element.selected= "selected";
        }
    }
    select.addEventListener("change",(e)=>{
        updateFlag(e.target);
    })
})

function updateFlag(element){
        let currencyCode = element.value;
        let countryCode= countryList[currencyCode];

        element.parentElement.parentElement.querySelector("img").src=`https://flagsapi.com/${countryCode}/flat/64.png`;
}

button.addEventListener("click",async ()=>{
   
    if(input.value === "" || input.value < 1){
        input.value = 1;
    }

    let response = await fetch(`https://v6.exchangerate-api.com/v6/f268c09fa3099b02c6f01d24/latest/${fromCountry.value}`);
    let data = await response.json();
    let rate = data.conversion_rates[toCountry.value];
    


    let finalAmount = input.value * rate;
    
    msgBox.innerHTML = `${input.value} ${fromCountry.value} = ${finalAmount} ${toCountry.value}`;


})
