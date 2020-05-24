// https://reactjsexample.com/a-collection-of-loading-spinners-with-react-js-2/
import React from 'react';
import {ImpulseSpinner} from "react-spinners-kit";
import {FlexRowCenter} from '../../style/commonStyle';

type PreloaderType = {
    size?: number
    backColor?: string
    frontColor?: string
    isLoading: boolean
}

const Preloader: React.FC<PreloaderType> = ({size, backColor, frontColor, isLoading}) => {

    return (
        <FlexRowCenter>
            <ImpulseSpinner size={size ? size : 30}
                            backColor={backColor ? backColor : '#fff'}
                            frontColor={frontColor ? frontColor : '#32cdff'}
                            loading={isLoading}/>
        </FlexRowCenter>
    )
}

export default Preloader;
