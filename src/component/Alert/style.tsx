/*
 * @Author: wzi
 * @Date: 2018-10-01 10:23:08
 * @Last Modified by: wzi
 * @Last Modified time: 2019-01-08 16:39:04
 */

import styled from '../../common/helper/styled-component';

type WrapperProps = {
    mask: boolean;
};
export const Wrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background: ${(props: WrapperProps) => (props.mask ? '#988d8d' : null)};
    display: flex;
    align-items: center;
`;
export const ContextWrapper = styled.div`
    width: 100%;
    text-align: center;
`;
export const ContentWrapper = styled.span`
    border-radius: 10px;
    color: #fff;
    background-color: rgba(58, 58, 58, 0.9);
    display: inline-block;
    padding: 20px;
`;
export const Title = styled.div``;
export const Detail = styled.div``;
