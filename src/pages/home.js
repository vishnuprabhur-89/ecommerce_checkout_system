import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, NavLink, Route } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Listing from './listing';
import useStyles from './styles';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Checkout from './checkout';
import axios from "axios";

export default function Home() {
    const classes = useStyles();
    const [count, setCount] = React.useState(0);

    useEffect(() => {
        setInterval(() => {
            updateCount()
        }, 1000);
    }, [])

    const updateCount = () => {
        axios.get("http://localhost:5000/count-product")
            .then(result => {
                try {
                    setCount(result.data[0].count)
                } catch (error) {
                    setCount(0)
                }
            })
    }
    return (
        <Router className={classes.root}>
            <AppBar position="sticky">
                <Toolbar className={classes.ToolbarStyle}>
                    <NavLink to="/" style={{ textDecoration: 'none', color: "white", cursor: "pointer" }}>
                        <Typography variant="h6" className={classes.title}>
                            Ecommerce
                    </Typography>
                    </NavLink>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <NavLink to="/checkout" style={{ textDecoration: 'none', color: "white", cursor: "pointer" }}>
                                <Badge badgeContent={count} color="secondary">
                                    <ShoppingBasketIcon />
                                </Badge>
                            </NavLink>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Switch>
                <Route exact path="/" component={Listing} />
                <Route path="/checkout" component={Checkout} />
            </Switch>
        </Router>
    );
}