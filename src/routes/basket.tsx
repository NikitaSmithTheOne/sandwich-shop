// *** NPM ***
import React from 'react';

// *** OTHER ***
import { IRouterObject } from './index';

const index: IRouterObject = {
    name: 'basket/index',
    path: '/basket',
    exact: true,
    RenderFn: (): JSX.Element => {
        return <h1>Basket</h1>;
    },
};

export default [index];
