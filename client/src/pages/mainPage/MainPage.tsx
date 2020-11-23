import React from 'react';
import { MainCarousel, AboutHanbok } from '../../components/index';

export const MainPage = () => {
    return (
        <div className="mainPage">
            <MainCarousel />
            <AboutHanbok />
        </div>
    )
}