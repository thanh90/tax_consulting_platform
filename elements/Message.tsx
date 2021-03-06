import React from 'react';
import styled, { css } from 'styled-components';

type T = {
    isMine: boolean
}

const Container = styled.div<T>`
    display: flex;
    ${
        props => props.isMine ? 
        css`flex-direction: row-reverse`
        :
        css`flex-direction: row`
    }
`

const MessageContainer = styled.div<T>`
    border-radius: 32px;
    padding: 8px 16px;
    align-self: flex-start;
    max-width: 60%;

    ${
        props => props.isMine ? 
        css`background-color: #fff; border: solid 1px #C7C7C7;`
        :
        css`background-color: #B6CEFF; border: solid 1px #B6CEFF;`
    }
`

const TextTime = styled.span<T>`
    font-size: 12px;
    color: #888;
    align-self: flex-end;
    margin-bottom: 4px;

    ${
        props => props.isMine ? 
        css`margin-right: 12px;`
        :
        css`margin-left: 12px;`
    }
`

type Props = {
    text: string;
    time: string;
    isMine: boolean;
}

const Message: React.FC<Props> = ({text, time, isMine}) => {

    return(
        <Container isMine={isMine}>
            <MessageContainer isMine={isMine}>
                <div>{text}</div> 
            </MessageContainer>
            <TextTime isMine={isMine}>{time}</TextTime>
        </Container>
    )
}

export default Message;