// *** NPM ***
import React, { useEffect } from 'react';

// *** OTHER ***
import Layout from './HOC/Layout/Layout';
import Routes from './routes/index';

const App = (): JSX.Element => {
    // *** USE EFFECT ***
    // componentDidMount
    useEffect(() => {
        console.log('[App] componentDidMount');
    }, []);

    return (
        <div className="App">
            {/* LAYOUT */}
            <Layout>
                {/* ALL ROUTES */}
                {Routes()}
            </Layout>
        </div>
    );
};

export default App;
