import React, { useState } from 'react';
import { FilterState, FilterAction } from './FilterReducer';
import styled from 'styled-components';
import { fromDevice } from '../styles/mediaQueries';

type Props = {
  filters: FilterState;
  sendFilter: React.Dispatch<FilterAction>;
};

export const Filter: React.FC<Props> = ({ filters, sendFilter }) => {
  const [ingredient, setIngredient] = useState<string>('');

  const updateIngredientFilter = () => {
    sendFilter({ type: 'FILTER_INGREDIENTS', payload: ingredient });
    setIngredient('');
  };

  const clearFilters = () => {
    setIngredient('');
    sendFilter({ type: 'CLEAR' });
  };

  return (
    <Container>
      <button onClick={() => sendFilter({ type: 'ORDER_ASC' })}>Order asc</button>{' '}
      <button onClick={() => sendFilter({ type: 'ORDER_DESC' })}>Order desc</button>
      <br />
      <br />
      Ingredient:{' '}
      <input
        type="text"
        id="ingredient"
        onChange={e => setIngredient(e.target.value)}
        value={ingredient}
      />{' '}
      <button onClick={updateIngredientFilter}>Add</button>{' '}
      {filters.ingredients.map((ingredient, i) => (
        <Ingredient
          key={i}
          onClick={() => sendFilter({ type: 'REMOVE_INGREDIENT', payload: ingredient })}
        >
          {ingredient}
        </Ingredient>
      ))}
      <br />
      <br />
      <button onClick={clearFilters}>Clear filters</button>
    </Container>
  );
};

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-top: ${props => props.theme.gridInPx.lg};

  ${fromDevice.md} {
    width: 75%;
  }

  ${fromDevice.lg} {
    width: 60%;
  }
`;

const Ingredient = styled.span`
  display: inline-block;
  background: #ddd;
  border-radius: 3px;
  border: 1px solid #aaa;
  padding: 2px;

  & + & {
    margin-left: ${props => props.theme.gridInPx.sm};
  }
`;