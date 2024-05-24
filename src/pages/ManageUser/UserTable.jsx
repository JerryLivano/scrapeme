import { useEffect, useMemo, useState } from "react";
import uuid from "react-uuid";
import DataTable from "../../components/layouts/DataTable";
import { useGetUserQuery } from "../../services/userApiSlice";
import Spinner from "../../components/elements/Spinner/Spinner";
import { CheckIcon, EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useGetRoleQuery } from "../../services/roleApi.Slice";
import ButtonIconAction from "../../components/elements/Button/ButtonIconAction";
import InputCheckbox from "../../components/elements/Input/InputCheckbox";
import { useGetApplicationQuery } from "../../services/applicationApiSlice";

export default function UserTable() {
    let content;
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPage, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");

    const [roleOpt, setRoleOpt] = useState([]);
    const [appOpt, setAppOpt] = useState([]);
    const [appIdOpt, setAppIdOpt] = useState([]);

    const [isClicked, setIsClicked] = useState(false);
    const [isChecked, setIsChecked] = useState(true);

    const [dataAuthApp, setDataAuthApp] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [accId, setAccId] = useState([]);

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };

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
                            dataApp={row.authorizedApplications.map((app) => ({
                                name: app.name,
                            }))}
                            isModified={accId.some(
                                (accId) => accId === row.accountId
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
                            dataApp={row.authorizedApplications.map((app) => ({
                                name: app.name,
                            }))}
                            isModified={accId.some(
                                (accId) => accId === row.accountId
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
                            dataApp={row.authorizedApplications.map((app) => ({
                                name: app.name,
                            }))}
                            isModified={accId.some(
                                (accId) => accId === row.accountId
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
                            dataApp={row.authorizedApplications.map((app) => ({
                                name: app.name,
                            }))}
                            isModified={accId.some(
                                (accId) => accId === row.accountId
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
                            dataApp={row.authorizedApplications.map((app) => ({
                                name: app.name,
                            }))}
                            isModified={accId.some(
                                (accId) => accId === row.accountId
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
                            dataApp={row.authorizedApplications.map((app) => ({
                                name: app.name,
                            }))}
                            isModified={accId.some(
                                (accId) => accId === row.accountId
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
                            dataApp={row.authorizedApplications.map((app) => ({
                                name: app.name,
                            }))}
                            isModified={accId.some(
                                (accId) => accId === row.accountId
                            )}
                        />
                    );
                },
            },
            {
                id: uuid(),
                header: "Modify Access",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => {
                    const [modifyAccess, setModifyAccess] = useState(false);

                    useEffect(() => {
                        if (accId.some((accId) => accId === row.accountId)) {
                            setAccId(
                                accId.filter((accId) => accId !== row.accountId)
                            );
                        } else {
                            setAccId([...accId, row.accountId]);
                        }
                    }, [accId]);

                    return (
                        <div className='flex justify-center'>
                            <ButtonIconAction
                                modifyAccess={modifyAccess}
                                setModifyAccess={setModifyAccess}
                            />
                        </div>
                    );
                },
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
            role: roleOpt,
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

    const handleDeleteFilteredRole = (selectedRole) => {
        setRoleOpt(roleOpt.filter((role) => role[0]!== selectedRole));
      }

    const handleAppSelect = (selectedApp) => {
        if (appOpt.find((app) => app[0] === selectedApp[0])) {
            handleDeleteFilteredApp(selectedApp[0]);
        } else {
            setAppOpt([...appOpt, selectedApp]);
        }
    };
    
    const handleRoleSelect = (selectedRole) => {
        if (roleOpt.find((role) => role[0] === selectedRole[0])) {
            handleDeleteFilteredRole(selectedRole[0]);
        } else {
            setRoleOpt([...roleOpt, selectedRole]);
        }
    };


    //  const handleRoleSelect = (e) => {
    //     setRoleOpt(e.target.value);
    //     setPage(1);
    // };

    

    const {
        data: applications,
        isLoading: applicationIsLoading,
        isError: applicationIsError,
    } = useGetApplicationQuery({ page: page, limit: 100 });

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

    // console.log(appOpt);
    // console.log(appIdOpt);

    // const handleRoleSelect = (e) => {
    //     setRoleOpt(e.target.value);
    //     setPage(1);
    // };


    const {
        data: roles,
        isLoading: rolesIsLoading,
        isError: rolesIsError,
    } = useGetRoleQuery();


    let filterRoleOptions = [];

    if (!rolesIsLoading && !rolesIsError && roles.data) {
        filterRoleOptions = roles.data.map((role) => ({
            value: role.roleName,
            label:
                role.roleName.charAt(5).toUpperCase() +
                role.roleName.slice(6).toLowerCase(),
        }));
        filterRoleOptions.unshift({ label: "All", value: "" });
    }

    const handleSearchChange = (value) => {
        setSearch((prev) => {
            if (value !== prev) setPage(1);
            return value.toString();
        });
    };

    if (isLoading || isFetching) content = <Spinner />;
    if (isError) {
        if ("status" in error) {
            content = (
                <div className='py-5 text-center text-xl font-semibold text-brm-font-black'>
                    Data Not Found
                </div>
            );
        }
    }

    if (isSuccess) {
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
                    title={"User"}
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
                    handleDeleteFilteredApp={(app) => handleDeleteFilteredApp(app)}
                    handleDeleteFilteredRole={(role) => handleDeleteFilteredRole(role)}
                />
            </>
        );
    }
    return content;
}
