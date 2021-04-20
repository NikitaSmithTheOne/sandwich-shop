// *** NPM ***
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// *** OTHER ***
import NavigationHeader from '../../components/NavigationHeader/NavigationHeader';
import Footer from '../../components/Footer/Footer';
import constants from '../../common/constants';

// *** STYLES ***
const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%',
    },
    content: {
        flex: '1',
        width: constants.CONTENT_WIDTH,
        margin: '0 auto',
    },
});

// *** PROPS ***
interface IProps {
    children: JSX.Element;
}

const Layout = (props: IProps): JSX.Element => {
    // *** PROPS ***
    const { children } = props;

    // *** STYLES ***
    const classes = useStyles();

    // *** USE EFFECTS ***
    // componentDidMount
    useEffect(() => {
        console.log('[Layout] componentDidMount');
    }, []);

    return (
        <div className={classes.root}>
            {/* NAVIGATION HEADER */}
            <NavigationHeader />

            {/* CONTENT */}
            <main className={classes.content}>
                {/* ROUTES AS CHILD */}
                {children}
            </main>

            {/* FOOTER */}
            <Footer />
        </div>
    );
};

export default Layout;
