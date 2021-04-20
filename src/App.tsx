// *** NPM ***
import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

// *** OTHER ***
import Layout from './HOC/Layout/Layout';
import constants from './common/constants';

const App = (): JSX.Element => {
    // *** USE EFFECT ***
    // componentDidMount
    useEffect(() => {
        console.log('[App] componentDidMount');
    }, []);

    return (
        <div className="App" style={{ minWidth: constants.CONTENT_WIDTH }}>
            {/* LAYOUT */}
            <Layout>
                {/* ROUTER */}
                <Switch>
                    <Route path="/" exact>
                        <h1>Home</h1>
                    </Route>
                    <Route path="/basket" exact>
                        <h1>Basket</h1>
                    </Route>
                    <Route path="*">
                        <h1>Not Found</h1>
                    </Route>
                </Switch>
            </Layout>
        </div>
    );
};

export default App;
