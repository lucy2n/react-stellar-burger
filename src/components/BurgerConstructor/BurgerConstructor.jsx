import React from 'react';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructor from './BurgerConstructor.module.css'
import OrderDetails from '../OrderDetails/OrderDetails';
import PropTypes from "prop-types";
import { ingredientPropType } from '../../utils/prop-types';
import Modal from '../Modal/Modal';
import { useModal } from '../../hooks/useModal';

function BurgerConstructor({ ingredients }) {   

    const { isModalOpen, openModal, closeModal } = useModal();

    const bun = ingredients.find(ingredient => ingredient.type === "bun")
    

    return(
        <>
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
                        ingredients.map((ingredient) => ( ingredient.type != "bun" &&
                            <li className={`mb-4 ml-4 ${burgerConstructor.li}`} key={ingredient._id}>
                                <DragIcon />
                                <ConstructorElement 
                                extraClass={burgerConstructor.element}
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image_mobile}
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
                    <p className='text text_type_digits-medium mr-4'>610</p>
                    <CurrencyIcon />
                </div>
                <Button extraClass='mr-4' htmlType="button" type="primary" size="medium" onClick={openModal}>
                    Оформить заказ
                </Button>
            </div>
            { isModalOpen &&
                <Modal
                closeModal={closeModal}
                >
                    <OrderDetails />
                </Modal>
            }  
        </>
    )
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientPropType).isRequired
}

export default BurgerConstructor;