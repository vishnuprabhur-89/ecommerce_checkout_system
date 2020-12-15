import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(5, 5, 10, 5)
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  Heading: {
    margin: theme.spacing(2, 1, 2, 1),
    fontSize: "3.5vmin"
  },
  Title: {
    margin: theme.spacing(1, 1, 1, 1),
    fontSize: "2.5vmin",
    color: "black"
  },
  buttonStyle: {
    margin: theme.spacing(1, 0, 0, 0),
    backgroundColor: "green",
    "&:hover": {
      backgroundColor: "green",
    }
  },
}));

export default function FullWidthGrid() {
  const classes = useStyles();
  const [checkout, setCheckout] = React.useState([]);
  const [price_details, updateAmount] = React.useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5000/checkout-cart")
      .then(result => {
        setCheckout(result.data.table)
        updateAmount(result.data)
      })
  }, [])

  const removeProduct = (id) => {
    Axios.post("http://localhost:5000/remove-cart", { _id: id })
      .then(result => {
        console.log(result)
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
  }
  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Typography className={classes.Heading}>Cart Details</Typography>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="caption table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">S.No</TableCell>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Quantity</TableCell>
                    <TableCell align="left">Price</TableCell>
                    <TableCell align="left">Remove</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {checkout.map((row, j) => (
                    <TableRow key={row.i}>
                      <TableCell align="left">{j + 1}</TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.qty}</TableCell>
                      <TableCell align="left">{row.price}</TableCell>
                      <TableCell align="left"><Button onClick={() => removeProduct(row._id)} size="small" variant="contained" color="secondary">Remove</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper className={classes.paper}>
              <Typography className={classes.Title}>Total Amount: {price_details.total_amount}</Typography>
              <Typography className={classes.Title}>Discount Amount: {price_details.discount_amount}</Typography>
              <Typography className={classes.Title}>Amount: {price_details.Overall_amount}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
