/*
 * @Author: wzi
 * @Date: 2018-01-30 15:53:16
 * @Last Modified by: wzi
 * @Last Modified time: 2018-12-05 16:31:19
 */
import React from 'react';
import emptyEnhancer from '@common/HOC/Empty';
import { compose } from '@common/helper/compose';
import { mount } from 'enzyme';
const Test: React.SFC<any> = () => {
    return <div>成功才会显示</div>;
};

describe('EmptyHOC', () => {

    test('默认处理', () => {
        const Enhancer = compose(emptyEnhancer(({ condition }) => condition))(
            Test
        );
        const wrapper = mount(<Enhancer condition={true} />);
        expect(wrapper.contains('成功才会显示')).toBeFalsy();
        wrapper.setProps({ condition: false });
        expect(wrapper.contains('成功才会显示')).toBeTruthy();
    });
    test('指定失败处理器', () => {
        const Fail = () => <div>失败才会显示</div>;
        const Enhancer = compose(
            emptyEnhancer(({ condition }) => condition, Fail)
        )(Test);
        const wrapper = mount(<Enhancer condition={true} />);
        expect(wrapper.contains(<Fail />)).toBeFalsy();
        wrapper.setProps({ condition: false });
        expect(wrapper.contains('成功才会显示')).toBeTruthy();
    });
});
