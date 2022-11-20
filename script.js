// https://restcountries.com/v3.1/all
const row = document.querySelector('.row')
const btn = document.querySelector('.btn')
const input = document.querySelector('.input')
const results = document.querySelector('.search-result')
const next = document.querySelector('.next')
const prev = document.querySelector('.prev')
const pageInfo = document.querySelector('.page-info')


let current = 0
let limit = 8
let start = limit * current
let end = limit * (current + 1)
let totalPages = 32
let countries = []

console.log(start, end)

if (current + 1 <= 1) {
    prev.style.display = 'none'
}

next.addEventListener('click', () => {
    prev.style.display = 'block'

    current += 1
    start = limit * current
    end = limit * (current + 1)

    if (current + 1 >= 32) {
        next.style.display = 'none'
    }

    displayCounties(countries)
    if (end >= 250) {
        end = 250
    }
    pageInfo.innerHTML = `${start + 1} - ${end} of ${countries.length}, page is ${current + 1}`
    window.scrollTo(0, document.body.scrollHeight)

})

prev.addEventListener('click', () => {
    current -= 1
    start = limit * current
    end = limit * (current + 1)
    next.style.display = 'block'

    if (current + 1 <= 1) {
        prev.style.display = 'none'
    }

    displayCounties(countries)
    if (end >= 250) {
        end = 250
    }
    pageInfo.innerHTML = `${start + 1} - ${end} of ${countries.length}, page is ${current + 1}`
    window.scrollTo(0, document.body.scrollHeight)


})

function displayCounties(data) {

    row.innerHTML = ''
    data.slice(start, end).forEach((el) => {
        row.innerHTML += `<div class="col-3 d-flex flex-column justify-content-center align-items-center">
                            <img src='${el.flags.png}' class="m-5 image"
                            style="box-shadow: 5px 5px 15px 5px #000000">
                             <p class="fs-2 fw-bold">${el.name.common}</p>
                             <p class="fs-5">Capital: ${el.capital}</p>
                             <p class="fs-5">area: <span>${el.area}km</span></p>
                             <p class="fs-5">population: <span>${el.population}</span></p>
                    <div/>`
    })
}


axios('https://restcountries.com/v3.1/all')
    .then(({data}) => {
        displayCounties(data)
        countries = data
        pageInfo.innerHTML = `${start + 1} - ${end} of ${data.length}, page is ${current + 1}`
        return data

    })
    .then((data) => {
        const select = document.querySelector('.my-select')

        select.addEventListener('change', (e) => {
            console.log(e.target.value)
            const value = e.target.value

            switch (value) {
                case 'big-area': {
                    data.sort((a, b) => {
                        return b.area - a.area
                    })
                    displayCounties(data)
                    break;
                }
                case 'small-area': {
                    data.sort((a, b) => {
                        return a.area - b.area
                    })
                    displayCounties(data)
                    break;
                }
                case 'big-pop': {
                    data.sort((a, b) => {
                        return b.population - a.population
                    })
                    displayCounties(data)
                    break;
                }
                case 'small-pop': {
                    data.sort((a, b) => {
                        return a.population - b.population
                    })
                    displayCounties(data)
                    break;
                }
                case 'a-z': {
                    data.sort((a, b) => {
                        if (a.name.common.toLowerCase() > b.name.common.toLowerCase())
                            return 1
                        if (a.name.common.toLowerCase() < b.name.common.toLowerCase())
                            return -1
                    })
                    displayCounties(data)
                    break;
                }
                case 'z-a': {
                    data.sort((a, b) => {
                        if (a.name.common.toLowerCase() > b.name.common.toLowerCase())
                            return -1
                        if (a.name.common.toLowerCase() < b.name.common.toLowerCase())
                            return 1
                    })
                    displayCounties(data)
                    break
                }
                default:
                    return value
            }
        })

    })


btn.addEventListener('click', () => {
    axios(`https://restcountries.com/v3.1/name/${input.value}`)
        .then(({data}) => {
            displayCounties(data)
            countries = data
            console.log(data)
            results.innerHTML = `<div">
                            <img src='${data[0].flags.png}' class="m-5 image" 
                            style="box-shadow: 5px 5px 15px 5px #000000">
                          
                    <div/>`
        })
})

