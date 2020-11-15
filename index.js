// Riad start at 6 PM UTC

const RAID_HOUR = 18;
const RAID_MIN  = 0;
const RAID_SEC  = 0;

let date = new Date();
let days = 0;
let hours = 0;
let minutes = 0;
let secounds = 0;

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
        day = 6 - time
    else day = 0;

    time = date.getUTCHours();
    hours = time >= RAID_HOUR && day == 0 ? -1 : RAID_HOUR - time - 1;

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

const MessageDisplay = {
    data() {
        calcDate();
        return {
            day: days,
            hour: hours.toString().padStart(2, '0'),
            minute: minutes.toString().padStart(2, '0'),
            secound: secounds.toString().padStart(2, '0')
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