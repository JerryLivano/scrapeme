import { useEffect, useMemo, useState } from "react";
import DataTable from "../../../components/layouts/DataTable";
import uuid from "react-uuid";

export default function TemporaryAddUserTable({ onClickAdd }) {
    let content;
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPage, setTotalPages] = useState(1);
    const [showAddButton, setShowAddButton] = useState(false);
    const [search, setSearch] = useState("");

    const cols = useMemo(() => [
        {
            id: uuid(),
            header: "",
            cell: (row) => row.renderValue(),
            accessorFn: (row) => row.no || ""
        },
        {
            id: uuid(),
            header: "Name",
            isBlack: true,
            cell: (row) => row.renderValue(),
            accessorFn: (row) => row.name || ""
        },
        {
            id: uuid(),
            header: "Email",
            cell: (row) => row.renderValue(),
            accessorFn: (row) => row.email || ""
        },
        {
            id: uuid(),
            header: "NIK",
            cell: (row) => row.renderValue(),
            accessorFn: (row) => row.nik || ""
        },
        {
            id: uuid(),
            header: "Role",
            cell: (row) => row.renderValue(),
            accessorFn: (row) => row.role || ""
        },
    ], []);

    const userData = {
        code: 200,
        status: "OK",
        message: "Data Found",
        data: [
            
        ],
        pagination: {
            totalRecords: 1,
            currentPage: 1,
            nextPage: null,
            prevPage: null,
            totalPages: 1
        }
    };

    useEffect(() => {
        if (userData) {
            setTotalPages(userData.pagination.totalPages);
        }
    }, [userData]);

    const { data, pagination } = userData;
    const dataCount = pagination.totalRecords;
    content = (
        <>
            <DataTable
                title={"Temporary Table"}
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
    return content;
}