import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useRef } from 'react';
import { ItemTypes } from '../../utils/ItemTypes';
import { XYCoord, useDrag, useDrop } from 'react-dnd';
import styles from './constructor-ingredient.module.css';
import { deleteIngredient } from '../../services/constructor/slice';
import { TIngedient } from '../../types/ingredient';
import { useAppDispatch } from '../../hooks/hooks';

type TConstructorIngredient = {
  ingredient: TIngedient
  index: number
  moveCard (dragIndex: number, hoverIndex: number): void;
};

interface DragItem {
  index: number
  id: string
  type: string
}

export const ConstructorIngredient = ({ ingredient, index, moveCard }: TConstructorIngredient): JSX.Element => {

    const dispatch = useAppDispatch();

    const ref = useRef<HTMLDivElement>(null);
    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.CONSTRUCTOR_INGREDIENT,
        collect(monitor) {
          return {
            handlerId: monitor.getHandlerId(),
          };
        },
        hover(item: DragItem, monitor) {
          if (!ref.current) {
            return;
          }
          const dragIndex = item.index;
          const hoverIndex = index;
          if (dragIndex === hoverIndex) {
            return;
          }
          const hoverBoundingRect = ref.current?.getBoundingClientRect();
          const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          const clientOffset = monitor.getClientOffset();
          const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
          }
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
          }
          moveCard(dragIndex, hoverIndex);
          item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CONSTRUCTOR_INGREDIENT,
        item: () => {
          return { index };
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    return (
        <div
        ref={ref}
        style={{ opacity: opacity, cursor: 'pointer' }}
        data-handler-id={handlerId}
        className={`mb-4 ml-4 ${styles.li}`} 
        >
            <DragIcon type='primary' />
            <ConstructorElement 
            extraClass={styles.element}
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image_mobile}
            handleClose={() => dispatch(deleteIngredient(ingredient))}
            />
        </div>
    );
};