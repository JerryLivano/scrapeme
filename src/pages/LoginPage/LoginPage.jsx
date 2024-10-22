import FormAuthTitle from "../../components/common/AuthPage/FormAuthTitle";
import FormLogin from "../../components/common/AuthPage/Form/FormLogin";
import ImageContent from "../../components/common/AuthPage/ImageContent";

export default function LoginPage() {
    return (
        <div className='grid h-screen w-full grid-cols-1 sm:grid-cols-2'>
            <ImageContent />
            <div className='justify-center'>
                <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                    <FormAuthTitle
                        title='Login'
                        subtitle='Please login to start using Scrape-ME'
                    />
                    <FormLogin />
                </div>
            </div>
        </div>
    );
}
