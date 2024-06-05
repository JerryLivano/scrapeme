import { LogoMAFooter } from "../../../assets/imageList";

const Footer = () => {
    return (
        <footer>
            <div className='mx-auto mb-8 max-w-7xl overflow-hidden px-6 sm:pt-3 lg:px-8'>
                <p className='text-center text-sm leading-4 text-[#7E8299]'>
                    <img
                        className='mr-2 inline-block w-auto'
                        src={LogoMAFooter}
                        alt='Logo BRM Footer'
                    />
                    Copyright &copy; 2024.
                    <span className='ml-1 font-medium'>
                        <a
                            href='https://www.metrodataacademy.id/'
                            target='_blank'
                            className='hover:text-brm-card-blue'
                            rel='noreferrer'
                        >
                            Metrodata Academy
                        </a>{" "}
                        - All Right Reserved
                    </span>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
