// *** NPM ***
import React from 'react';

// *** OTHER ***
import { IRouterObject } from './index';
import SandwichBuilder from '../containers/SandwichBuilder/SandwichBuilder';

const index: IRouterObject = {
    name: 'home/index',
    path: '/',
    exact: true,
    RenderFn: (): JSX.Element => {
        return <SandwichBuilder />;
    },
};

export default [index];
