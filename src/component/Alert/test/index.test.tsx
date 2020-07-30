/*
 * @Author: wzi
 * @Date: 2018-01-31 16:40:02
 * @Last Modified by: wzi
 * @Last Modified time: 2019-01-08 17:04:07
 */
import Alert from '@components/Alert';

jest.useFakeTimers();
describe('Alert', () => {
    test('默认参数', () => {
        Alert.show({ title: '测试', content: '测试内容' });
        const target = document.querySelector('.alert-container');

        expect(target.childElementCount).toBe(1);
        jest.advanceTimersByTime(2000);
        expect(target.childElementCount).toBe(0);
    });
    test('duration', () => {
        Alert.show({ title: '测试', duration: 10 });
        const target = document.querySelector('.alert-container');
        jest.advanceTimersByTime(2000);
        expect(target.childElementCount).toBe(1);
        jest.advanceTimersByTime(8000);
        expect(target.childElementCount).toBe(0);
    });
});
