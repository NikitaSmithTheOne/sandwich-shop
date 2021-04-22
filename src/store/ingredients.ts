// *** OTHER ***
import { SandwichIngredientType } from '../components/Sandwich/Sandwich';

// *** ACTION TYPES ***
type ADD_INGREDIENT = 'ADD_INGREDIENT';
type DELETE_INGREDIENT = 'DELETE_INGREDIENT';
type RESET_INGREDIENTS = 'RESET_INGREDIENTS';

// *** ACTION INTERFACES ***
interface IAddIngredientAction {
    type: ADD_INGREDIENT;
    ingredient: SandwichIngredientType;
}

interface IDeleteIngredientAction {
    type: DELETE_INGREDIENT;
    ingredientIndex: number;
}

interface IResetIngredientsAction {
    type: RESET_INGREDIENTS;
}

type ActionTypes = IAddIngredientAction | IDeleteIngredientAction | IResetIngredientsAction;

// *** ACTIONS ***
// Add Ingredient
export type addIngredientActionType = ({
    ingredient,
}: {
    ingredient: SandwichIngredientType;
}) => IAddIngredientAction;

export const addIngredientAction: addIngredientActionType = ({ ingredient }) => {
    return {
        type: 'ADD_INGREDIENT',
        ingredient,
    };
};

// Delete Ingredient
export type deleteIngredientActionType = ({
    ingredientIndex,
}: {
    ingredientIndex: IDeleteIngredientAction['ingredientIndex'];
}) => IDeleteIngredientAction;

export const deleteIngredientAction: deleteIngredientActionType = ({ ingredientIndex }) => {
    return {
        type: 'DELETE_INGREDIENT',
        ingredientIndex,
    };
};

// Reset Ingredients
export type resetIngredientsActionType = () => IResetIngredientsAction;

export const resetIngredientsAction: resetIngredientsActionType = () => {
    return {
        type: 'RESET_INGREDIENTS',
    };
};

// *** INITIAL STATE ***
export type IngredientsStateType = SandwichIngredientType[];
const initialState: IngredientsStateType = [];

// *** REDUCER ***
const reducer = (state = initialState, action: ActionTypes): SandwichIngredientType[] => {
    switch (action.type) {
        case 'ADD_INGREDIENT': {
            const newState = [...state];
            newState.unshift(action.ingredient);
            return newState;
        }
        case 'DELETE_INGREDIENT': {
            const newState = [...state];
            newState.splice(action.ingredientIndex, 1);
            return newState;
        }
        case 'RESET_INGREDIENTS': {
            return initialState;
        }
        default:
            return state;
    }
};

export default reducer;
