/*
 * @Author: wzi
 * @Date: 2019-01-08 15:41:43
 * @Last Modified by: wzi
 * @Last Modified time: 2019-01-08 17:00:14
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {
    Wrapper,
    ContextWrapper,
    ContentWrapper,
    Title,
    Detail,
} from './style';
let alertContainer = null;

const getContainer = () => {
    if (!alertContainer) {
        // 插入节点
        const container = document.createElement('div');
        container.setAttribute('class', 'alert-container');
        document.querySelector('body').appendChild(container);
        alertContainer = container;
    }
    return alertContainer;
};

type AlertProp = {
    title?: string;
    content?: string | JSX.Element;
    duration?: number;
    mask?: boolean;
    alert?: any
};
const Context = (props: AlertProp) => (
    <ContextWrapper>
        <ContentWrapper>
            {props.title ? <Title>{props.title}</Title> : null}
            {props.content ? <Detail>{props.content}</Detail> : null}
        </ContentWrapper>
    </ContextWrapper>
);

const Alerts = (props: AlertProp) => {
    return (
        <Wrapper>
            <Context {...props} />
        </Wrapper>
    );
};

export default class Alert {
    static show(props: AlertProp) {
        const container = getContainer();
        ReactDOM.render(<Alerts {...props} />, container);

        setTimeout(() => {
            ReactDOM.unmountComponentAtNode(container);
            props.alert && props.alert()
        }, (props.duration || 2) * 1000);
    }
}
