import React from 'react';
import { Link } from 'react-router-dom';

import Emptyimg from '../assets/img/empty-cart.png';

const CartEmpty: React.FC = () => (
        <div className="cart cart--empty">
            <h2>
                Корзина пустая
                <span>:(</span>
            </h2>
            <p>
                Вероятнее всего вы еще не заказали пиццу.
                <br />
                Для того чтобы заказать пиццу, перейдите на главную страницу
            </p>
            <img src={Emptyimg} alt="" />
            <Link to="/" className="button button--black">
                <span>Вернуться назад</span>
            </Link>
        </div>
);

export default CartEmpty;
