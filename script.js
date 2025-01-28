const baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns) {
    for (currcode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if (select.name === "from" && currcode === "USD") {
            newoption.selected = "selected";
        }
        else if (select.name === "to" && currcode === "INR") {
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    console.log(element);
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let image = element.parentElement.querySelector("img");
    image.src = newsrc;
}

const exchange = async() => {
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    if (amtValue === "" || amtValue < 1) {
        amtValue = 1;
        amount.value = "1";
    }
    const URL = `${baseURL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmt = amtValue * rate;

    msg.innerText = `${amtValue} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`

}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    exchange();
});

window.addEventListener("load", () => {
    exchange();
  });







