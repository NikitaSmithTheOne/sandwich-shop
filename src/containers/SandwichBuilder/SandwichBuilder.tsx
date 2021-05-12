/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// *** NPM ***
import React, { useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';

// *** OTHER ***
import SandwichBread from '../../components/SandwichIngridients/SandwichBread';
import SandwichBacon from '../../components/SandwichIngridients/SandwichBacon';
import SandwichCheese from '../../components/SandwichIngridients/SandwichCheese';
import SandwichCucumber from '../../components/SandwichIngridients/SandwichCucumber';

// *** TYPES ***
type SandwichIngredientType = 'bacon' | 'cheese' | 'cucumber';

// *** MAPS ***
const ingredientsMap: { [key in SandwichIngredientType]: JSX.Element } = {
    bacon: <SandwichBacon />,
    cheese: <SandwichCheese />,
    cucumber: <SandwichCucumber />,
};

// *** STYLES ***
const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginTop: '20px',
        boxSizing: 'border-box',
    },
    sandwichManagement: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '600px',
        marginBottom: '10px',
    },
    sandwichOutput: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
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
});

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

    // *** CONDITIONALS ***
    // Sandwich Ingredients
    const sandwichIngredients: JSX.Element[] = [];

    ingredients.forEach((ingredient, index) => {
        const ingredientComponent = (
            <div key={`${ingredient + index}`} onClick={() => onDeleteIngredientHandler(index)}>
                {ingredientsMap[ingredient]}
            </div>
        );

        sandwichIngredients.push(ingredientComponent);
    });

    return (
        <div className={classes.root}>
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
            <div className={classes.sandwichOutput}>
                {/* TOP BREAD */}
                <SandwichBread />

                {/* INGREDIENTS */}
                {sandwichIngredients}

                {/* BOTTOM BREAD */}
                <SandwichBread />
            </div>
        </div>
    );
};

export default SandwichBuilder;
