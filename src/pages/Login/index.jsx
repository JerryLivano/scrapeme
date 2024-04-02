import { FormLogin } from "../../components/fragments";
import AuthLayouts from "../../components/layouts/AuthLayouts";

export default function Login() {
    return (
        <>
            <AuthLayouts title='Sign in to your account'>
                <FormLogin />
            </AuthLayouts>
        </>
    );
}
