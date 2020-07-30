/*
 * @Author: wzi
 * @Date: 2018-01-31 16:40:02
 * @Last Modified by: wzi
 * @Last Modified time: 2018-12-05 17:07:38
 */
import ErrorBoundaryDecorator from '@common/decorator/errorBoundaryDecorator';
import { mount } from 'enzyme';
import expect from 'expect';
import * as React from 'react';
@ErrorBoundaryDecorator('方法错误提示')
class Greeter extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    @ErrorBoundaryDecorator('方法错误提示', false, false)
    errorInfo(test) {
        return <div>这些信息在错误发生时不展示{test}</div>;
    }

    render() {
        return (
            <div>
                {this.errorInfo('123')}
                <span>{this.props.test}</span>
            </div>
        );
    }
}
function ProblemChild() {
    throw new Error('Error thrown from problem child');
    // @ts-ignore
    return <div>Error</div>;
}

@ErrorBoundaryDecorator('测试', true, false)
class Greeter2 extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }
    errorInfo() {
        return <div>这些信息在错误发生时不展示</div>;
    }

    render() {
        return (
            <div>
                {this.errorInfo()}
                {this.props.children}
            </div>
        );
    }
}
describe('errorBoundaryClassDecorator', () => {
    test('errorBoundaryDecorator', () => {
        const wrapper = mount(<Greeter test="test" />);
        expect(
            wrapper.contains(<div>这些信息在错误发生时不展示123</div>)
        ).toEqual(true);
        wrapper.setState({ error: new Error('haha'), errorInfo: '123' });
        expect(wrapper.contains(<div>这些信息在错误发生时不展示</div>)).toEqual(
            false
        );
    });

    test('componentDidCatch', () => {
        jest.spyOn(Greeter2.prototype, 'componentDidCatch');
        mount(
            <Greeter2>
                <ProblemChild />
            </Greeter2>
        );
        expect(Greeter2.prototype.componentDidCatch).toHaveBeenCalled();
    });
    test('hide', () => {
        const wrapper = mount(<Greeter test="test" />);
        expect(wrapper.contains(<Greeter test="test" />)).toBeTruthy();
    });
});
