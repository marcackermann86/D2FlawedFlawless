import React, { useState } from 'react';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import SearchIcon from '@mui/icons-material/Search';
import { Paper, InputBase, IconButton, Container } from '@mui/material';
import { useNavigate } from "react-router-dom";
import d2logo from '../images/d2logo2.png';
import { Box, AppBar, Toolbar, Typography, Divider, FormLabel, Switch } from '@mui/material';
import { MenuItem} from '@mui/material';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const DestinyLogo = () => {
    return(
        <Link to={`/`}><img alt="" src={d2logo} width={84} height={60}></img></Link>
    );
};

const activityList = ['1374392663', '4217492330', '3881495763', '910380154', '2659723068', 
                      '2122313384', '3333172150', '548750096', '119944200', '3089205900', 
                      '2693136600','1262462921', '2823159265', '4078656646', '1077850348',
                      '2582501063', '2032534090'];

function ActivityMenu(props){


    return(
      <>
        <FormControl sx={{ m: 1, minWidth: 210 }} size="small" >
          <InputLabel htmlFor="activity-select">Select Activity</InputLabel>
          <Select defaultValue={0} id="activity-select" label="Select Activity" onChange={props.onChange}>
            <ListSubheader>
            Raids
            </ListSubheader>
              <MenuItem value={0}>King's Fall</MenuItem>
              <MenuItem value={1}>Vow of the Disciple</MenuItem>
              <MenuItem value={2}>Vault of Glass</MenuItem>
              <MenuItem value={3}>Deep Stone Crypt</MenuItem>
              <MenuItem value={4}>Garden of Salvation</MenuItem>
              <MenuItem value={5}>Last Wish</MenuItem>
              <MenuItem value={6}>Crown of Sorrow</MenuItem>
              <MenuItem value={7}>Scourge of the Past</MenuItem>
              <MenuItem value={8}>Spire of Stars</MenuItem>
              <MenuItem value={9}>Eater of Worlds</MenuItem>
              <MenuItem value={10}>Leviathan</MenuItem>
            <ListSubheader>
            Dungeons
            </ListSubheader>
              <MenuItem value={11}>Spire of the Watcher</MenuItem>
              <MenuItem value={12}>Duality</MenuItem>
              <MenuItem value={13}>Grasp of Avarice</MenuItem>
              <MenuItem value={14}>Prophecy</MenuItem>
              <MenuItem value={15}>Pit of Heresy</MenuItem>
              <MenuItem value={16}>Shattered Throne</MenuItem>
          </Select>
        </FormControl>
      </>
    );
}

function ActivitySwitch(props){
  return(
    <>
        <FormLabel><Typography color='white'>Dungeons</Typography></FormLabel>
        <Switch color='default' onChange={props.onChange} defaultChecked />
        <FormLabel><Typography color='white'>Raids</Typography></FormLabel>
    </>
  );
}

function SoloSwitch(props){
  return(
    <>
        <FormLabel sx={{minWidth: 90}}><Typography color='white'>Include Solo</Typography></FormLabel>
        <Switch color='error' onChange={props.onChange} defaultChecked />
    </>
  );
}

function AppSearchBar(props){
    const [searchField, setSearchField] = useState("");
    const [activityType, setActivityType] = useState("raid");
    const [activity, setActivity] = React.useState('0');
    const [solo, setSolo] = useState(true);
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    let navigate = useNavigate();

    const handleChange = e => {
        setSearchField(e.target.value);
    };

    const selectActivity = e => {
      setActivity(e.target.value);
    };

    const switchActivity = e => {
        if(activityType === 'raid')
          setActivityType('dungeon');

        if(activityType === 'dungeon')
          setActivityType('raid');

        //console.log(activityType);
    };

    const includeSolo = e => {
      setSolo(e.target.checked);

      //console.log(solo);
    };

    const handleSumbit = (e) => {
        

        if(searchField===""){
            console.log("Empty");
            
        }
        else {
            //console.log(searchField);
            let mode = '';

            if(activity > 10)
              mode = 'd'
            else
              mode = 'r'

            navigate(`/search?name=${searchField}&id=${mode}${activityList[activity]}&solo=${solo}`);
        }
    };

    
    return (
        <>
            <Container maxWidth={false} disableGutters sx={{
                            bgcolor: 'background.default',
                            color: 'text.primary',
                        }}> 
                <Box sx={{
                    display: 'flow',
                    width: '100%',
                    justifyContent: 'center',
                    bgcolor: 'background.default',
                    color: 'text.primary',
                }}>
                    <AppBar position="static">
                        <Toolbar>
                            <DestinyLogo/>
                            <Container fixed={true} align="left">
                                <Typography display="inline-block" variant="h5">D2 Flawed Flawless</Typography>
                            </Container>
                            <Container fixed={true} align="center">
                            <Container align="center">
                                <Paper
                                    component="form"
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '35vw' }}
                                    onSubmit = {handleSumbit}
                                >
                                    <DoubleArrowIcon fontSize='large' color='#282c34'/>
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Find a Guardian..."
                                        onChange = {handleChange}
                                        type="search"
                                    />
                                    <IconButton type="submit" sx={{ p: '10px' }}>
                                        <SearchIcon />
                                    </IconButton> 
                                    
                                </Paper>
                         
                                </Container>
                              
                            </Container>
                              <ActivityMenu onChange={selectActivity}/>
                              <Box minWidth={10} />
                               <Divider orientation="vertical" flexItem />
                               <Box minWidth={10} />
                              <SoloSwitch onChange={includeSolo}/>
                            <Container fixed={true} align="center"/>
                            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                            </IconButton>
                            {theme.palette.mode}
                        </Toolbar>
                    </AppBar>  
                </Box>
            </Container>
        </>
    );
  };

export default function ToggleColorMode(props) {
    const [mode, setMode] = React.useState('dark');
    const colorMode = React.useMemo(
      () => ({
        toggleColorMode: () => {
          setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
      }),
      [],
    );
  
    const theme = React.useMemo(
      () =>
        createTheme({
          palette: {
            mode,
          },
        }),
      [mode],
    );

    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
        <CssBaseline/>
          <AppSearchBar />
          <Box minHeight={20} />
          <Container maxWidth={false} disableGutters sx={{
                            bgcolor: 'background.default',
                            color: 'text.primary',
                        }}>
          {props.elements}      
          </Container>
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }