import { mobileAuthentication } from "../../../utils/mobileAuthentication"

export const submitLogin  = (formFields,endLoading) =>{
        mobileAuthentication(formFields.phone,endLoading)
}