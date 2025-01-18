export const Role = {
    ADMIN: "ROLE_ADMIN",
    USER: "ROLE_USER"
}

export const RoleNames = [
    {
        role: Role.ADMIN,
        name: "Admin"
    },
    {
        role: Role.USER,
        name: "User"
    }
];

export const Permission = {
    Dashboard: [Role.ADMIN, Role.USER],
    Scrape: [Role.ADMIN, Role.USER],
    Template: [Role.ADMIN],
    Favorite: [Role.ADMIN, Role.USER],
    History: [Role.ADMIN, Role.USER],
    Analysis: [Role.ADMIN, Role.USER],
    Site: [Role.ADMIN],
    Request: [Role.ADMIN, Role.USER],
    Category: [Role.ADMIN],
    Account: [Role.ADMIN],
}