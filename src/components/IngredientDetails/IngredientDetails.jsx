import React from "react";
import Modal from "../Modal/Modal";
import ingredientDetails from './ingredientDetails.module.css'

const IngredientDetails = ({ ingredient, isVisible, setVisibility }) => {

    return (
        <Modal 
            isVisible={ isVisible }
            setVisibility={ setVisibility }
            children={ 
                <div className={ingredientDetails.main}>
                    <h2 className={`text text_type_main-large mt-10 ml-10 ${ingredientDetails.title}`}>Детали ингредиента</h2>
                    <div className={`mb-15 ${ingredientDetails.about}`}>
                        <img className="mb-4" src={ingredient.image_large}/>
                        <p className="mb-8 text text_type_main-medium">{ingredient.name}</p>
                        <ul className={ingredientDetails.ul}>
                            <li className={`mr-5 ${ingredientDetails.li}`}>
                                <p className="text text_type_main-default text_color_inactive mb-2">Калории,ккал</p>
                                <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
                            </li>
                            <li className={`mr-5 ${ingredientDetails.li}`}>
                                <p className="text text_type_main-default text_color_inactive mb-2">Белки, г</p>
                                <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
                            </li>
                            <li className={`mr-5 ${ingredientDetails.li}`}> 
                                <p className="text text_type_main-default text_color_inactive mb-2">Жиры, г</p>
                                <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
                            </li>
                            <li className={ingredientDetails.li}>
                                <p className="text text_type_main-default text_color_inactive mb-2">Углеводы, г</p>
                                <p className="text text_type_digits-default text_color_inactive">{ingredient.carbohydrates}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            
            }
        />
    );
}

export default IngredientDetails;