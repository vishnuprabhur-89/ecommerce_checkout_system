import React, { useEffect } from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import FindReplaceIcon from '@material-ui/icons/FindReplace';
import useStyles from './styles';
import axios from "axios";

export default function FullWidthGrid() {
    const classes = useStyles();
    const [dataSample, setData] = React.useState([]);
    const [dataSample1, setData1] = React.useState([]);
    var matches = useMediaQuery('(min-width:650px)');
    var mobile = useMediaQuery('(max-width:1050px)');
    var status = matches === mobile ? true : false
    const [render, setRender] = React.useState(false);

    useEffect(() => {
        axios.get("http://localhost:5000/access-product/details")
            .then(result => {
                setData(result.data)
                setData1(result.data)
            })
    }, [])

    const bookingEvent = (value) => {
        axios.post("http://localhost:5000/add-to-cart", { id: value._id, name: value.name, price: value.price })
            .then(result => {
                console.log(result.data)
            })
    }
    return (
        <div className={classes.listing}>
            <Grid container spacing={status ? 2 : 2}>
                {dataSample.map((i, j) =>
                    <Grid key={j} item xs={12} sm={3} >
                        <Paper className={classes.paper}>
                            <Typography className={classes.textStyle}>PRODUCT NAME: {i.name.toUpperCase()}</Typography>
                            <Grid
                                container
                                direction="row"
                                justify="flex-start"
                                alignItems="flex-start"
                            >
                                <Grid item xs={status ? 12 : 6} sm={status ? 12 : 6}>
                                    <CardMedia
                                        className={classes.media}
                                        image={require(`${i.image}`)}
                                        title={i.name}
                                    />
                                </Grid>
                                <Grid item xs={status ? 12 : 6} sm={status ? 12 : 6}>
                                    {matches ? <br /> : <></>}
                                    <Typography className={classes.details}>PRICE: {i.price}</Typography><br />
                                    <center>
                                        <Button onClick={() => bookingEvent(i)} size="small" className={classes.buttonStyle} variant="contained" color="secondary">Add To Cart</Button>
                                    </center>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </div>
    );
}