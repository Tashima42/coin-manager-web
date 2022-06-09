import  {FC, useState} from 'react';
import './profile.scss'
import {useAppSelector} from "../../hooks";

const Profile: FC = () => {
    const {user} = useAppSelector(state => state.auth)

    return (
        <div className={'profileWrapper'}>
            <div className={'profile'}>
                <h1>Welcome, {user.name}</h1>
                <div className={'profileInfo'}>
                    <div className={'profileLeft'}>
                    </div>
                    <div className={'profileRight'}>
                        <h3>Information</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
