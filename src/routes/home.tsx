// *** NPM ***
import React from 'react';

// *** OTHER ***
import SandwichBuilder from '../containers/SandwichBuilder/SandwichBuilder';

// *** OTHER ***
import { IRouterObject } from './index';

const index: IRouterObject = {
    name: 'home/index',
    path: '/',
    exact: true,
    RenderFn: (): JSX.Element => {
        return <SandwichBuilder />;
    },
};

export default [index];
