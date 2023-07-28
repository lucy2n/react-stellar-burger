export const apiUrl = 'https://norma.nomoreparties.space/api';
export const wsApiUrl = 'wss://norma.nomoreparties.space/orders';

const homePage = '/';
const loginPage = '/login';
const registerPage = '/register';
const forgotPassPage = '/forgot-password';
const resetPassPage = '/reset-password';
const profilePage = '/profile';
const ordersPage = 'orders';
const ingredientDetailsPage = '/ingredients/:ingredientId';
const feedPage = '/feed';

export const RoutePathname = {
    homePage,
    loginPage,
    registerPage,
    forgotPassPage,
    resetPassPage,
    profilePage,
    ordersPage,
    ingredientDetailsPage,
    feedPage
};

export const testOrders = {
    orders: [
        {
          ingredients: [
            '643d69a5c3f7b9001cfa093f',
            '643d69a5c3f7b9001cfa0940',
            '643d69a5c3f7b9001cfa093d',
            '643d69a5c3f7b9001cfa0944',
            '643d69a5c3f7b9001cfa0947',
            '643d69a5c3f7b9001cfa0948',
            '643d69a5c3f7b9001cfa0947',
            '643d69a5c3f7b9001cfa0948'
          ],
          _id: '1',
          status: 'done',
          number: 0,
          createdAt: '2021-06-23T14:43:22.587Z',
          updatedAt: '2021-06-23T14:43:22.603Z'
        },
        {
            'ingredients': [
              '643d69a5c3f7b9001cfa0947',
              '643d69a5c3f7b9001cfa0948'
            ],
            '_id': '2',
            'status': 'done',
            'number': 1,
            'createdAt': '2021-06-23T20:11:01.403Z',
            'updatedAt': '2021-06-23T20:11:01.406Z'
          },
          {
            'ingredients': [
              '643d69a5c3f7b9001cfa094a'
            ],
            '_id': '3',
            'status': 'done',
            'number': 3,
            'createdAt': '2021-06-23T20:13:23.654Z',
            'updatedAt': '2021-06-23T20:13:23.657Z'
          },
          {
            'ingredients': [
              '643d69a5c3f7b9001cfa094a',
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa093d'
            ],
            '_id': '4',
            'status': 'done',
            'number': 4,
            'createdAt': '2021-06-23T20:13:23.654Z',
            'updatedAt': '2021-06-23T20:13:23.657Z'
          }
      ],
};