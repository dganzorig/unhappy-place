import React, { useContext } from 'react';
import { Auth0Context } from '../contexts/auth0-context';
import { AppBar, Toolbar, Grid, Typography, Button } from '@material-ui/core';
import AuthenticatedTabs from './AuthenticatedTabs';

const NavigationTab = (_) => {
    const { isLoading, user, loginWithRedirect } = useContext(Auth0Context);

    return (
        <>
            { !isLoading && !user && (
                <AppBar position="static">
                    <Toolbar>
                        <Grid
                            justify="space-between"
                            container 
                            spacing={24}
                        >
                            <Grid item>
                                <Typography variant="h6">
                                    Community
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button 
                                    color="inherit" 
                                    onClick={loginWithRedirect}
                                >
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            )}
            { !isLoading && user && (
                <AuthenticatedTabs />
            )}
        </>
    )
}

export default NavigationTab;