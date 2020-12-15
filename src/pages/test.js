import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(5,5,10,5)
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
}));

export default function FullWidthGrid() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={8}>
                        <Paper className={classes.paper}>xs=12 sm=6</Paper>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Paper className={classes.paper}>xs=12 sm=6</Paper>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
