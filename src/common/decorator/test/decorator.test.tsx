/*
 * @Author: wzi
 * @Date: 2018-01-31 16:40:02
 * @Last Modified by: wzi
 * @Last Modified time: 2018-03-08 16:26:56
 */
import {
    shouldUpdate,
    hasContext,
    provideContext,
} from '@common/decorator/decorator';
import { mount } from 'enzyme';
import expect from 'expect';
import React, { ComponentClass } from 'react';
const context = {
    outProp: 'string',
    innerState: ['object'],
};
@provideContext(context)
class Greeter extends React.Component<any, any> {
    constructor(props, contexts) {
        super(props, contexts);
        this.state = {
            innerState: {innerState: '1'},
        };
    }
    render() {
        return <Child childProps="childProps" />;
    }
}
@hasContext({
    outProp: 'string',
    innerState: 'object',
})
@provideContext({
    childState: ['string'],
    outProp: ['string'],
})
@shouldUpdate({
    context: ['outProp', 'innerState'],
    state: ['error'],
})
class Child extends React.Component<any, any> {
    state = {
        childState: 'childState',
    };
    render() {
        return <Grandson grandson={this.props.childProps} />;
    }
}
@shouldUpdate({
    test: ['123'],
    context: ['innerState.innerState', 'outProp'],
    props: ['childProps'],
})
@hasContext({
    childState: 'string',
    outProp: 'string',
    innerState: 'object',
})
class Grandson extends React.Component<any, any> {
    render() {
        return this.context.outProp;
    }
}

describe('react lifecycle decorator', () => {
    test('provideContext', () => {
        const Test = Greeter as ComponentClass;
        const wrapper = mount(<Greeter outProp="outProp" />);
        expect(Test.childContextTypes).toHaveProperty('outProp');
        expect(wrapper.contains('outProp')).toBe(true);
        wrapper.setProps({outProp: 'outProp1'});
        expect(wrapper.contains('outProp')).toBe(false);
        expect(wrapper.contains('outProp1')).toBe(true);
    });

    // test('hasContext', () => {
    //     expect(Test.childContextTypes).toHaveProperty('outProp');
    // });
});
