import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructor from './BurgerConstructor.module.css'
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../services/actions/order';
import { ORDER_MODAL } from '../../services/actions/modal';
import { useDrop } from "react-dnd";
import { ADD_INGREDIENT, DELETE_INGREDIENT } from '../../services/actions/constructor';

function BurgerConstructor() {
    const dispatch = useDispatch();
    const { ingredients, bun, price } = useSelector(state => state.burgerConstructor)
    const { modalType } = useSelector(state => state.modal)

    async function createOrder() {
        // Создание массива id ингредиентов для оформления заказа
        const ingredientsId = ingredients.map(ingredient => ingredient._id)
        if ( bun ) {
            ingredientsId.push(bun._id)
        }

        if (ingredientsId.length > 0) {
            // Отправка запроса
            dispatch(getOrder(ingredientsId))
        }
    }

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(ingredient) {
            dispatch({
                type: ADD_INGREDIENT,
                ingredient: ingredient
            })
        },
    });

    const deleteIngredient = (ingredient) => {
        dispatch({
            type: DELETE_INGREDIENT,
            ingredient: ingredient
        })
    }

    return (
        <div ref={dropTarget}>
            <ul className={`ml-4 mr-4 ${burgerConstructor.main}`}>
                { bun &&
                <li className={burgerConstructor.li}>
                    <ConstructorElement
                    extraClass={`mb-4 mr-8 ml-8 ml-6 ${burgerConstructor.element}`}
                    text={`${bun.name} (верх)`}
                    type='top'
                    isLocked={true}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                    />
                </li>
                }
                <div className={`custom-scroll ${burgerConstructor.wrapper}`}>
                    {
                        ingredients.map((ingredient) => (
                            <li className={`mb-4 ml-4 ${burgerConstructor.li}`} key={uuidv4()}>
                                <DragIcon />
                                <ConstructorElement 
                                extraClass={burgerConstructor.element}
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image_mobile}
                                handleClose={() => deleteIngredient(ingredient)}
                                />
                            </li>
                        ))
                    }
                </div>
                { bun &&
                <li className={burgerConstructor.li} >
                    <ConstructorElement
                    extraClass={`mt-4 mr-8 ml-8 mb-10 ${burgerConstructor.element}`}
                    text={`${bun.name} (низ)`}
                    type='bottom'
                    isLocked={true}
                    price={bun.price}
                    thumbnail={bun.image_mobile}
                    />
                </li>
                }
            </ul>
            <div className={burgerConstructor.sum}>
                <div className= {`mr-10 ${burgerConstructor.price}`}>
                    <p className='text text_type_digits-medium mr-4'>{price}</p>
                    <CurrencyIcon />
                </div>
                <Button extraClass='mr-4' htmlType="button" type="primary" size="medium" onClick={createOrder}>
                    Оформить заказ
                </Button>
            </div>
            { modalType === ORDER_MODAL &&
                <Modal>
                    <OrderDetails />
                </Modal>
            }  
        </div>
    )
}

export default BurgerConstructor;