// *** NPM ***
import React, { useEffect } from 'react';

// *** OTHER ***
import Layout from './HOC/Layout/Layout';

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
                <h1>Content</h1>
            </Layout>
        </div>
    );
};

export default App;
