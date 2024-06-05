import { useEffect, useMemo, useState } from "react";
import uuid from "react-uuid";
import DataTable from "../../components/layouts/DataTable";
import { useGetUserQuery } from "../../services/userApiSlice";
import Spinner from "../../components/elements/Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { useGetRoleQuery } from "../../services/roleApi.Slice";
import ButtonIconAction from "../../components/elements/Button/ButtonIconAction";
import InputCheckbox from "../../components/elements/Input/InputCheckbox";
import { useGetApplicationQuery } from "../../services/applicationApiSlice";
import { Button } from "../../components/index";
import FormModalEditUser from "./EditUser/FormModalEditUser";

export default function UserTable() {
    let content;
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPage, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");

    const [roleOpt, setRoleOpt] = useState([]);
    const [appOpt, setAppOpt] = useState([]);
    const [appIdOpt, setAppIdOpt] = useState([]);
    const [dataAuthApp, setDataAuthApp] = useState([]);

    const [showEditUser, setShowEditUser] = useState(false);
    const [selectedUser, setSelectedUser] = useState("");

    const cols = useMemo(
        () => [
            {
                id: uuid(),
                header: "",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.no || "",
            },
            {
                id: uuid(),
                header: "Name",
                isBlack: true,
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.name || "",
            },
            {
                id: uuid(),
                header: "Email",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.email || "",
            },
            {
                id: uuid(),
                header: "NIK",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.nik || "",
            },
            {
                id: uuid(),
                header: "Role",
                cell: (row) => row.renderValue(),
                accessorFn: (row) =>
                    row.role.charAt(5).toUpperCase() +
                        row.role.slice(6).toLowerCase() || "",
            },
            {
                id: uuid(),
                header: "Recruit-ME",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => {
                    return (
                        <InputCheckbox
                            value={"Recruit-ME"}
                            app={row.authorizedApplications.map(
                                (app) => app.name
                            )}
                        />
                    );
                },
            },
            {
                id: uuid(),
                header: "CV-ME",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => {
                    return (
                        <InputCheckbox
                            value={"CV-ME"}
                            app={row.authorizedApplications.map(
                                (app) => app.name
                            )}
                        />
                    );
                },
            },
            {
                id: uuid(),
                header: "Test-ME",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => {
                    return (
                        <InputCheckbox
                            value={"Test-ME"}
                            app={row.authorizedApplications.map(
                                (app) => app.name
                            )}
                        />
                    );
                },
            },
            {
                id: uuid(),
                header: "Pick-ME",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => {
                    return (
                        <InputCheckbox
                            value={"Pick-ME"}
                            app={row.authorizedApplications.map(
                                (app) => app.name
                            )}
                        />
                    );
                },
            },
            {
                id: uuid(),
                header: "Team-ME",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => {
                    return (
                        <InputCheckbox
                            value={"Team-ME"}
                            app={row.authorizedApplications.map(
                                (app) => app.name
                            )}
                        />
                    );
                },
            },
            {
                id: uuid(),
                header: "BRM",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => {
                    return (
                        <InputCheckbox
                            value={"BRM"}
                            app={row.authorizedApplications.map(
                                (app) => app.name
                            )}
                        />
                    );
                },
            },
            {
                id: uuid(),
                header: "Metrodata Academy",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => {
                    return (
                        <InputCheckbox
                            value={"Metrodata Academy"}
                            app={row.authorizedApplications.map(
                                (app) => app.name
                            )}
                        />
                    );
                },
            },
            {
                id: uuid(),
                header: "Action",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => (
                    <div className='w-full'>
                        <Button
                            text={"Edit"}
                            type={"button"}
                            className={"w-24"}
                            onClick={() => {
                                setShowEditUser(true);
                                setSelectedUser(row);
                            }}
                        />
                    </div>
                ),
            },
        ],
        []
    );

    const navigate = useNavigate();

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error,
        isFetching,
    } = useGetUserQuery(
        {
            apps: appIdOpt,
            page: page,
            limit: pageSize,
            search: search,
            role:
                roleOpt.length === 1
                    ? roleOpt[0][0]
                    : roleOpt.length === 0
                    ? ""
                    : null,
        },
        { refetchOnMountOrArgChange: true }
    );

    useEffect(() => {
        if (isSuccess && users) {
            setTotalPages(users.pagination.totalPages);
            setDataAuthApp(
                users.data.map((user) => ({
                    accountId: user.accountId,
                    authApp: user.authorizedApplications,
                }))
            );
        }
    }, [isSuccess, users]);

    const handlePageChange = (newPageNumber) => {
        setPage(newPageNumber);
    };

    const handleDeleteFilteredApp = (selectedAppId) => {
        setAppOpt(appOpt.filter((app) => app[0] !== selectedAppId));
    };

    const handleAppSelect = (selectedApp) => {
        if (appOpt.find((app) => app[0] === selectedApp[0])) {
            handleDeleteFilteredApp(selectedApp[0]);
        } else {
            setAppOpt([...appOpt, selectedApp]);
        }
    };

    const {
        data: applications,
        isLoading: applicationIsLoading,
        isError: applicationIsError,
    } = useGetApplicationQuery({ page: 1, limit: 100 });

    let filterAppOptions = [];

    if (!applicationIsLoading && !applicationIsError && applications.data) {
        filterAppOptions = applications.data.map((app) => ({
            id: app.id,
            name: app.name,
        }));
    }

    useEffect(() => {
        setAppIdOpt(appOpt.map((app) => app[0]));
    }, [appOpt]);

    const handleDeleteFilteredRole = (selectedRoleId) => {
        setRoleOpt(roleOpt.filter((role) => role[0] !== selectedRoleId));
    };

    const handleRoleSelect = (selectedRole) => {
        if (roleOpt.find((role) => role[0] === selectedRole[0])) {
            handleDeleteFilteredRole(selectedRole[0]);
        } else {
            setRoleOpt([...roleOpt, selectedRole]);
        }
    };

    const {
        data: roles,
        isLoading: rolesIsLoading,
        isSuccess: roleIsSuccess,
        isError: rolesIsError,
        isFetching: roleIsFetching,
    } = useGetRoleQuery();

    let filterRoleOptions = [];

    if (!rolesIsLoading && !rolesIsError && roles.data) {
        filterRoleOptions = roles.data.map((role) => ({
            id: role.roleName,
            name:
                role.roleName.charAt(5).toUpperCase() +
                role.roleName.slice(6).toLowerCase(),
        }));
    }

    const handleSearchChange = (value) => {
        setSearch((prev) => {
            if (value !== prev) setPage(1);
            return value.toString();
        });
    };

    if (isLoading || isFetching || rolesIsLoading || roleIsFetching)
        content = <Spinner />;
    if (isError) {
        if ("status" in error) {
            content = (
                <div className='py-5 text-center text-xl font-semibold text-brm-font-black'>
                    Data Not Found
                </div>
            );
        }
    }

    if (isSuccess && roleIsSuccess) {
        const { data, pagination } = users;
        const dataCount = pagination.totalRecords;
        content = (
            <>
                <DataTable
                    rowCount={dataCount}
                    data={data}
                    columns={cols}
                    showPageSize
                    showGlobalFilter
                    showPagination
                    showAddButton
                    searchQuery={search}
                    searchHandler={handleSearchChange}
                    placeholder={"Search employee name..."}
                    onClickAdd={() => navigate("add-user")}
                    title={"Add User"}
                    pageIndex={pagination.currentPage}
                    pageCount={totalPage}
                    pageSize={pageSize}
                    pageChange={(pageIndex) => handlePageChange(pageIndex + 1)}
                    setPageSize={setPageSize}
                    showFilterRole={true}
                    filterRole={roleOpt}
                    setFilterRole={(role) => handleRoleSelect(role)}
                    filterRoleOptions={filterRoleOptions}
                    showFilterApp={true}
                    setFilterApp={(app) => handleAppSelect(app)}
                    filterApp={appOpt}
                    filterAppOptions={filterAppOptions}
                    handleDeleteFilteredApp={(app) =>
                        handleDeleteFilteredApp(app)
                    }
                    handleDeleteFilteredRole={(role) =>
                        handleDeleteFilteredRole(role)
                    }
                />

                <FormModalEditUser
                    open={showEditUser}
                    setOpen={setShowEditUser}
                    user={selectedUser}
                    roles={roles.data}
                    applications={applications.data}
                />
            </>
        );
    }
    return content;
}
