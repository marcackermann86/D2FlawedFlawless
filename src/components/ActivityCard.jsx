import React from 'react';
import { 
    Paper, Typography, Box, Card,
    CardContent, CardMedia, Grid, CardHeader
} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

const allIds = {
    1262462921: {name: 'Spire of the Watcher', bgImg: "https://images.contentstack.io/v3/assets/blte410e3b15535c144/bltbd157c470e3c0825/639215af2f74eb654f429950/FrontPageBanner_PC_1920x590.jpg"},
    2823159265: {name: 'Duality', bgImg: "https://www.bungie.net/img/destiny_content/pgcr/dungeon_duality.jpg"},
    4078656646: {name: 'Grasp of Avarice', bgImg: "https://www.bungie.net/img/destiny_content/pgcr/30th-anniversary-grasp-of-avarice.jpg"},
    1077850348: {name: 'Prophecy', bgImg: "https://www.bungie.net/img/destiny_content/pgcr/dungeon_prophecy.jpg"},
    2582501063: {name: 'Pit of Heresy', bgImg: "https://www.bungie.net/img/destiny_content/pgcr/dungeon_pit_of_heresy.jpg"},
    2032534090: {name: 'Shattered Throne', bgImg: "https://www.bungie.net/img/destiny_content/pgcr/mission_labyrinth.jpg"},
    1374392663: {name: "King's Fall", bgImg: "https://www.bungie.net/img/destiny_content/pgcr/raid_kings_fall.jpg"},
    4217492330: {name: 'Vow of the Disciple', bgImg: "https://www.bungie.net/img/destiny_content/pgcr/raid_nemesis.jpg"},
    3881495763: {name: 'Vault of Glass', bgImg: "https://www.bungie.net/img/destiny_content/pgcr/vault_of_glass.jpg"},
    910380154: {name: 'Deep Stone Crypt', bgImg: "https://www.bungie.net/img/destiny_content/pgcr/europa-raid-deep-stone-crypt.jpg"},
    2659723068: {name: 'Garden of Salvation', bgImg: "https://www.bungie.net/img/destiny_content/pgcr/raid_garden_of_salvation.jpg"},
    2122313384: {name: 'Last Wish', bgImg: "https://www.bungie.net/img/destiny_content/pgcr/raid_beanstalk.jpg"},
    3333172150: {name: 'Crown of Sorrow', bgImg: "https://www.bungie.net/img/destiny_content/pgcr/raid_eclipse.jpg"},
    548750096: {name: 'Scourge of the Past', bgImg: "https://www.bungie.net/img/destiny_content/pgcr/raids.1305rh0093145r13t5hn10tnz.raid_sunset.jpg"},
    119944200: {name: 'Spire of Stars', bgImg: "https://www.bungie.net/img/destiny_content/pgcr/raid_greed.jpg"},
    3089205900: {name: 'Eater of Worlds', bgImg: "https://www.bungie.net/img/destiny_content/pgcr/raids_leviathan_eater_of_worlds.jpg"},
    2693136600: {name: 'Leviathan', bgImg: "https://www.bungie.net/img/destiny_content/pgcr/raid_gluttony.jpg"}
}

function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return (months[date.getMonth()]) + " " + date.getDate() + ", " + date.getFullYear() + "  " + strTime;
};

function ActivityCard(props){

    let activityData = props.data;
    //let date = new Date("2022-12-11T01:32:19Z");
    let date = new Date(activityData.time);
    let formattedDate = formatDate(date);
    //let activityId = '2823159265';
    let activityId = activityData.id;
    let activityName = allIds[activityId].name;
    let backgroundImage = allIds[activityId].bgImg;
    //let characterWithDeaths = [['LessThanZero', '3'],['Freaky Frico', '6'],['iMobbinn', '2']];
    let characterWithDeaths = activityData.characters;

    //console.log("props");
    //console.log(props);

    return(
        <>
        <CssBaseline/>
          <Card sx={{borderRadius:'0px', maxWidth:"325px"}}>
            <div style={{ position: "relative" }}>   
          <CardMedia
              component="img"
              title="activity card"
              height="130"
              image={backgroundImage}
            />
            <div style={{position: "absolute", color: "white",top: -10,left: "50%",transform: "translateX(-50%)",textAlign:'left', width:310}}>
              <CardHeader title={activityName} subheader={formattedDate} subheaderTypographyProps={{color: "#ffffff"}}/>
            </div>
            </div>
            <CardContent>
                <Grid container rowSpacing={2} spacing={2}>
                      <Grid item xs={12}>
                        
                          <Box
                            sx={{
                              p: 1,
                              display: 'grid',
                              gridTemplateColumns: { md: '1fr' },
                              gap: 2,
                              borderRadius:'10px'
                            }}
                          >
                            <Grid container rowSpacing={1} spacing={2}>
                            <Grid item xs={6}>
                            </Grid>
                            <Grid item xs>
                              <Typography align="center">
                                Deaths
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                            {characterWithDeaths.map((character,index)=>(
                              <Paper key={index+10000} sx={{p: 1.2,m: 1,borderRadius:'0px'}}>
                                <Grid container spacing={2} >
                                  <Grid item xs={7}>
                                    <Typography align="left">
                                      {character.name}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={5}>
                                    <Typography align="center">
                                      {character.deaths}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Paper>
                            ))}
                            </Grid>
                            </Grid>
                          </Box>
                        
                      </Grid>
                  </Grid>
            </CardContent>
          </Card>
          </>
    );
};

export default ActivityCard;