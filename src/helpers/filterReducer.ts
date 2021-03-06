import { RecipeCategory, RecipeType } from '../models';

export type FilterAction =
  | { type: 'ORDER_ASC' }
  | { type: 'ORDER_DESC' }
  | { type: 'FILTER_INGREDIENTS'; payload: string }
  | { type: 'REMOVE_INGREDIENT'; payload: string }
  | { type: 'FILTER_CATEGORY'; payload: RecipeCategory }
  | { type: 'FILTER_TYPE'; payload: RecipeType }
  | { type: 'CLEAR' };

export type FilterState = {
  order: 'asc' | 'desc';
  ingredients: string[];
  category?: RecipeCategory;
  type?: RecipeType;
};

export type FilterReducer = (state: FilterState, action: FilterAction) => FilterState;

export const filterReducer: FilterReducer = (state, action) => {
  switch (action.type) {
    case 'ORDER_ASC': {
      return {
        ...state,
        order: 'asc',
      };
    }
    case 'ORDER_DESC': {
      return {
        ...state,
        order: 'desc',
      };
    }
    case 'FILTER_INGREDIENTS': {
      return {
        ...state,
        ingredients: !action.payload
          ? state.ingredients
          : [...new Set([...state.ingredients, action.payload])],
      };
    }
    case 'REMOVE_INGREDIENT': {
      return {
        ...state,
        ingredients: state.ingredients.filter(i => i !== action.payload),
      };
    }
    case 'FILTER_CATEGORY': {
      return {
        ...state,
        category: state.category === action.payload ? undefined : action.payload,
      };
    }
    case 'FILTER_TYPE': {
      return {
        ...state,
        type: state.type === action.payload ? undefined : action.payload,
      };
    }
    case 'CLEAR': {
      return {
        ...state,
        type: undefined,
        ingredients: [],
        category: undefined,
      };
    }
    default:
      return {
        ...state,
        order: 'asc',
      };
  }
};
