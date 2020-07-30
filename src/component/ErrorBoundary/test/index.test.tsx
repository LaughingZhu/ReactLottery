/*
 * @Author: wzi
 * @Date: 2018-01-31 16:40:02
 * @Last Modified by: wzi
 * @Last Modified time: 2018-03-02 11:23:04
 */
import ErrorBoundary from '@components/ErrorBoundary';
import { shallow } from 'enzyme';
import * as React from 'react';
export default class Greeter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>123</div>;
    }
}
describe('errorBoundary', () => {
    test('errorBoundary', () => {
        const wrapper = shallow(
            <ErrorBoundary description={'错误信息啊'}>
                <Greeter />
            </ErrorBoundary>
        );
        expect(wrapper.contains(<Greeter />)).toEqual(true);
        wrapper.setState({ error: '出错了!', errorInfo: '错误信息!' });
        expect(wrapper.contains(<Greeter />)).toEqual(false);
    });
});
