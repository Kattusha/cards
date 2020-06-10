import React from 'react';
import {Map, Placemark, YMaps} from 'react-yandex-maps'
import {MainContainer} from "../main/ui/style/bodyStyle";

const MapInfo: React.FC = () => {

    const mapData = {
        center: [55.751574, 37.573856],
        zoom: 5,
        controls: ['zoomControl', 'fullscreenControl']
    };

    const coordinates = [
        [55.684758, 37.738521],
        [57.684758, 39.738521]
    ];

    console.log('render TestMapPage');
    return (
        <MainContainer>
            <YMaps>
                {/*долго искал эту хрень)*/}
                {/*https://tech.yandex.com/maps/jsapi/doc/2.1/ref/reference/Map-docpage/#field_detail__events*/}
                {/*https://react-yandex-maps.now.sh/geo-objects/placemark*/}
                <Map defaultState={mapData} modules={['control.ZoomControl', 'control.FullscreenControl']} width={600} height={600} onClick={(e: any) => console.log(e.get('coords'))}>
                    {coordinates.map(coordinate => <Placemark geometry={coordinate}/>)}
                </Map>
            </YMaps>
        </MainContainer>
    );
}

export default MapInfo;
