// *** NPM **
import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { StoreDispatchType, StoreType } from '../../store';

// *** OTHER ***
import Sandwich from '../Sandwich/Sandwich';
import { deleteOrderAction, deleteOrderActionType } from '../../store/orders';

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
        orderOutputRoot: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20px',
        },
        orderOutputAmount: {
            marginTop: '10px',
        },
        orderOutputDeleteButton: {
            color: 'red',
            borderColor: 'red',
            marginTop: '10px',
        },
    }),
);

// *** PROPS ***
interface IProps {
    orders: StoreType['orders'];
    deleteOrder: deleteOrderActionType;
}

const Orders = (props: IProps): JSX.Element => {
    // *** STYLES ***
    const classes = useStyles();

    // *** PROPS ***
    const { orders, deleteOrder } = props;

    // *** CONDITIONALS ***
    const ordersOutput: JSX.Element[] = [];

    if (Object.keys(orders).length > 0) {
        Object.entries(orders).forEach(([key, value]) => {
            const orderOutput = (
                <div key={key} className={classes.orderOutputRoot}>
                    {/* SANDWICH */}
                    <Sandwich ingredients={value.ingredients} />

                    {/* AMOUNT */}
                    <Typography
                        className={classes.orderOutputAmount}
                        variant="h6"
                        component="span"
                        color="secondary"
                    >
                        Amount: {value.amount}
                    </Typography>

                    {/* DELETE BUTTON */}
                    <Button
                        className={classes.orderOutputDeleteButton}
                        variant="outlined"
                        onClick={() => deleteOrder({ orderID: key })}
                    >
                        Delete
                    </Button>
                </div>
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

const mapDispatchToProps = (dispatch: StoreDispatchType) => {
    return {
        // orders
        deleteOrder: ({ orderID }: { orderID: string }) => dispatch(deleteOrderAction({ orderID })),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
