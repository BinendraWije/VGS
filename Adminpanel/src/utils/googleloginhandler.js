import React from "react";
import { OAuth2Client } from "google-auth-library";


async function googleLoginHandler(){

const redirectURL ='http://ec2-13-49-145-29.eu-north-1.compute.amazonaws.com:3306/oauth';

console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);

const oAuth2Client = new OAuth2Client(
process.env.REACT_APP_GOOGLE_CLIENT_ID,
process.env.REACT_APP_GOOGLE_CLIENT_SECRET,
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