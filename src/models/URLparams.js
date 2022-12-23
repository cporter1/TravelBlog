
function getIDfromParams() {
    let i = 0
    while(window.location.href.charAt(i) !== '?') i++;
    i++;

    let decimalPlaces = window.location.href.length - i - 1;

    let total = 0
    while(decimalPlaces >= 0) {
        total = total + 
            ( Math.pow(10,decimalPlaces) * window.location.href.charAt(i) )
    i++;
    decimalPlaces--;
    }

    return total
}

export {getIDfromParams}