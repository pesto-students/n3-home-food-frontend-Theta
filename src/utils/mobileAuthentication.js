import firebase from "./firebase";
import { message } from 'antd';



export const mobileAuthentication = async (numberPhone,endLoading,otpCode) =>{
    Window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        size: "invisible"
    });
    let number = `+91 ${numberPhone}`
    firebase.auth().signInWithPhoneNumber(number,Window.recaptchaVerifier).then((e)=>{
        message.success('OTP sent please enter otp to verify');
        endLoading()
        let code =  otpCode().then((otp)=>{
            console.log(otp)
        })
         if(code === null) return
         e.confirm(code).then((result)=>{
            window.location.href = '/admin/dashboard'
             message.success('verified');
         })
    }).catch((e)=>{
        console.log(e)
          message.error('something went wrong');
    })
}

