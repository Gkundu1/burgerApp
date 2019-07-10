import axios from 'axios';

const instance =axios.create({
    baseURL:'https://react-burgerapp-13818.firebaseio.com/'
    //baseURL:'http://tms.anblicks.com/tms-qa-api/api/v1/'
});

instance.interceptors.request.use(request=>{
    request.headers.Authorization="Your token here";
    console.log('[axios-config] request is ',request);
    return request;
});

export default instance;