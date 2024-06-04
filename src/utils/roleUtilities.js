export const Role = {
    ADMIN: "ROLE_ADMIN",
    EMPLOYEE: "ROLE_EMPLOYEE"
}

export const RoleNames = [
    {
        role: Role.ADMIN,
        name: "ROLE_ADMIN"
    },
    {
        role: Role.EMPLOYEE,
        name: "ROLE_EMPLOYEE"
    }
];

export const Permission = {
    Home: [Role.ADMIN, Role.EMPLOYEE],
    User: [Role.ADMIN],
    Application: [Role.ADMIN],
    LogActivity: [Role.ADMIN, Role.EMPLOYEE]
};