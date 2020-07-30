/*
 * @Author: wzi
 * @Date: 2018-03-02 10:04:09
 * @Last Modified by: wzi
 * @Last Modified time: 2019-01-08 16:44:56
 */

import React, { SFC } from 'react';
import { lifecycle, branch, renderComponent } from 'recompose';
import { compose } from '..//helper/compose';

type ErrorBoundaryProp = {
    error: Error;
    description?: string;
};
const ErrorBoundary: SFC<ErrorBoundaryProp> = ({ error, description }) => {
    return (
        <div style={{ margin: 20, overflow: 'hidden' }}>
            <div>🤣 出错了</div>
            <div>{description || error.message || error.toString()}</div>
        </div>
    );
};

const errorBoundaryEnhancer = (description: string) =>
    compose(
        // @ts-ignore
        branch(({ error }) => error, renderComponent(ErrorBoundary)),
        lifecycle({
            // @ts-ignore
            componentDidCatch(error: Error) {
                this.setState({ error, description });
            },
        })
    );
export default errorBoundaryEnhancer;
