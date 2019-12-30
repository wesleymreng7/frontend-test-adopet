import React,{ useState} from 'react';
import { Input, Button, Form, Icon } from 'antd';

interface LoginProps {
    login: any;
};

const FormLogin: React.FunctionComponent<LoginProps> = (props: LoginProps) => {
    const [dataInput, setDataInput] = useState({
        email: '',
        password: ''
    });
    const handleChange = (input: string) => (e: any) => {
        setDataInput({
            ...dataInput,
            [input]: e.target.value
        });
    };
    const signin = () => {
        props.login(dataInput);
    }
    return (
        <Form className="login-form" >
            <Form.Item>
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" placeholder="Email" onChange={handleChange('email')} />
            </Form.Item>
            <Form.Item>
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onChange={handleChange('password')} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" className="login-form-button" onClick={signin}>Login</Button>
            </Form.Item>
        </Form>
    );
}
export default FormLogin;