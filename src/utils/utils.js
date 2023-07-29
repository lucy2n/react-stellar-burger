export const getStatus = (orderStatus) => {
    switch(orderStatus) {
        case 'done':
            return 'Выполнен';
        case 'pending':
            return 'Готовится';
        case 'created':
            return 'Создан';
    }
};