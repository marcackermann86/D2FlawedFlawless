import React, { useState, useEffect } from 'react';
import AppSearchBar from './AppSearchBar';
import ActivityCard from './ActivityCard';
import Grid2 from '@mui/material/Unstable_Grid2';
import { searchForCharacter } from './DestinyAPI';
import { Box, CircularProgress } from '@mui/material';

function CardList({results}){

    let combinedResults = [];

    for(let i=0; i < results.length; i++)
        for(let j=0; j < results[i].length; j++)
            combinedResults.push(results[i][j]);
    
    combinedResults = combinedResults.sort((a,b) => a.id - b.id || b.time.localeCompare(a.time));

    console.log(combinedResults);

    /*return(
        <>
            <Grid2 container rowSpacing={5} spacing={8} sx={{p:6, width: 1}}>
                {results.map((activies, i) => (
                    activies.map((activity, j) => (
                    <Grid2 key={i*1000}>
                        <ActivityCard key={(i*1000)+j} data={activity}/>
                    </Grid2>
                    ))
                ))}
            </Grid2>
        </>
    );*/
    return(
        <>
        <Box sx={{ 
            justifyContent: 'center',
            bgcolor: 'background.default',
            color: 'text.primary',
            height: '115vh'
        }}>
            <Grid2 container rowSpacing={5} spacing={7.8} sx={{p:6, width: 1}}>
                {combinedResults.map((activity, i) => (
                    <Grid2 key={i*1000}>
                        <ActivityCard key={(i*1000)+i} data={activity}/>
                    </Grid2>
                ))}
            </Grid2>
        </Box>
        </>
    );
}

function LoadingElement(){
    return(
        <Box sx={{ display: 'flex', minHeight: "50vh", alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
        </Box>
    );
}

function Results(){
    const searchParams = new URLSearchParams((window.location.hash).split("?")[1]);
    const bungieName = searchParams.get("name");
    const modeAndActivity = searchParams.get("id");
    const activity = modeAndActivity.substring(1, modeAndActivity.length);
    let mode = '';
    const solo = searchParams.get("solo");
    const [results, setResults] = useState();

    if(modeAndActivity.substring(0,1) === 'r')
        mode = 'raid';
    else
        mode = 'dungeon';

    useEffect(() => {
        searchForCharacter(bungieName, mode, activity)
            .then(data => setResults(data))
            .catch((err) => console.log(err));
    }, [bungieName, mode, activity]);

    return (
        <>
        <AppSearchBar elements = {results ? <CardList results={results} /> : <LoadingElement />} /> 
        </>
    );
  };

export default Results;