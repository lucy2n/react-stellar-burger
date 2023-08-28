export const getStatus = (orderStatus: string | undefined) => {
    switch(orderStatus) {
        case 'done':
            return 'Выполнен';
        case 'pending':
            return 'Готовится';
        case 'created':
            return 'Создан';
    }
};