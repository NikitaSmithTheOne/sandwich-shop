// *** NPM ***
import React, { useEffect } from 'react';

// *** OTHER ***
import Layout from './HOC/Layout/Layout';
import constants from './common/constants';
import Routes from './routes/index';

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
                {/* ALL ROUTES */}
                {Routes()}
            </Layout>
        </div>
    );
};

export default App;
