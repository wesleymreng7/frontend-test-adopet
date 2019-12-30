import React, { useState, useEffect } from 'react';
import { useAuthApi } from '../../api';
import { Redirect } from 'react-router-dom';
import FormLogin from './components/FormLogin';
import { Alert } from 'antd';


const Login: React.FunctionComponent = () => {
    const [logged, setLogged] = useState(false);
    const { dataRegister, sessionRegister } = useAuthApi();
    const login = async (dataInput: any) => {
        await sessionRegister({
            organization_user: dataInput
        });
    }
    useEffect(() => {
        if (!dataRegister.loading && dataRegister.data.data && dataRegister.data.data.access_key) {
            localStorage.setItem('registerToken', dataRegister.data.data.access_key)
            setLogged(true)
        }
    }, [dataRegister.data.data])
    const registerToken = localStorage.getItem('registerToken');
    if (registerToken) {
        return <Redirect to="/" />;
    }
    if (logged) {
        return <Redirect to="/" />;
    }
    return (
        <div className="form-login">
            <FormLogin login={login} />
            {dataRegister.error !== '' && 
                <Alert message={dataRegister.error} type="error" />
            }
        </div>
    );
}

export default Login;