import FormAuthTitle from "../../components/common/AuthPage/FormAuthTitle";
import ImageContent from "../../components/common/AuthPage/ImageContent";
import FormRegister from "../../components/common/AuthPage/Form/FormRegister";

export default function RegisterPage() {
    return (
        <div className='grid h-screen w-full grid-cols-1 sm:grid-cols-2'>
            <ImageContent />
            <div className='justify-center'>
                <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                    <FormAuthTitle
                        title='Register'
                        subtitle='Please register to create Scrape-ME account'
                    />
                    <FormRegister />
                </div>
            </div>
        </div>
    );
}
