// *** NPM **
import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography, Modal, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

// *** OTHER ***
import Order from './Order';
import OrdersConfirmation from './OrdersConfirmation';
import { resetOrdersAction, resetOrdersActionType } from '../../store/orders';
import { StoreDispatchType, StoreType } from '../../store';

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
        modal: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        },
    }),
);

// *** PROPS ***
interface IProps {
    orders: StoreType['orders'];
    resetOrders: resetOrdersActionType;
}

const Orders = (props: IProps): JSX.Element => {
    // *** STYLES ***
    const classes = useStyles();

    // *** PROPS ***
    const { orders, resetOrders } = props;

    // *** USE STATE ***
    const [openConfirmationState, setOpenConfirmationState] = useState<boolean>(false);

    // *** EXTERNAL HOOKS ***
    const history = useHistory();

    // *** HANDLERS ***
    const onSuccessConfirmHandler = () => {
        // close modal
        setOpenConfirmationState(() => false);

        // reset orders store
        resetOrders();

        // redirect to home
        history.push('/');
    };

    // *** CONDITIONALS ***
    const ordersOutput: JSX.Element[] = [];

    if (Object.keys(orders).length > 0) {
        Object.entries(orders).forEach(([key, value]) => {
            const orderOutput = (
                <Order
                    key={key}
                    orderID={key}
                    ingredients={value.ingredients}
                    amount={value.amount}
                />
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

            {/* CONFIRMATION BUTTON */}
            {ordersOutput.length > 0 && (
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '20px' }}
                    onClick={() => setOpenConfirmationState(() => true)}
                >
                    Confirm
                </Button>
            )}

            {/* CONFIRMATION MODAL */}
            <Modal
                className={classes.modal}
                open={openConfirmationState}
                onBackdropClick={() => setOpenConfirmationState(() => false)}
            >
                <OrdersConfirmation onSuccessConfirm={() => onSuccessConfirmHandler()} />
            </Modal>
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
        resetOrders: () => dispatch(resetOrdersAction()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
