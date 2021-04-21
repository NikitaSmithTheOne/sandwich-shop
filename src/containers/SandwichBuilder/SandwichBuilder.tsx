// *** NPM ***
import React, { useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

// *** OTHER ***
import Sandwich, { SandwichIngredientType } from '../../components/Sandwich/Sandwich';

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

const SandwichBuilder = (): JSX.Element => {
    // *** STYLES ***
    const classes = useStyles();

    // *** USE STATE ***
    const [ingredients, setIngredients] = useState<SandwichIngredientType[]>([]);

    // *** HANDLERS ***
    const onAddIngredientHandler = (ingredient: SandwichIngredientType) => {
        setIngredients((currentState) => {
            const newState = [...currentState];
            newState.unshift(ingredient);
            return newState;
        });
    };
    const onDeleteIngredientHandler = (ingredientNumber: number) => {
        setIngredients((currentState) => {
            const newState = [...currentState];
            newState.splice(ingredientNumber, 1);
            return newState;
        });
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

export default SandwichBuilder;