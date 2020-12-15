import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "white",
    },
    title: {
        flexGrow: 1,
        fontFamily: "Frank Ruhl Libre,Arial,Helvetica,sans-serif"
    },
    ToolbarStyle: {
        backgroundColor: "#673ab7"
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.primary,
    },
    listing: {
        margin: theme.spacing(5, 5, 1, 5),
        [theme.breakpoints.down(1050)]: {
            margin: theme.spacing(2)
        },
        [theme.breakpoints.down(650)]: {
            margin: theme.spacing(1, 2, 1, 2)
        }
    },
    media: {
        height: 0,
        paddingTop: '90.25%', // 16:9
        borderRadius: "25px",
        cursor: "pointer",
        border: "solid grey 2px",
        opacity: 1,
        '&:hover': {
            opacity: .9
        },
    },
    margin: {
        margin: theme.spacing(1),
        [theme.breakpoints.down(650)]: {
            margin: theme.spacing(0),
        }
    },
    textField: {
        width: '100%',
    },
    textStyle: {
        fontFamily: "Frank Ruhl Libre,Arial,Helvetica,sans-serif",
        textAlign: "center",
        fontSize: "2.5vmin",
        fontWeight: 800,
        height: "10vmin",
        [theme.breakpoints.down(1050)]: {
            fontSize: "1.2vmin",
            height: "9vmin",
        },
        [theme.breakpoints.down(650)]: {
            fontSize: "3vmin",
            height: "15vmin",
        }
    },
    details: {
        fontFamily: "Frank Ruhl Libre,Arial,Helvetica,sans-serif",
        textAlign: "center",
        fontWeight: "700",
        fontSize: "2.0vmin",
        [theme.breakpoints.down(650)]: {
            fontSize: "3vmin",
        }
    },
    buttonStyle: {
        backgroundColor: "green",
        "&:hover": {
            backgroundColor: "green",
        }
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    grow: {
        flexGrow: 1,
    },
}));

export default useStyles; 