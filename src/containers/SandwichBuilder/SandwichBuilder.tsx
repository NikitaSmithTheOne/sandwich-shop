// *** NPM ***
import React from 'react';
import { connect } from 'react-redux';
import { Button, TextField, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';

// *** OTHER ***
import Sandwich, { SandwichIngredientType } from '../../components/Sandwich/Sandwich';
import { StoreType, StoreDispatchType } from '../../store';
import {
    addIngredientAction,
    addIngredientActionType,
    deleteIngredientAction,
    deleteIngredientActionType,
    resetIngredientsAction,
    resetIngredientsActionType,
} from '../../store/ingredients';
import { addOrderAction, addOrderActionType } from '../../store/orders';

// *** STYLES ***
const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            marginTop: '20px',
            boxSizing: 'border-box',
        },
        title: {
            color: theme.palette.secondary.main,
            marginBottom: '15px',
        },
        sandwichManagement: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: '600px',
            marginBottom: '10px',
        },
        baconButton: {
            color: '#b33e10',
            border: '2px solid #b33e10',
            marginRight: '10px',
        },
        cheeseButton: {
            color: '#f5c451',
            border: '2px solid #f5c451',
            marginRight: '10px',
        },
        cucumberButton: {
            color: '#36b310',
            border: '2px solid #36b310',
            marginRight: '10px',
        },
        resetButton: {
            color: 'red',
            border: '2px solid red',
            marginRight: '10px',
        },
        sandwichOrder: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '600px',
            marginTop: '20px',
            border: `3px solid ${theme.palette.primary.main}`,
            borderRadius: '10px',
            padding: '20px',
        },
        sandwichOrderField: {
            width: '400px',
            margin: '10px auto',
        },
    }),
);

// *** PROPS ***
interface IProps {
    ingredients: StoreType['ingredients'];
    addIngredient: addIngredientActionType;
    deleteIngredient: deleteIngredientActionType;
    resetIngredients: resetIngredientsActionType;
    addOrder: addOrderActionType;
}

const SandwichBuilder = (props: IProps): JSX.Element => {
    // *** STYLES ***
    const classes = useStyles();

    // *** PROPS ***
    const { ingredients, addIngredient, deleteIngredient, resetIngredients, addOrder } = props;

    // *** EXTERNAL HOOKS ***
    const { handleSubmit, control, formState, reset } = useForm();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    // *** HANDLERS ***
    const onAddIngredientHandler = (ingredient: SandwichIngredientType) => {
        addIngredient({ ingredient });
    };
    const onDeleteIngredientHandler = (ingredientIndex: number) => {
        deleteIngredient({ ingredientIndex });
    };

    const onResetIngredientsHandler = () => {
        resetIngredients();
    };

    const onSubmitHandler = (data: { amount: number }) => {
        // TODO: MAKE SOMETHING USEFUL
        console.log(data);

        // add order to redux store
        addOrder({ ingredients, amount: data.amount });

        // reset ingredients store
        resetIngredients();

        // reset form
        reset();

        // success snack message
        const snackBar = enqueueSnackbar('The order is in the basket now', {
            variant: 'success',
            anchorOrigin: { horizontal: 'right', vertical: 'top' },
            onClick: () => closeSnackbar(snackBar),
        });
    };

    // *** CONDITIONALS ***
    const sandwichOrderForm =
        ingredients.length > 0 ? (
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <div className={classes.sandwichOrder}>
                    {/* TITLE */}
                    <Typography variant="h5" component="h2" color="primary">
                        ORDER
                    </Typography>

                    {/* AMOUNT FILED */}
                    <Controller
                        render={({ field }) => {
                            return (
                                <TextField
                                    className={classes.sandwichOrderField}
                                    variant="outlined"
                                    label="Sandwiches Amount"
                                    error={!!formState.errors?.amount?.message}
                                    helperText={formState.errors?.amount?.message}
                                    // eslint-disable-next-line react/jsx-props-no-spreading
                                    {...field}
                                />
                            );
                        }}
                        name="amount"
                        control={control}
                        rules={{
                            required: { value: true, message: 'The field is required' },
                            min: {
                                value: 1,
                                message: 'The value should greater than 0',
                            },
                            max: {
                                value: 100,
                                message: 'The value should be less or equal to 100',
                            },
                            pattern: {
                                value: /^\d+$/g,
                                message: 'The value should be integer',
                            },
                        }}
                        defaultValue=""
                    />

                    {/* SUBMIT */}
                    <Button variant="contained" color="secondary" type="submit">
                        ADD TO BASKET
                    </Button>
                </div>
            </form>
        ) : null;

    return (
        <div className={classes.root}>
            {/* TITLE */}
            <Typography variant="h4" component="h1" className={classes.title}>
                CHOICE YOUR SANDWICH!
            </Typography>

            {/* SANDWICH MANAGEMENT */}
            <div className={classes.sandwichManagement}>
                {/* BACON */}
                <Button
                    className={classes.baconButton}
                    onClick={() => onAddIngredientHandler('bacon')}
                >
                    +1 Bacon
                </Button>

                {/* CHEESE */}
                <Button
                    className={classes.cheeseButton}
                    onClick={() => onAddIngredientHandler('cheese')}
                >
                    +1 Cheese
                </Button>

                {/* CUCUMBER */}
                <Button
                    className={classes.cucumberButton}
                    onClick={() => onAddIngredientHandler('cucumber')}
                >
                    +1 Cucumber
                </Button>

                {/* RESET */}
                <Button className={classes.resetButton} onClick={() => onResetIngredientsHandler()}>
                    Reset
                </Button>
            </div>

            {/* SANDWICH OUTPUT */}
            <Sandwich
                ingredients={ingredients}
                onIngredientClick={(index) => onDeleteIngredientHandler(index)}
            />

            {/* ORDER FORM */}
            {sandwichOrderForm}
        </div>
    );
};

// *** REDUX STORE ***
const mapStateToProps = (state: StoreType) => {
    return {
        ingredients: state.ingredients,
    };
};

const mapDispatchToProps = (dispatch: StoreDispatchType) => {
    return {
        // ingredients
        addIngredient: ({ ingredient }: { ingredient: SandwichIngredientType }) =>
            dispatch(addIngredientAction({ ingredient })),
        deleteIngredient: ({ ingredientIndex }: { ingredientIndex: number }) =>
            dispatch(deleteIngredientAction({ ingredientIndex })),
        resetIngredients: () => dispatch(resetIngredientsAction()),
        // orders
        addOrder: ({
            ingredients,
            amount,
        }: {
            ingredients: SandwichIngredientType[];
            amount: number;
        }) => dispatch(addOrderAction({ ingredients, amount })),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SandwichBuilder);
