// *** NPM ***
import React from 'react';
import { Typography, useTheme } from '@material-ui/core';

// *** OTHER ***
import { IRouterObject } from './index';
import SandwichBuilder from '../containers/SandwichBuilder/SandwichBuilder';

const index: IRouterObject = {
    name: 'home/index',
    path: '/',
    exact: true,
    RenderFn: (): JSX.Element => {
        // *** EXTERNAL HOOKS ***
        const theme = useTheme();

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '20px auto',
                }}
            >
                {/* TITLE */}
                <Typography
                    variant="h4"
                    component="h1"
                    style={{ color: theme.palette.secondary.main }}
                >
                    Choice your sandwich!
                </Typography>

                {/* SANDWICH */}
                <SandwichBuilder />
            </div>
        );
    },
};

export default [index];
