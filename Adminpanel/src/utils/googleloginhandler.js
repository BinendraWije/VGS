async function googleLoginHandler(){

const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

const redirectURL ='http://ec2-13-49-145-29.eu-north-1.compute.amazonaws.com:3306/oauth';


const options = {
client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
redirect_uri:redirectURL,
access_type: 'offline',
response_type: 'code',
prompt: 'consent',
scope:'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid'
};


const qs = new URLSearchParams(options);

console.log(qs.toString());
console.log(`${rootUrl}?${qs.toString()}`);
location.href = `${rootUrl}?${qs.toString()}`;
};

export default googleLoginHandler;