import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';
import { useDrag } from 'react-dnd';
import { getConstructorState } from '../../services/constructor/slice';
import { Link, useLocation } from 'react-router-dom';
import { TIngedient } from '../../types/ingredient';
import { useAppSelector } from '../../hooks/hooks';

export const Ingredient = ( { ingredient } : {ingredient: TIngedient}): JSX.Element => {

    const location = useLocation();

    const { ingredients, bun } = useAppSelector(getConstructorState);

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: ingredient,
        collect: monitor => ({
            didDrop: monitor.didDrop(),
            item: monitor.getItem()
        })
    });

    const [count, setCount] = React.useState<number>(0);

    React.useEffect(() => {
        let ingredientCount = 0;
        
        if (bun && ingredient.type === 'bun' && ingredient._id === bun._id) {
            ingredientCount = 1;
        } else {
            ingredientCount = ingredients.filter(item => item._id === ingredient._id).length;
        }
        setCount(ingredientCount);
    }, [bun, ingredients]);

    return(
        <Link
        key={ingredient._id}
        to={`/ingredients/${ingredient._id}`}
        state={{ background: location }}
        className={`text text_type_main-default ${styles.link}`}
        >
            <div 
            ref={dragRef}
            className={styles.main} 
            >
                { count > 0 &&
                    <Counter count={count} size="default" extraClass="m-1" />
                }
                <img className="mr-4 ml-4" src={ingredient.image} alt={ingredient.name}/>
                <div className={`mt-1 mb-1 ${styles.price}`}>
                    <p className="mr-2 text text_type_digits-default">{ingredient.price}</p>
                    <CurrencyIcon type='primary'/>
                </div>
                <p className={`text text_type_main-default ${styles.center}`}>{ingredient.name}</p>
            </div>
        </Link>
    );
};