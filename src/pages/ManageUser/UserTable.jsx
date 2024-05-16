import { useEffect, useMemo, useState } from "react";
import uuid from "react-uuid";
import DataTable from "../../components/layouts/DataTable";
import { useGetUserQuery } from "../../services/userApiSlice";
import Spinner from "../../components/elements/Spinner/Spinner";

export default function UserTable() {
    let content;
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPage, setTotalPages] = useState(1);
    const [showAddButton, setShowAddButton] = useState(false);
    const [search, setSearch] = useState("");

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
        ],
        []
    );

    const { data:users, isLoading, isSuccess, isError, error, isFetching } =
        useGetUserQuery({ page: page, limit: pageSize });

    console.log(users);

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

    if (isLoading) content = <Spinner />;
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
