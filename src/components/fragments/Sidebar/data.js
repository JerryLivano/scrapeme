import { ChartPieIcon, HomeIcon } from '@heroicons/react/24/outline';

const navigation = [
    {
        name: 'Dashboard',
        href: '/dashboard',
        icon: HomeIcon,
    },
    {
        name: 'Parent',
        href: '#',
        icon: ChartPieIcon,
        children: [
            { name: "ChildrenOne", href: "/parent/children" },
            { name: "ChildrenTwo", href: "/dashboard" },
            { name: "ChildrenThree", href: "#" },
            { name: "ChildrenFour", href: "/parent/children" },
        ],
    },
];

const teams = [
    { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
    { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
    { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
];

const userNavigation = [
    { name: 'Your profile', href: '#' },
    { name: 'Sign out', href: '#' },
];

export { navigation, teams, userNavigation };
