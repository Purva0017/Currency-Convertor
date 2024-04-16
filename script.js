const BASE_URL =
//   "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
//   "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/inr.json";


'https://v6.exchangerate-api.com/v6/c845ea8354d4f66fd8b0e047/latest/';

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'a17e8e0bc0mshc4e1ab9331e3ff8p1005f6jsn94b029153400',
        'X-RapidAPI-Host': 'currency-converter10.p.rapidapi.com'
    }
};

let select = document.querySelectorAll("select")
let btn = document.querySelector("#btn")
let fromCurr = document.querySelector("#from")
let toCurr = document.querySelector("#to")
let msg = document.querySelector("#msg")
let exchangeIcon = document.querySelector("#exchangeIcon")

select.forEach((i) => {
    for(currCode in countryList) {
        let newOption = document.createElement("option")
        newOption.innerText = currCode
        newOption.value = currCode
        
        if(i.name == "from" && currCode == "USD")
            newOption.selected = "selected"
        
        else if(i.name == "to" && currCode == "INR") 
            newOption.selected = "selected"
        
        i.append(newOption)
    }
    i.addEventListener("change", (evt) => {
        updateFlag(evt.target)
    })
})

const updateFlag = (element) => {
    let currCode = element.value
    let countryCode = countryList[currCode]
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src = newSrc
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault()
    let amount = document.querySelector("input")
    let amountVal = amount.value
    if(amountVal <= 0 || amountVal == "") {
        amountVal = 1
        amount.value = 1
    }

    let URL = `${BASE_URL}${fromCurr.value}`
    let response = await fetch(URL)
    let data = await response.json()
    let rate = data.conversion_rates[toCurr.value]
    console.log(rate)
    
    let finalAmount = amountVal * rate

    msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}` 
})

exchangeIcon.addEventListener("click", () => {
    let temp = fromCurr.value
    fromCurr.value = toCurr.value
    toCurr.value = temp
    
    updateFlag(fromCurr)
    updateFlag(toCurr)
})