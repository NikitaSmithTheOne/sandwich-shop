// *** NPM ***
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

// *** OTHER ***
import store from './store';

// *** DEFAULT ***
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// *** THEME ***
const theme = createMuiTheme({
    palette: {
        primary: { main: '#f58634', light: '#ffcc29' },
        secondary: { main: '#206a5d', light: '#81b214' },
    },
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <SnackbarProvider maxSnack={5}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </SnackbarProvider>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
