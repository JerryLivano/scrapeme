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

export default function UserTable() {
    let content;
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPage, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [roleOpt, setRoleOpt] = useState("");
    const [isClicked, setIsClicked] = useState(false);
    const [isChecked, setIsChecked] = useState(true);

    const [dataAuthApp, setDataAuthApp] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [accId, setAccId] = useState([]);

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };

    // const { data: singleRole } = useGetRoleByIdQuery(watch("roleId"), {
    //     skip: !watch("roleId"),
    // });

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
                accessorFn: (row) => row.role || "",
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
                            value={row}
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

                    console.log(modifyAccess);

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
        { page: page, limit: pageSize, search: search, role: roleOpt },
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
            console.log(dataAuthApp);
        }
    }, [isSuccess, users]);

    const handlePageChange = (newPageNumber) => {
        setPage(newPageNumber);
    };

    const handleRoleSelect = (e) => {
        setRoleOpt(e.target.value);
        setPage(1);
    };

    const {
        data: roles,
        isLoading: rolesIsLoading,
        isError: rolesIsError,
    } = useGetRoleQuery();

    let filterRoleOptions = [];

    if (!rolesIsLoading && !rolesIsError && roles.data) {
        filterRoleOptions = roles.data.map((role) => ({
            value: role.roleName,
            label: role.roleName,
        }));
        filterRoleOptions.unshift({ label: "All", value: "" });
    }
    console.log(filterRoleOptions)

    const handleSearchChange = (value) => {
        setSearch((prev) => {
            if (value !== prev) setPage(1);
            return value.toString();
        });
    };

    const onClickAdd = () => {
        navigate("add-user");
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
                    filterApp
                    showPagination
                    showAddButton
                    searchQuery={search}
                    searchHandler={handleSearchChange}
                    placeholder={"Search employee name..."}
                    onClickAdd={onClickAdd}
                    title={"User"}
                    pageIndex={pagination.currentPage}
                    pageCount={totalPage}
                    pageSize={pageSize}
                    pageChange={(pageIndex) => handlePageChange(pageIndex + 1)}
                    setPageSize={setPageSize}
                    showFilterRole={true}
                    filterRole={roleOpt}
                    setFilterRole={handleRoleSelect}
                    filterRoleOptions={filterRoleOptions}
                />
            </>
        );
    }
    return content;
}
