import { useLocation, Link } from "react-router-dom";

export default function Breadcrumbs() {
    const location = useLocation();
    let pages = [];
    const pathnames = location.pathname
        .split("/")
        .filter((x) => {
            if (x.length < 15) return x;
        })
        .map((x) => {
            if (x.includes("-")) {
                return x
                    .split("-")
                    .map((y) => {
                        return y.charAt(0).toUpperCase() + y.slice(1);
                    })
                    .join(" ");
            } else return x;
        });
    if (pathnames[0] !== "dashboard") {
        pages = pathnames.map((_, index) => {
            const url = `/${pathnames.slice(index, index + 1).join("/")}`;
            return {
                name: url.charAt(1).toUpperCase() + url.slice(2),
                href: url,
                current: index === pathnames.length - 1,
            };
        });
    }

    return (
        <nav className='flex' aria-label='Breadcrumb'>
            <ol role='list' className='flex items-center space-x-4'>
                <li>
                    <div>
                        <Link
                            to='dashboard'
                            className={`text-sm font-medium hover:text-black ${
                                pathnames[0] == "dashboard"
                                    ? "text-black"
                                    : "text-[#A1A5B7]"
                            }`}
                        >
                            Dashboard
                        </Link>
                    </div>
                </li>
                {pages.map((page) => (
                    <li key={page.name}>
                        <div className='flex items-center'>
                            <svg
                                width='5'
                                height='5'
                                viewBox='0 0 4 4'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <rect
                                    width='4'
                                    height='4'
                                    rx='2'
                                    fill='#A1A5B7'
                                />
                            </svg>
                            <Link
                                to={page.href}
                                className={`ml-4 text-sm font-medium hover:text-black ${
                                    page.current
                                        ? "text-black"
                                        : "text-[#A1A5B7]"
                                }`}
                                aria-current={page.current ? "page" : undefined}
                            >
                                {page.name}
                            </Link>
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
