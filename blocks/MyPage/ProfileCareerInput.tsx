import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CancelIcon from '@mui/icons-material/Cancel';
import { findIndex, isEmpty, map, range, size } from 'lodash';

import CareerAddDialog from '../../dialogs/expert/CareerAddDialog';
import Career from '../../models/Career';

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column'
})

const Horizontal = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
})

const CareerBox = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
    border: 'solid 1px #C7C7C7',
    borderRadius: 4,
    height: 50
})

type Props = {
    onChange: (param: Career[]) => void,
    data?: Career[]
}

const ProfileCareerInput: React.FC<Props> = ({data, onChange}) => {

    const [ init, setInit ] = useState(true);
    const [ inputCount, setInputCount ] = useState(1);
    const [ showInputDialog, setShowInputDialog ] = useState(-1);
    const [ careers, setCareers ] = useState<Career[]>([]);

    useEffect(() => {
        if(data){
            const initCareers = map(data, c => new Career(c));
            setCareers(initCareers);
        }
    }, [data]);
    
    useEffect(() => {
        !init && onChange(careers);
    }, [careers]);

    const getCareer = (index: number) => {
        if(isEmpty(careers)){
            return;
        }
        const career = careers[index];
        // console.log(career);
        return career.company + ', ' + career.position + ', ' + career.duration;
    }

    const deleteCareer = (index: number, e: MouseEvent) => {
        e.stopPropagation();

        init && setInit(false);
        
        careers.splice(index, 1);
        setCareers([...careers]);
    }

    const checkEmptyInput = () => {
        return inputCount > size(careers) || isEmpty(careers) || findIndex(careers, isEmpty) >= 0;
    }

    return (
        <Container>
            <Horizontal>
                <span>Career</span>
                <IconButton
                    style={{marginRight: -10}}
                    disabled={checkEmptyInput()}
                    onClick={() => setInputCount(inputCount + 1)}
                >
                    <AddBoxIcon sx={{color: '#0045D1'}} />
                </IconButton>
            </Horizontal>
            {
                map(
                    range(0, inputCount), 
                    index => (
                        <CareerBox style={{marginTop: index > 0 ? 8 : 0}} onClick={() => setShowInputDialog(index)}>
                            {
                                !isEmpty(careers[index]) &&
                                <IconButton
                                    onClick={(e: any) => deleteCareer(index, e)}
                                >
                                    <CancelIcon sx={{color: '#686868'}}/>
                                </IconButton>
                            }
                            <span style={{marginLeft: 8}}>{getCareer(index)}</span>
                        </CareerBox>
                    )
                )
            }
            <CareerAddDialog
                open={showInputDialog>=0}
                onClose={() => setShowInputDialog(-1)}
                onSave={(career: Career) => {
                    init && setInit(false);

                    careers[showInputDialog] = career;
                    setCareers([...careers]);

                    setShowInputDialog(-1);
                }}
                data={careers[showInputDialog]}
            />
        </Container>
    )
}

export default ProfileCareerInput;