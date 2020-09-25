function timeConverter(time){
    let PM = time.match('PM') ? true : false;

    time = time.split(':')
    let min = time[1];
    let hour, sec

    if(PM){
        hour = 12 + parseInt(time[0], 10);
        sec = time[2].replace('PM', '');
    }
    else{
        hour = time[0];
        sec = time[2].replace('AM', '');
    }
    return `${hour}:${min}:${sec}`
}