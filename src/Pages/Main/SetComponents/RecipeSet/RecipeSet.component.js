import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./RecipeSet.styles.scss";

class RecipeSet extends Component {
  constructor() {
    super();
    this.state = {
      recipeList: [],
    };
  }

  componentDidMount = () => {
    fetch("http://localhost:3000/Data/MainRecipeData.json")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          recipeList: res.recipeItems,
        });
      })
      .catch((error) => console.log(error.message));
  };

  render() {
    const { recipeList } = this.state;
    const recipeToShow = recipeList.slice(0, 3);
    return (
      <ul className="RecipeSet">
        {recipeToShow.map((recipe) => {
          return (
            <li className="recipe-set-item">
              <Link className="Link" to="">
                <div className="recipe-image">
                  <img
                    className="recipe-img"
                    src={recipe.src}
                    alt={recipe.alt}
                  />
                </div>
              </Link>
              <div className="recipe-info">
                <h2 className="recipe-title">{recipe.title}</h2>
                <h3 className="recipe-subtitle">{recipe.subtitle}</h3>
              </div>
              {/* </Link> */}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default RecipeSet;
