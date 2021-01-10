// Riad start at 6 PM UTC

const RAID_HOUR = 18;
const RAID_MIN  = 0;
const RAID_SEC  = 0;
const QUOTES = [
    "\"You sound like my brain at 4am\" - Gattel, Nov. 2020",
    "\"Fuck y'all\" - Cetone, all day everyday",
    "\"After this trash, I need to go get my tail back\" - Cetone, Nov. 2020",
    "\"Omg a Brewmaster, I rally and banner\" - Gattel, every Spoils of Pandaria encounter",
    "\"I'm still in prepull\" - Triama every week",
    "\"Oh we pulled?\" - Triama almost every week",
    "\"It's like you're allergic to healing rain...\" - Cetone after every wipe",
    "\"STAND IN THE FUCKING HEALING RAIN\" - Cetone when he's mad",
    "\"Use Stormlash when you hear the sound of my Stampede\" - Sylphe",
    "\"DPS died at 2nd phase? No problem, time to turn healer mana into boss damage\" - Fivefour",
    "\"Are these healers saving mana for next xpac ?\" - Cetone"
]

let date = new Date();
let days = 0;
let hours = 0;
let minutes = 0;
let secounds = 0;
let random_quote = "";

function RaidTime()
{
    // Some something to show that it's raid time
    hours = 0;
    minutes = 0;
    secounds = 0;
}

function calcDate()
{
    date = new Date();

    var time = date.getUTCDay();

    if(time != 6 && time != 0)
        days = 6 - time
    else days = 0;

    time = date.getUTCHours();
    if(time >= RAID_HOUR && days == 0)
        hours = -1;
    else if(time >= RAID_HOUR)
    {
            days--;
            hours = 24 - (time - RAID_HOUR) - 1;
    }
    else hours = RAID_HOUR - time - 1;

    time = date.getUTCMinutes();
    if(RAID_MIN != 0)
        minutes = time >= RAID_MIN && hours == -1 ? -1 : (60 - (60 - RAID_MIN)) - time;
    else minutes = time >= RAID_MIN && hours == -1 ? -1 : 60 - time - 1;

    time = date.getUTCSeconds();
    if(RAID_SEC != 0)
        secounds = time >= RAID_SEC && minutes == -1 ? -1 : (60 - (60 - RAID_SEC)) - time;
    else secounds = time >= RAID_SEC && minutes == -1 ? -1 : 60 - time - 1;

    if(
        days == 0 &&
        hours == -1 &&
        minutes == -1 &&
        secounds == -1
    )
    {
        RaidTime();
    }
}

function getRandomQuote() {
    random_quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
}

const MessageDisplay = {
    data() {
        calcDate();
        getRandomQuote();
        return {
            day: days,
            hour: hours.toString().padStart(2, '0'),
            minute: minutes.toString().padStart(2, '0'),
            secound: secounds.toString().padStart(2, '0'),
            quote: random_quote
        }
    },
    mounted(){
        setInterval(() => {
            calcDate(),
            this.day = days
            this.hour = hours.toString().padStart(2, '0'),
            this.minute = minutes.toString().padStart(2, '0'),
            this.secound = secounds.toString().padStart(2, '0')
            }, 1000)
    } 
}

Vue.createApp(MessageDisplay).mount('#countdown')
