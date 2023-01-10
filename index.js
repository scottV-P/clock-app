const moreBtn = document.getElementById('moreBtn')
const lessBtn = document.getElementById('lessBtn')
const quote = document.getElementById('quote')
const quoteContainer = document.getElementById('quoteContainer')
const author = document.getElementById('author')
const moreInfo = document.querySelector('.more-container')
const timeContainer = document.getElementById('timeContainer')
const bottomContainer = document.getElementById('bottomContainer')
function getQuote(){
    fetch('https://api.quotable.io/random')
    .then((res) => res.json())
    .then((data) =>{
        let quoteAuthor = data.author
        let quoteContent = data.content
        quote.innerText = `"${quoteContent}"`
        author.innerText = `- ${quoteAuthor}`
    })
}
getQuote()
document.getElementById('refreshIcon').addEventListener('click', getQuote)

function getDate(){
    fetch('http://worldtimeapi.org/api/ip')
    .then((res) => res.json())
    .then((data) =>{
        let dayOfWeek = data.day_of_week
        let dayOfYear = data.day_of_year
        let timeZone = data.timezone
        let weekNumber = data.week_number
        let standardTime = data.abbreviation
        document.getElementById('timezone').innerHTML

        function getCurrentTime(){
            const date = new Date()
            const newTime = date.toLocaleTimeString("en-us", {timeStyle: "short"})
            const shortTime =newTime.replace("AM", "").replace("PM","")
            const hour = date.getHours()
            // const hour = date.getHours()
            const greeting = document.getElementById('greeting')
            if(hour >= 5 && hour < 12){
                document.body.classList.remove('nighttime')
                document.body.classList.add("daytime")
                greeting.innerText = "Good Morning, it's currently"
                moreInfo.classList.remove('darkmode')
                moreInfo.classList.add('lightmode')
            }
            else if(hour >= 12 && hour < 18){
                document.body.classList.remove('nighttime')
                document.body.classList.add("daytime")
                greeting.innerText = "Good Afternoon, it's currently"
                moreInfo.classList.remove('darkmode')
                moreInfo.classList.add('lightmode')
            }
            else if(hour >= 18){
                document.body.classList.remove("daytime")
                document.body.classList.add("nighttime")
                greeting.innerText = "Good Evening, it's currently"
                moreInfo.classList.remove('lightmode')
                moreInfo.classList.add('darkmode')
            }
            else if(hour < 5){
                document.body.classList.remove("daytime")
                document.body.classList.add("nighttime")
                greeting.innerText = "Good Evening, it's currently"
                moreInfo.classList.remove('lightmode')
                moreInfo.classList.add('darkmode')
            }
            document.getElementById('time').innerHTML =`
            <h2 id="time" class="time">${shortTime}<span class="timezone" id="timezone">${standardTime}</span></h2>
            `
            document.getElementById('currentTimezone').innerText = timeZone
            document.getElementById('dayOfWeek').innerText = dayOfWeek
            document.getElementById('dayOfYear').innerText = dayOfYear
            document.getElementById('weekNumber').innerText = weekNumber
            setTimeout(getCurrentTime, 1000)
        }
        setTimeout(getDate, 10000)
        getCurrentTime()
    })

}
getDate()

function addMore(){
    moreInfo.classList.remove("hidden")
    timeContainer.classList.remove("timeContainerLess")
    timeContainer.classList.add("timeContainerMore")
    quoteContainer.classList.add('hidden')
    author.classList.add('hidden')
    moreBtn.classList.add('hidden')
    lessBtn.classList.remove('hidden')
}

function addLess(){
    moreInfo.classList.add("hidden")
    timeContainer.classList.add("timeContainerLess")
    timeContainer.classList.remove("timeContainerMore")
    quoteContainer.classList.remove('hidden')
    author.classList.remove('hidden')
    moreBtn.classList.remove('hidden')
    lessBtn.classList.add('hidden')
}
moreBtn.addEventListener('click', addMore)
lessBtn.addEventListener('click', addLess)