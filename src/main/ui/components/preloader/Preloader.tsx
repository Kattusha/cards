import React from 'react';
import {ImpulseSpinner} from "react-spinners-kit";
import {FlexRowCenter} from '../../style/commonStyle';
// https://reactjsexample.com/a-collection-of-loading-spinners-with-react-js-2/

type PreloaderType = {
    backColor: string
    frontColor: string
    size: number
    isLoading: boolean
}

const Preloader: React.FC<PreloaderType> = ({size, backColor, frontColor, isLoading}) => {

    return (
        <FlexRowCenter>
            <ImpulseSpinner size={size} backColor={backColor} frontColor={frontColor} loading={isLoading}/>
        </FlexRowCenter>
    )
    // <RingSpinner size={size} color={color} loading={isLoading}/>
}

export default Preloader;
