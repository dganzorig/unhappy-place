import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Button, Typography, Box, AppBar, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Auth0Context } from '../contexts/auth0-context';
import AnxietyMap from './AnxietyMap';
import processEvents from '../utils';
import { mapDefaults } from '../Constants';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <Typography
          component="div"
          role="tabpanel"
          hidden={value !== index}
          id={`scrollable-force-tabpanel-${index}`}
          aria-labelledby={`scrollable-force-tab-${index}`}
          {...other}
        >
          {value === index && <Box p={3}>{children}</Box>}
        </Typography>
      );
};

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
}));

const AuthenticatedTabs = (props) => {
    const { user, logout } = useContext(Auth0Context);
    const classes = useStyles();
    const [ value, setValue ] = useState(0);
    const [ communityEvents, setCommunityEvents ] = useState([]);
    const [ personalEvents, setPersonalEvents ] = useState([]);

    const handleChange = (_, newValue) => {
        setValue(newValue);
    }

    useEffect(() => {
        fetch(`/event`)
          .then(res => res.json())
          .then(events => setCommunityEvents(events))
          .catch(err => console.log(err));
    });

    useEffect(() => {
        fetch(`/event/${user.sub}`)
          .then(res => res.json())
          .then(events => setPersonalEvents(events))
          .catch(err => console.log(err));
    });

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Grid
                    justify="space-between"
                    container 
                    spacing={24}
                >
                    <Grid item>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="green"
                            textColor="white"
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="scrollable auto tabs"
                        >
                            <Tab label="Community" {...a11yProps(0)} />
                            <Tab label="You" {...a11yProps(1)} />
                            <Tab label="Settings" {...a11yProps(2)} />
                        </Tabs>   
                    </Grid>
                    <Grid item>
                        <Button 
                            color="inherit" 
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </Grid>
                </Grid>
            </AppBar>
            <TabPanel value={value} index={0}>
                <AnxietyMap
                    defaultZoom={ mapDefaults.zoom }
                    defaultCenter={ mapDefaults.center }
                    events={ processEvents(communityEvents) }
                />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AnxietyMap
                    defaultZoom={ mapDefaults.zoom }
                    defaultCenter={ mapDefaults.center }
                    events={ processEvents(personalEvents) }
                />
            </TabPanel>
            <TabPanel value={value} index={2}>
                [To be implemented]
            </TabPanel>
        </div>
    );
};

export default AuthenticatedTabs;