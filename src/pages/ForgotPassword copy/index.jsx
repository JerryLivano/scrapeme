import { FormForgotPassword } from "../../components/fragments";
import AuthLayouts from "../../components/layouts/AuthLayout";

const ForgotPassword = () => {
    return (
        <>
            <AuthLayouts title='Forgot Password'>
                <FormForgotPassword />
            </AuthLayouts>
        </>
    );
};

export default ForgotPassword;
