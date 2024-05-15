import { HomeIcon, UsersIcon, ComputerDesktopIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';


const navigation = [
    {
        name: 'HomePage',
        href: '/homepage',
        icon: HomeIcon,
    },
    {
        name: 'Manage User',
        href: '/manageuser',
        icon: UsersIcon,
    },
    {
        name: 'Manage Application',
        href: '/manageapp',
        icon: ComputerDesktopIcon,
    },
    {
        name: 'Log Activity',
        href: '/logactivity',
        icon: ClipboardDocumentListIcon,
    },
    
    // {
    //     name: 'Parent',
    //     icon: UserIcon,
    //     children: {
    //         name: "Children", href: "/children"
    //     }
    // },
];

const teams = [
    { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
    { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
    { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
];

const userNavigation = [
    { name: 'Account Settings', href: '#' },
    { name: 'Sign out', href: '#' },
];


export { navigation, teams, userNavigation };
