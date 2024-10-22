import { useEffect, useMemo, useState } from "react";
import {
    useDeleteAccountMutation,
    useGetAccountsQuery,
} from "../../../services/account/accountApiSlice";
import Spinner from "../Public/Spinner";
import DataTable from "../Public/Table/DataTable";
import uuid from "react-uuid";
import StatusColorBoolean from "../Public/StatusColorBoolean";
import StatusColorRole from "../Public/StatusColorRole";
import ButtonDropdown from "../Public/Button/ButtonDropdown";
import ModalConfirmDelete from "../Public/Confirmation/ModalConfirmDelete";
import { toastError, toastSuccess } from "../Public/Toast";
import FormModalChangePassword from "./FormModalChangePassword";
import FormModalAddAccount from "./FormModalAddAccount";
import FormModalEditAccount from "./FormModalEditAccount";

export default function TableAccount() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");

    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [changePwModal, setChangePwModal] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState({});
    const [selectedAccountGuid, setSelectedAccountGuid] = useState("");

    const [filterStatus, setFilterStatus] = useState(-1);
    const [filterRole, setFilterRole] = useState(null);
    const [columnName, setColumnName] = useState(null);
    const [orderBy, setOrderBy] = useState(0);

    const {
        data: accounts,
        isLoading: accountLoading,
        isError: accountError,
        isSuccess: accountSuccess,
        isFetching: accountFetching,
    } = useGetAccountsQuery(
        {
            search: search.trim(),
            page: page,
            limit: pageSize,
            is_active: filterStatus,
            role_name: filterRole,
            order_by: orderBy,
            column_name: columnName,
        },
        { refetchOnMountOrArgChange: true }
    );

    useEffect(() => {
        if (accountSuccess && accounts) {
            setTotalPages(accounts.pagination.total_pages);
        }
    }, [accountSuccess, accounts]);

    const [deleteAccount, { isLoading: deleteAccountLoading }] =
        useDeleteAccountMutation();

    const columns = useMemo(() => {
        return [
            {
                id: uuid(),
                header: "No",
                cell: (row) => row.row.index + 1,
                accessorFn: (i) => i + 1,
            },
            {
                id: uuid(),
                header: "Name",
                cell: (row) => row.renderValue(),
                accessorFn: (row) =>
                    `${row.user.first_name}${
                        row.user.last_name ? ` ${row.user.last_name}` : ""
                    }` || "",
                isSort: true,
                columnName: "first_name",
            },
            {
                id: uuid(),
                header: "Email",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.user.email || "",
                isSort: true,
                columnName: "email",
            },
            {
                id: uuid(),
                header: "Role",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => (
                    <StatusColorRole role={row.role.role_name} />
                ),
            },
            {
                id: uuid(),
                header: "Status",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => (
                    <StatusColorBoolean status={row.is_active} />
                ),
            },
            {
                id: uuid(),
                header: "Date Created",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.created_date.slice(0, -4) || "",
            },
            {
                id: uuid(),
                header: "",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => {
                    return row.role.role_name === "ROLE_USER" ? (
                        <ButtonDropdown
                            functionByActions={[
                                {
                                    action: "Edit",
                                    onFunction: () => {
                                        setSelectedAccount(row);
                                        setEditModal(true);
                                    },
                                },
                                {
                                    action: "Delete",
                                    onFunction: () => {
                                        setSelectedAccountGuid(row.guid);
                                        setDeleteModal(true);
                                    },
                                },
                                {
                                    action: "Change Password",
                                    onFunction: () => {
                                        setChangePwModal(true);
                                        setSelectedAccountGuid(row.guid);
                                    },
                                },
                            ]}
                        />
                    ) : (
                        ""
                    );
                },
            },
        ];
    }, [accounts]);

    const handleSort = () => {
        setOrderBy((prev) => (prev + 1) % 3);
    };

    const handleColumnName = (name) => {
        setColumnName(name);
    };

    const handlePageChange = (newPageNumber) => {
        setPage(newPageNumber);
    };

    const handleSearchChange = (value) => {
        setSearch((prev) => {
            if (value !== prev) setPage(1);
            return value.toString();
        });
    };

    return (
        <>
            {accountLoading && <Spinner />}
            {accountError && (
                <div className='py-5 text-center text-xl font-semibold text-gray-700'>
                    Data Not Found
                </div>
            )}
            {accountSuccess && (
                <>
                    <DataTable
                        title={"User Account"}
                        rowCount={accounts.pagination.total_records}
                        data={accounts.data}
                        columns={columns}
                        showAddButton
                        onClickAdd={() => setAddModal(true)}
                        showGlobalFilter
                        showPageSize
                        showPagination
                        pageIndex={accounts.pagination.current_page}
                        pageCount={totalPages}
                        pageChange={(pageIndex) =>
                            handlePageChange(pageIndex + 1)
                        }
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                        searchHandler={handleSearchChange}
                        searchQuery={search}
                        placeholder={"Search user account..."}
                        sortHandler={handleSort}
                        columnNameHandler={handleColumnName}
                        // Custom filter
                        showFilterStatus
                        filterStatus={filterStatus}
                        filterStatusOptions={[
                            { value: -1, label: "All" },
                            { value: 0, label: "Inactive" },
                            { value: 1, label: "Active" },
                        ]}
                        setFilterStatus={(e) => {
                            setFilterStatus(e.target.value);
                            setPage(1);
                        }}
                        showFilterRole
                        filterRole={filterRole}
                        filterRoleOptions={[
                            { value: "", label: "All" },
                            { value: "ROLE_ADMIN", label: "Admin" },
                            { value: "ROLE_User", label: "User" },
                        ]}
                        setFilterRole={(e) => {
                            setFilterRole(
                                e.target.value === "" ? null : e.target.value
                            );
                            setPage(1);
                        }}
                        // Here
                        isFetching={accountFetching}
                    />

                    <FormModalChangePassword
                        accountGuid={selectedAccountGuid}
                        open={changePwModal}
                        setOpen={setChangePwModal}
                    />

                    <FormModalAddAccount
                        open={addModal}
                        setOpen={setAddModal}
                    />

                    <FormModalEditAccount
                        open={editModal}
                        setOpen={setEditModal}
                        account={selectedAccount}
                    />

                    <ModalConfirmDelete
                        title={"Delete Account"}
                        message={"Are you sure want to delete this account?"}
                        openModalConfirmDelete={deleteModal}
                        setOpenModalConfirmDelete={setDeleteModal}
                        isLoading={deleteAccountLoading}
                        onDeleteHandler={async () => {
                            await deleteAccount(selectedAccountGuid)
                                .unwrap()
                                .then(() => {
                                    toastSuccess({
                                        message: `Successfully deleted account`,
                                    });
                                })
                                .catch(() => {
                                    toastError({
                                        message: "Failed to delete account",
                                    });
                                });
                            setDeleteModal(false);
                        }}
                    />
                </>
            )}
        </>
    );
}
