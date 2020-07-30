/*
 * @Author: wzi
 * @Date: 2018-01-30 15:53:16
 * @Last Modified by: wzi
 * @Last Modified time: 2018-12-05 17:00:40
 */
import React from 'react';
import errorBoundaryEnhancer from '@common/HOC/ErrorBoundary';
import { compose } from '@common/helper/compose';
import { mount } from 'enzyme';
const Test: React.SFC<any> = ({ children }) => {
    return <div>成功才会显示{children}</div>;
};
function ProblemChild() {
    throw Error('ErrorBoundary ProblemChild');
    // @ts-ignore
    return <div>Error</div>;
}

describe('ErrorBoundary', () => {
    test('ErrorBoundary', () => {
        const TestWithEnhancer = compose(errorBoundaryEnhancer('测试错误'))(
            Test
        );
        const wrapper = mount(<TestWithEnhancer />);
        expect(wrapper.contains(<Test />)).toBeTruthy();
        wrapper.setState({ error: '显示测试错误!' });
        expect(wrapper.contains('显示测试错误!')).toBeTruthy();
        expect(wrapper.contains(<Test />)).toBeFalsy();
    });
    test('componentDidCatch', () => {
        const TestWithEnhancer = compose(errorBoundaryEnhancer('测试错误'))(
            Test
        );

        jest.spyOn(TestWithEnhancer.prototype, 'componentDidCatch');
        const wrapper = mount(
            <TestWithEnhancer>
                <ProblemChild />
            </TestWithEnhancer>
        );
        expect(wrapper.contains('测试错误')).toBeTruthy();
        expect(TestWithEnhancer.prototype.componentDidCatch).toHaveBeenCalled();
    });
});
