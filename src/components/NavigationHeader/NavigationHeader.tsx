// *** NPM ***
import React from 'react';
import { Button, createStyles, Theme, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { HomeOutlined, ShoppingBasketOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

// *** OTHER ***
import constants from '../../common/constants';
import { StoreType } from '../../store';

// *** STYLES ***
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.palette.primary.main,
            width: '100%',
        },
        content: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: constants.CONTENT_WIDTH,
            margin: '0 auto',
            padding: '10px 20px',
            boxSizing: 'border-box',
        },
    }),
);

// *** PROPS ***
interface IProps {
    orders: StoreType['orders'];
}

const NavigationHeader = (props: IProps): JSX.Element => {
    // *** STYLES ***
    const classes = useStyles();

    // *** PROPS ***
    const { orders } = props;

    // *** EXTERNAL HOOKS ***
    const theme = useTheme();
    const history = useHistory();

    // *** CONDITIONALS ***
    let ordersAmount = null;

    if (Object.keys(orders).length > 0) {
        ordersAmount = (
            <Typography variant="body1" component="span" color="primary">
                {Object.keys(orders).length}
                &nbsp; &nbsp;
            </Typography>
        );
    }

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                {/* HOME */}
                <Button color="secondary" variant="contained" onClick={() => history.push('/')}>
                    <HomeOutlined style={{ color: theme.palette.primary.light }} />
                </Button>

                {/* BASKET */}
                <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => history.push('/basket')}
                >
                    {ordersAmount}
                    <ShoppingBasketOutlined style={{ color: theme.palette.primary.light }} />
                </Button>
            </div>
        </div>
    );
};

// *** REDUX STORE ***
const mapStateToProps = (state: StoreType) => {
    return {
        orders: state.orders,
    };
};

export default connect(mapStateToProps)(NavigationHeader);
