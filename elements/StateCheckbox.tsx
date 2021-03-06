import React from 'react';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer'
})

const StateShort = styled('span')({
    fontWeight: 'bold'
})

const StateLong = styled('span')({
    marginLeft: 8,
    whiteSpace: 'nowrap'
})

type Props = {
    code: string;
    name: string;
    checked?: boolean;
    onClick?: () => void
}

const StateCheckbox: React.FC<Props> = ({code, name, checked=false, onClick}) => {
    return (
        <Container onClick={onClick}>
            <Checkbox checked={checked}/>
            <StateShort>{code}</StateShort>
            <StateLong>{name}</StateLong>
        </Container>
    )
}

export default StateCheckbox;