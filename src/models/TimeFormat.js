
export function dateHandler(date) {
    const published = new Date(+date)
    const formattedTime = numberToMonth( published.getMonth() ) + ' ' 
    + published.getDate() + ' ' + published.getFullYear();

    return formattedTime;
}
// origin = jan 1 1970
// date.nnow - updated
// 45 minutes => 12 hour => 25 day =>
export function timeAgo(date) {
    const minAgo = Math.ceil((Date.now() - date) / (1000 * 60))
    if(minAgo < 10) return 'Just Now'
    if(minAgo < 45) return  minAgo + ' minutes ago'

    const hoursAgo  = Math.ceil(minAgo/60)
    if(hoursAgo < 12) return hoursAgo + ' hours ago'

    const daysAgo   = Math.ceil(hoursAgo/24)
    if(daysAgo < 25) return daysAgo + ' days ago'

    const monthsAgo = Math.ceil(daysAgo/30)
    return monthsAgo + ' months ago'

}

function numberToMonth(num) {

    if (num === 0) {
        return 'January'
    }
    else if (num === 1) {
        return 'February'
    }
    else if (num === 2) {
        return 'March'
    }
    else if (num === 3) {
        return 'April'
    }
    else if (num === 4) {
        return 'May'
    }
    else if (num === 5) {
        return 'June'
    }
    else if (num === 6) {
        return 'July'
    }
    else if (num === 7) {
        return 'August'
    }
    else if (num === 8) {
        return  'September'
    }
    else if (num === 9) {
        return  'October'
    }
    else if (num === 10) {
        return 'November'
    }
    else if (num === 11) {
        return 'December'
    }

    return 'Out of Bounds';
}