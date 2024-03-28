import Button from '../../elements/Button';
import Input from '../../elements/Input';
import Label from '../../elements/Label';
// import { useNavigate } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';

const FormLogin = () => {
    //#region Ari test
    const handleLogin = (event) => {
        event.preventDefault();
        localStorage.setItem('email', event.target.email.value);
        localStorage.setItem('password', event.target.password.value);
        window.location.href = '/dashboard';
    };
    //#endregion
    return (
        <>
            <form
                className="space-y-6"
                action="#"
                method="POST"
                onSubmit={handleLogin}
            >
                <div>
                    <Label htmlFor="email">Email address</Label>
                    <div className="mt-2">
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                        />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <div className="text-sm">
                            <a
                                href="/forgot-password"
                                className="font-bold text-blue-600"
                            >
                                forgot password?
                            </a>
                        </div>
                    </div>
                    <div className="mt-2">
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                        />
                    </div>
                </div>

                <div>
                    <Button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => route('/dashboard')}
                    >
                        Sign in
                    </Button>
                </div>
            </form>
            <p className="mt-10 text-sm text-center text-gray-500">
                Not a member?{' '}
                <a
                    href="#"
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                    Start a 14 day free trial
                </a>
            </p>
        </>
    );
};

export default FormLogin;
