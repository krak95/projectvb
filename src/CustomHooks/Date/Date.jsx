var d = new Date()

var dMonth = d.getMonth()

var listmonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Out",
    "Nov",
    "Dec",
]

dMonth = listmonths[dMonth]

var dDay = d.getDate()
if (dDay < 10) {
    dDay = '0' + dDay
}

var dHour = d.getHours()
if (dHour < 10) {
    dHour = '0' + d.getHours()
}

var dMin = d.getMinutes()
if (dMin < 10) {
    dMin = '0' + d.getMinutes()
}

var dSec = d.getSeconds()
if (dSec < 10) {
    dSec = '0' + d.getSeconds()
}

var concatDate = dDay + '-' + dMonth + '-' + d.getFullYear() + ' at ' + dHour + ':' + dMin + ':' + dSec

export const datefunction = () => {
    return concatDate
}