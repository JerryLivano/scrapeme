import { useEffect, useMemo, useState } from "react";
import uuid from "react-uuid";
import DataTable from "../../components/layouts/DataTable";
import { useGetUserQuery } from "../../services/userApiSlice";
import Spinner from "../../components/elements/Spinner/Spinner";
import { CheckIcon, EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export default function UserTable() {
    let content;
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPage, setTotalPages] = useState(1);
    const [showAddButton, setShowAddButton] = useState(false);
    const [search, setSearch] = useState("");

    const [isChecked, setIsChecked] = useState(true);

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
                accessorFn: (row) => row.role || "",
            },
            {
                id: uuid(),
                header: "Recruit-ME",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => {
                    const isChecked = row.authorizedApplications.some(
                        (app) => app.name === "Recruit-ME"
                    );
                    return (
                        <div className='flex justify-center'>
                            <input
                                type='checkbox'
                                checked={isChecked}
                                onChange={() => {}}
                                className='form-checkbox h-5 w-5 text-gray-600'
                            />
                        </div>
                    );
                },
            },
            {
                id: uuid(),
                header: "CV-ME",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => {
                    const isChecked = row.authorizedApplications.some(
                        (app) => app.name === "CV-ME"
                    );
                    return (
                        <div className='flex justify-center'>
                            <input
                                type='checkbox'
                                checked={isChecked}
                                onChange={() => {}}
                                className='form-checkbox h-5 w-5 text-gray-600'
                            />
                        </div>
                    );
                },
            },
            {
                id: uuid(),
                header: "Test-ME",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => {
                    const isChecked = row.authorizedApplications.some(
                        (app) => app.name === "Test-ME"
                    );
                    return (
                        <div className='flex justify-center'>
                            <input
                                type='checkbox'
                                checked={isChecked}
                                onChange={() => {}}
                                className='form-checkbox h-5 w-5 text-gray-600'
                            />
                        </div>
                    );
                },
            },
            {
                id: uuid(),
                header: "Pick-ME",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => {
                    const isChecked = row.authorizedApplications.some(
                        (app) => app.name === "Pick-ME"
                    );
                    return (
                        <div className='flex justify-center'>
                            <input
                                type='checkbox'
                                checked={isChecked}
                                onChange={() => {}}
                                className='form-checkbox h-5 w-5 text-gray-600'
                            />
                        </div>
                    );
                },
            },
            {
                id: uuid(),
                header: "Team-ME",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => {
                    const isChecked = row.authorizedApplications.some(
                        (app) => app.name === "Team-ME"
                    );
                    return (
                        <div className='flex justify-center'>
                            <input
                                type='checkbox'
                                checked={isChecked}
                                onChange={() => {}}
                                className='form-checkbox h-5 w-5 text-gray-600'
                            />
                        </div>
                    );
                },
            },
            {
                id: uuid(),
                header: "BRM",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => {
                    const isChecked = row.authorizedApplications.some(
                        (app) => app.name === "BRM"
                    );
                    return (
                        <div className='flex justify-center'>
                            <input
                                type='checkbox'
                                checked={isChecked}
                                onChange={() => {}}
                                className='form-checkbox h-5 w-5 text-gray-600'
                            />
                        </div>
                    );
                },
            },
            {
                id: uuid(),
                header: "Metrodata Academy",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => {
                    const isChecked = row.authorizedApplications.some(
                        (app) => app.name === "Metrodata Academy"
                    );
                    return (
                        <div className='flex justify-center'>
                            <input
                                type='checkbox'
                                checked={isChecked}
                                onChange={() => {}}
                                className='form-checkbox h-5 w-5 text-gray-600'
                            />
                        </div>
                    );
                },
            },
            {
                id: uuid(),
                header: "Modify Access",
                cell: (row) => row.renderValue(),
                accessorFn: () => {
                    const [isClicked, setIsClicked] = useState(false);
                    const handleToggle = () => {
                        setIsClicked(!isClicked);
                    };
                    return (
                        <div className='flex justify-center'>
                            <button onClick={handleToggle}>
                                {isClicked ? (
                                    <CheckIcon className='h-6 w-6 text-gray-600' />
                                ) : (
                                    <EllipsisVerticalIcon className='h-6 w-6 text-gray-600' />
                                )}
                            </button>
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
    } = useGetUserQuery({ page: page, limit: pageSize });

    useEffect(() => {
        if (isSuccess && users) {
            setTotalPages(users.pagination.totalPages);
        }
    }, [isSuccess, users]);

    const handlePageChange = (newPageNumber) => {
        setPage(newPageNumber);
    };

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
                    filterRole
                    filterApp
                    showPagination
                    showAddButton
                    onClickAdd={onClickAdd}
                    title={"User"}
                    pageIndex={pagination.currentPage}
                    pageCount={totalPage}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                />
            </>
        );
    }
    return content;
}
