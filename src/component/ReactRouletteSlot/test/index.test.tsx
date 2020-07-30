/*
 * @Author: wzi
 * @Date: 2018-01-31 16:40:02
 * @Last Modified by: wzi
 * @Last Modified time: 2019-01-08 16:53:04
 */
import React from 'react';
import { ReactRouletteSlot } from '@components/ReactRouletteSlot';
import DefaultReactRouletteSlot from '@components/ReactRouletteSlot';

import { mount } from 'enzyme';
import 'jest-styled-components';
import toJson from 'enzyme-to-json';
const data = [
    { id: 1000, img: 'http://dummyimage.com/30x30', label: 'Larry' },
    { id: 1001, img: 'http://dummyimage.com/30x30', label: 'Joseph' },
    { id: 1003, img: 'http://dummyimage.com/30x30', label: 'Paul' },
    { id: 1004, img: 'http://dummyimage.com/30x30', label: 'Ronald' },
    { id: 1005, img: 'http://dummyimage.com/30x30', label: 'Helen' },
    { id: 1006, img: 'http://dummyimage.com/30x30', label: 'Maria' },
    { id: 1007, img: 'http://dummyimage.com/30x30', label: 'Mark' },
    { id: 1008, img: 'http://dummyimage.com/30x30', label: 'Mark' },
    { id: 1009, img: 'http://dummyimage.com/30x30', label: 'Carol' },
    { id: 1010, img: 'http://dummyimage.com/30x30', label: 'Ronald' },
    { id: 1011, img: 'http://dummyimage.com/30x30', label: 'Nancy' },
    { id: 1012, img: 'http://dummyimage.com/30x30', label: 'Michelle' },
];
jest.useFakeTimers();

describe('Loading', () => {
    let _wrapper, _instance, _unMount, _mount;
    beforeAll(() => {
        _unMount = jest.spyOn(
            ReactRouletteSlot.prototype,
            'componentWillUnmount'
        );
        _mount = jest.spyOn(ReactRouletteSlot.prototype, 'componentWillMount');
        const action = (cb) => {
            cb({ data: 1011 });
        };

        _wrapper = mount(
            <ReactRouletteSlot
                data={data}
                action={action}
                width={300}
                height={300}
            />
        );
        _instance = _wrapper.instance();
        jest.spyOn(_instance, 'onFetch');
        jest.spyOn(_instance, 'onResultReturn');
        jest.spyOn(_instance, 'onSuccess');
        jest.spyOn(_instance, 'onFail');
        jest.spyOn(_instance, 'reset');
    });
    test('整体', () => {
        expect(toJson(_wrapper)).toMatchSnapshot();
        expect(_mount).toHaveBeenCalledTimes(1);
    });
    test('点击抽奖', () => {
        _instance.onClick();
        expect(_instance.onFetch).toBeCalled();
    });
    test('数据返回', () => {
        jest.advanceTimersByTime(20000);
        expect(_instance.onResultReturn).toBeCalled();
        expect(_instance.endRound).toBe(2);
        expect(_instance.onSuccess).toBeCalled();
        expect(_instance.onFail).not.toBeCalled();
    });
    test('没有结果', () => {
        const action = jest.fn((cb) => {
            cb({ data: 1000111 });
        });
        _wrapper.setProps({ action });
        _instance.onClick();
        _instance.onClick();
        jest.advanceTimersByTime(20000);
        expect(_instance.endRound).toBe(0);
        expect(action).toBeCalled();
        expect(_instance.onFail).toBeCalled();
    });
    test('reset', () => {
        _instance.reset();
        expect(_instance.state.run).toBeFalsy();
    });
    test('unMount', () => {
        _wrapper.unmount();
        expect(_unMount).toBeCalled();
        expect(_instance.timer).toBe(null);
    });
    test('DefaultReactRouletteSlot data 为空数组[]', () => {
        const wrapper = mount(
            <DefaultReactRouletteSlot
                action={(cb) => cb({ data: 1000111 })}
                width={300}
                height={300}
                data={[]}
            />
        );
        expect(wrapper).not.toContain(ReactRouletteSlot);
        expect(_mount).toHaveBeenCalledTimes(1);
    });
    test('DefaultReactRouletteSlot data 为奇数个数数组', () => {
        const wrapper = mount(
            <DefaultReactRouletteSlot
                action={(cb) => cb({ data: 1000111 })}
                width={300}
                height={300}
                data={[
                    {
                        id: 1000,
                        img: 'http://dummyimage.com/30x30',
                        label: 'Larry',
                    },
                ]}
            />
        );
        expect(wrapper).not.toContain(ReactRouletteSlot);
    });
});
