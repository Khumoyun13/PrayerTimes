let selectElement = document.querySelector('.countries')
let bomdodTime = document.querySelector('.bomdod-time')
let peshinTime = document.querySelector('.peshin-time')
let asrTime = document.querySelector('.asr-time')
let shomTime = document.querySelector('.shom-time')
let huftonTime = document.querySelector('.hufton-time')
let mazhabElement = document.querySelector('.mazhab')

async function getCountries(){
    let response = await fetch(`https://restcountries.eu/rest/v2/all`)
    response = await response.json()

    response.reverse().forEach(country => {
        let newOptionElement = document.createElement('option')
        newOptionElement.setAttribute('value', `${country.name} - ${country.capital}`)
        newOptionElement.textContent = `${country.name} - ${country.capital}` 
        selectElement.appendChild(newOptionElement)
       
    });


}

getCountries()

selectElement.addEventListener('change', event => {
    let value = selectElement.value.split(" - ")
    let school = mazhabElement.value
    let country = value[0]
    let city = value[1]
    prayerTimes(country, city, school)
})

mazhabElement.addEventListener('change', event => {
    let value = selectElement.value.split(" - ")
    let school = mazhabElement.value
    let country = value[0]
    let city = value[1]
    prayerTimes(country, city, school)
})

async function prayerTimes(country, city, school){
    let response = await fetch(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=8&school=${school}`)
    response = await response.json()

    for(let time in response.data.timings){
        bomdodTime.textContent = response.data.timings['Fajr']
        peshinTime.textContent = response.data.timings['Dhuhr']
        asrTime.textContent = response.data.timings['Asr']
        shomTime.textContent = response.data.timings['Maghrib']
        huftonTime.textContent = response.data.timings['Isha']
       
    }
}
