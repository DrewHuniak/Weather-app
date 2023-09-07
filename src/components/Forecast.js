import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Unstable_Grid2';
function GetForecast(props)
{
    const {weatherData} = props;
    const [currentHour, setCurrentHour] = useState(new Date().getHours());

    useEffect(() => {
        const intervalId = setInterval(() =>
        {
          setCurrentHour(new Date().getHours());
        }, 1000 * 60 * 60);

        return () => clearInterval(intervalId);
    },[]);
    
    function convertTime(date)
    {
      const currentDate = new Date(date);
      const hours = currentDate.getHours();
      const amOrPm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedTime = `${formattedHours}:00 ${amOrPm}`;

      return (
        formattedTime
      );
    }

    const subGridStyle = {
        textAlign: 'center',
        borderRight: '1px solid #282c34', // Add a border on the right
        '&:lastChild': {
          borderRight: 'none',
        },
      };
    
      const gridStyle = {
        border: '2px', // Define the border properties here
        padding: '0.5px', // Optional: Add padding to space content from the border
        margin: '5px',
        borderRadius: '30px',
        backgroundColor: '#49515f',
        //#F8F8F8
      }; 


    return(
        <>
            <p style={{textAlign: 'left', paddingLeft: '30px'}}>Todays Forecast</p>
            <Grid item container spacing={12} style = {gridStyle}>
            {Array.from( {length: 6}).map((_, index) => (
                <Grid style={{...subGridStyle, borderRight: index < 5 ? '1px solid #282c34' : 'none'}} xs={2} key={index}>
                {(() =>{
                    const hourIndex = (currentHour + index + 1) % 24;     //If Forecase needs to display both current day and next day temps.
                    const dayOffset = (currentHour + index + 1) >= 24 ? 1 : 0;
                    return(
                    <>
                    <p style={{color: '#282c34'}} >{convertTime(weatherData.forecast.forecastday[0].hour[hourIndex].time)}</p>
                    <h3><img src={weatherData.forecast.forecastday[dayOffset].hour[hourIndex].condition.icon} alt="Weather Icon"/></h3>
                    <h3>{weatherData.forecast.forecastday[dayOffset].hour[hourIndex].temp_f}°</h3>
                    </>
                    );
                })()}
                </Grid>
            ))}
            </Grid>
        </>
    );
}

export default GetForecast;