import React from 'react';
import { SignupCard } from 'ui';

export const Signup:React.FC = () => {
    return (
        <div style={{
            position: "relative",
            width: "100vw",
            height: "100vh",
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{
                position: "absolute",
                top: 10,
            }}>
            <SignupCard />
            </div>
        </div>
    )
}