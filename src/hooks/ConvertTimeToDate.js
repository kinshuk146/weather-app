import React from 'react'

const ConvertTimeToDate = (epochSeconds, offsetInSeconds) => {
    const totalSeconds = epochSeconds + offsetInSeconds;
    const date = new Date(totalSeconds * 1000);
    const dayOfWeekNumber = date.getDay();
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return daysOfWeek[dayOfWeekNumber];  
}

export default ConvertTimeToDate;
