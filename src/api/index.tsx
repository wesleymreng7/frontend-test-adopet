import Rest from '../utils/rest';

const baseUrl = 'https://test.adopets.app/v1/';
const { usePost } = Rest(baseUrl);

export const apiKey = '505763d6-4202-4b05-9efc-93b366939bcf';
export const useAuthApi = () => {
    const requestToken = localStorage.getItem('requestToken') || ''
    const [dataRequest, sessionRequest] = usePost('auth/session-request');
    const [dataRegister, sessionRegister] = usePost('auth/session-register', requestToken.toString());
    return {
        dataRequest,
        sessionRequest,
        dataRegister,
        sessionRegister
    };
}
export const usePetApi = () => {
    const registerToken = localStorage.getItem('registerToken') || ''
    const [dataPet, petSearch] = usePost('pet/search', registerToken.toString());
    return {
        dataPet,
        petSearch
    }
}
