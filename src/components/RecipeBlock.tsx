import React from 'react';
import { Recipe, RecipeCategory, RecipeType } from '../models';
import styled from 'styled-components';
import { GridContainer } from './shared/GridContainer';
import { GridColumn } from './shared/GridColumn';
import { Label } from './shared/Label';
import { fromDevice } from '../styles/mediaQueries';

type Props = {
  recipe: Recipe;
};

export const RecipeBlock: React.FC<Props> = ({ recipe }) => {
  return (
    <Container>
      <GridContainer alignItems="baseline">
        <GridColumn>
          <Title>{recipe.name}</Title>
        </GridColumn>
        <GridColumn align="right">{recipe.time} min</GridColumn>
      </GridContainer>

      <GridContainer columnGap="sm" top="lg">
        {recipe.category.map(c => (
          <GridColumn>
            <CategoryLabel type={c}>{c}</CategoryLabel>
          </GridColumn>
        ))}
        {recipe.type.map(t => (
          <GridColumn>
            <TypeLabel type={t}>{t}</TypeLabel>
          </GridColumn>
        ))}
      </GridContainer>

      <GridContainer top="lg" columnGap="md">
        <GridColumn width={[100, 40]}>
          <ul>
            {recipe.ingredients.map(ingredient => (
              <li>{ingredient.name}</li>
            ))}
          </ul>
        </GridColumn>
        <GridColumn width={[100, 60]} top={['lg', '']}>
          {recipe.description}
        </GridColumn>
      </GridContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  background: #f1f1f1;
  padding: ${props => props.theme.grid.lg}px;
  width: 90%;
  margin-top: ${props => props.theme.grid.lg}px;
  border-radius: 3px;
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.1);

  ${fromDevice.md} {
    width: 75%;
  }

  ${fromDevice.lg} {
    width: 60%;
  }
`;

const Title = styled.h2`
  margin: 0;
  font-size: 28px;
  font-weight: ${props => props.theme.font.bold};
`;

const CategoryLabel = styled(Label)<{ type: RecipeCategory }>`
  background: ${props => {
    switch (props.type) {
      case 'breakfast':
        return 'yellow';
      case 'dessert':
        return 'pink';
      case 'dinner':
        return 'darkgreen';
      case 'lunch':
        return 'orange';
      case 'sidedish':
        return 'lightblue';
      case 'starter':
        return 'beige';
      default:
        return 'pink';
    }
  }};
`;
const TypeLabel = styled(Label)<{ type: RecipeType }>`
  background: ${props => {
    switch (props.type) {
      case 'fish':
        return 'blue';
      case 'meat':
        return 'red';
      case 'soup':
        return 'brown';
      case 'sweet':
        return 'purple';
      case 'vegan':
        return 'lightgreen';
      case 'vegetarian':
        return 'green';
      default:
        return 'none';
    }
  }};
`;