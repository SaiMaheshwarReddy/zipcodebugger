const form = document.querySelector('#form');
const resultsWrapper = document.querySelector('.results__wrapper');

const resultsCount = document.querySelector('.results__count');




form.addEventListener("submit", (e) => {
    e.preventDefault();
   resultsWrapper.innerHTML = " ";
    const pincodeInput = document.getElementById("pincode");

const URL = `https://api.postalpincode.in/pincode/${pincodeInput.value}`;

    getData(URL);
})


 function getData(URL) {
     console.log(URL)
    fetch(URL).then(res => {
        return res.json()
    }).then(data => {
        filterData(data)
    }).catch(err => {
        console.log(err)
    })
    
}



function filterData(data) {

    const filteredData = data[0].PostOffice;
console.log(data[0])
    if(data[0].Status == "Error"){
        alert("Invalid Zipcode")
        resultsCount.textContent = "Invalid Zip Code"
    }else{

       resultsCount.textContent = data[0].Message

    filteredData.map(data => {
const eachResult = document.createElement("div");

eachResult.setAttribute("class", "result");

eachResult.innerHTML = ` <div class="area">
<b>Area:</b><span>${data.Name}</span>
</div>
<div class="district">
<b>District:</b><span>${data.District}</span>
</div>

<div class="two__column">
<div class="coulumn__1"><b>State:</b><span>${data.State}</span></div>
<div class="coulumn__2"><b>Pincode:</b><span>${data.Pincode}</span></div>

</div>
<div class="two__column">
<div class="coulumn__1"><b>Division:</b><span>Division</span></div>
<div class="coulumn__2"><b>Country:</b><span>${data.Country}</span></div>

</div>`

resultsWrapper.appendChild(eachResult);
    
    })

}

}