import React from 'react';
import { useHistory } from 'react-router-dom';

export const UserManagement = () => {
    const history = useHistory();
    const handleBack = (e: React.MouseEvent) => {
        e.preventDefault();
        history.push('/admin')
    }
    return (
        <div className="userManagementPage">
            <button onClick={handleBack}>Back</button>
            유저 매니지먼트
        </div>
    )
}