// *** NPM ***
import React from 'react';
import { connect } from 'react-redux';
import { Button, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

// *** OTHER ***
import Sandwich, { SandwichIngredientType } from '../../components/Sandwich/Sandwich';
import { StoreType, StoreDispatchType } from '../../store';
import {
    addIngredientAction,
    addIngredientActionType,
    deleteIngredientAction,
    deleteIngredientActionType,
} from '../../store/ingredients';

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
    }),
);

// *** PROPS ***
interface IProps {
    ingredients: StoreType['ingredients'];
    addIngredient: addIngredientActionType;
    deleteIngredient: deleteIngredientActionType;
}

const SandwichBuilder = (props: IProps): JSX.Element => {
    // *** STYLES ***
    const classes = useStyles();

    // *** PROPS ***
    const { ingredients, addIngredient, deleteIngredient } = props;

    // *** HANDLERS ***
    const onAddIngredientHandler = (ingredient: SandwichIngredientType) => {
        addIngredient({ ingredient });
    };
    const onDeleteIngredientHandler = (ingredientIndex: number) => {
        deleteIngredient({ ingredientIndex });
    };

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
            </div>

            {/* SANDWICH OUTPUT */}
            <Sandwich
                ingredients={ingredients}
                onIngredientClick={(index) => onDeleteIngredientHandler(index)}
            />
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
        addIngredient: ({ ingredient }: { ingredient: SandwichIngredientType }) =>
            dispatch(addIngredientAction({ ingredient })),
        deleteIngredient: ({ ingredientIndex }: { ingredientIndex: number }) =>
            dispatch(deleteIngredientAction({ ingredientIndex })),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SandwichBuilder);
