/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// *** NPM ***
import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

// *** OTHER ***
import SandwichBread from '../../components/Sandwich/Ingredients/SandwichBread';
import SandwichBacon from '../../components/Sandwich/Ingredients/SandwichBacon';
import SandwichCheese from '../../components/Sandwich/Ingredients/SandwichCheese';
import SandwichCucumber from '../../components/Sandwich/Ingredients/SandwichCucumber';

// *** STYLES ***
const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
        },
    }),
);

// *** TYPES ***
export type SandwichIngredientType = 'bacon' | 'cheese' | 'cucumber';

// *** MAPS ***
const ingredientsMap: { [key in SandwichIngredientType]: JSX.Element } = {
    bacon: <SandwichBacon />,
    cheese: <SandwichCheese />,
    cucumber: <SandwichCucumber />,
};

// *** PROPS ***
interface IProps {
    ingredients: SandwichIngredientType[];
    onIngredientClick?: (ingredientIndex: number) => void;
}

const Sandwich = (props: IProps): JSX.Element => {
    // *** STYLES ***
    const classes = useStyles();

    // *** PROPS ***
    const { ingredients, onIngredientClick = () => null } = props;

    // *** CONDITIONALS ***
    // Sandwich Ingredients
    const sandwichIngredients: JSX.Element[] = [];

    ingredients.forEach((ingredient, index) => {
        const ingredientComponent = (
            <div key={`${ingredient + index}`} onClick={() => onIngredientClick(index)}>
                {ingredientsMap[ingredient]}
            </div>
        );

        sandwichIngredients.push(ingredientComponent);
    });

    return (
        <div className={classes.root}>
            {/* SANDWICH TOP BREAD */}
            <SandwichBread />

            {/* SANDWICH INGREDIENTS */}
            {sandwichIngredients.length > 0 ? (
                sandwichIngredients
            ) : (
                <Typography color="primary" variant="h4" component="span">
                    No ingredients yet
                </Typography>
            )}

            {/* SANDWICH BOTTOM BREAD */}
            <SandwichBread />
        </div>
    );
};

Sandwich.defaultProps = {
    onIngredientClick: () => null,
};

export default Sandwich;
