
export function dateHandler(date) {
    const published = new Date(+date)
    const formattedTime = numberToMonth( published.getMonth() ) + ' ' 
    + published.getDate() + ' ' + published.getFullYear();

    return formattedTime;
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