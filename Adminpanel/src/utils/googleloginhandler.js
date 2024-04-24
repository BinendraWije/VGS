// These lines make "require" available
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const {OAuth2Client} =require('google-auth-library'); 

require('dotenv').config();

async function googleLoginHandler(){

const redirectURL ='http://ec2-13-49-145-29.eu-north-1.compute.amazonaws.com:3306/oauth';

console.log(process.env.GOOGLE_CLIENT_ID);

const oAuth2Client = new OAuth2Client(
process.env.GOOGLE_CLIENT_ID,
process.env.GOOGLE_CLIENT_SECRET,
redirectURL 
);

const authorizeURL = oAuth2Client.generateAuthUrl({
    access_type:'offline',
    scope:'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
    prompt:'consent' 
})
console.log(authorizeURL);
return authorizeURL;

};

export default googleLoginHandler;