// the current date and time in YYYY-MM-DD hh:mm:ss format 

function timestamp() {
    const dateObject = new Date();
    // current date
    // adjust 0 before single digit date
    const date = (`0 ${dateObject.getDate()}`).slice(-2);

    // current month
    const month = (`0 ${dateObject.getMonth() + 1}`).slice(-2);

    // current year
    const year = dateObject.getFullYear();

    // current hours
    const hours = dateObject.getHours();

    // current minutes
    const minutes = dateObject.getMinutes();

    // current seconds
    const seconds = dateObject.getSeconds();

    //  YYYY-MM-DD format
    // console.log(`${year}-${month}-${date}`);

    // YYYY-MM-DD HH:MM:SS format
    // console.log(`${year}-${month}-${date} ${hours}:${minutes}:${seconds}`);
    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

    // HH:MM format
    // console.log(`${hours}:${minutes}`);

}

module.exports = { timestamp };