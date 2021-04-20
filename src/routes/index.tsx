// *** NPM ***
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// *** OTHER ***
// Home
import homeRoutes from './home';
// Login
import basketRouter from './basket';

// *** INTERFACES ***
export interface IRouterObject {
    name: string;
    path: string;
    exact: boolean;
    renderFn: () => JSX.Element;
}

export const allRoutes = [...homeRoutes, ...basketRouter];

const Routes = (): JSX.Element => {
    return (
        <Switch>
            {/* ALL ROUTES */}
            {allRoutes.map(({ name, path, exact, renderFn }) => (
                <Route exact={exact} path={path} key={name} render={() => renderFn()} />
            ))}

            {/* NOT FOUND */}
            <Route render={() => <h1>Not Found</h1>} />
        </Switch>
    );
};

export default Routes;
