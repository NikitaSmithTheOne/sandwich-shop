// *** NPM **
import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { StoreType } from '../../store';

// *** OTHER ***
import Order from './Order';

// *** STYLES ***
const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            marginTop: '20px',
            padding: '20px',
            boxSizing: 'border-box',
            border: `2px solid ${theme.palette.primary.main}`,
            borderRadius: '10px',
        },
        title: {
            color: theme.palette.secondary.main,
            marginBottom: '15px',
        },
    }),
);

// *** PROPS ***
interface IProps {
    orders: StoreType['orders'];
}

const Orders = (props: IProps): JSX.Element => {
    // *** STYLES ***
    const classes = useStyles();

    // *** PROPS ***
    const { orders } = props;

    // *** CONDITIONALS ***
    const ordersOutput: JSX.Element[] = [];

    if (Object.keys(orders).length > 0) {
        Object.entries(orders).forEach(([key, value]) => {
            const orderOutput = (
                <Order orderID={key} ingredients={value.ingredients} amount={value.amount} />
            );
            ordersOutput.push(orderOutput);
        });
    }

    return (
        <div className={classes.root}>
            {/* TITLE */}
            <Typography variant="h5" component="h2" color="primary">
                ORDERS
            </Typography>

            {/* ORDERS OUTPUT */}
            {ordersOutput.length > 0 ? (
                ordersOutput
            ) : (
                <Typography variant="h6" component="span" color="secondary">
                    Not orders yet
                </Typography>
            )}
        </div>
    );
};

// *** REDUX STORE ***
const mapStateToProps = (state: StoreType) => {
    return {
        orders: state.orders,
    };
};

export default connect(mapStateToProps)(Orders);
