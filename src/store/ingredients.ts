// *** OTHER ***
import { SandwichIngredientType } from '../components/Sandwich/Sandwich';

// *** ACTION TYPES ***
type ADD_INGREDIENT = 'ADD_INGREDIENT';
type DELETE_INGREDIENT = 'DELETE_INGREDIENT';

// *** ACTION INTERFACES ***
interface IAddIngredientAction {
    type: ADD_INGREDIENT;
    ingredient: SandwichIngredientType;
}

interface IDeleteIngredientAction {
    type: DELETE_INGREDIENT;
    ingredientIndex: number;
}

type ActionTypes = IAddIngredientAction | IDeleteIngredientAction;

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

// ***INITIAL STATE ***
export type IngredientStateType = SandwichIngredientType[];
const initialState: IngredientStateType = [];

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
        default:
            return state;
    }
};

export default reducer;
