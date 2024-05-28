import { HomeIcon, UsersIcon, ComputerDesktopIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';


const navigation = [
    {
        name: 'Home Page',
        href: '/home',
        icon: HomeIcon,
    },
    {
        name: 'Manage User',
        href: '/user',
        icon: UsersIcon,
    },
    {
        name: 'Manage Application',
        href: '/manage-application',
        icon: ComputerDesktopIcon,
    },
    {
        name: 'Log Activity',
        href: '/log-activity',
        icon: ClipboardDocumentListIcon,
    },
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
