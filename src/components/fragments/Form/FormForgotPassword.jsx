// import Button from '../../elements/Button';
// import Input from '../../elements/Input';
// import Label from '../../elements/Label';

import Input from '../../elements/Input';
import Label from '../../elements/Label';

const FormForgotPassword = () => {
    return (
        <>
            <form className="space-y-6" action="#" method="POST">
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
                                href="#"
                                className="font-semibold text-indigo-600 hover:text-indigo-500"
                            ></a>
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
                        // bgColor="bg-rose-600"
                        // className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Sign in
                    </Button>
                </div>
            </form>
            <p className="mt-10 text-sm text-center text-gray-500">
                <a
                    href="/login"
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                    Login
                </a>
            </p>
        </>
    );
};

export default FormForgotPassword;
