import { useEffect, useMemo, useState } from "react";
import {
    useDeleteRequestMutation,
    useGetRequestsByAccountQuery,
} from "../../../services/siteRequest/siteRequestApiSlice";
import uuid from "react-uuid";
import RequestStatusColor from "../Public/RequestStatusColor";
import ButtonDropdown from "../Public/Button/ButtonDropdown";
import Spinner from "../Public/Spinner";
import DataTable from "../Public/Table/DataTable";
import FormModalDetailRequest from "./FormModalDetailRequest";
import ModalConfirmDelete from "../Public/Confirmation/ModalConfirmDelete";
import { toastError, toastSuccess } from "../Public/Toast";
import FormModalAddRequest from "./FormModalAddRequest";
import FormModalEditRequest from "./FormModalEditRequest";
import ButtonAction from "../Public/Button/ButtonAction";

export default function TableRequestUser({ userGuid }) {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");

    const [addModal, setAddModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [selectedRequestGuid, setSelectedRequestGuid] = useState("");
    const [selectedRequest, setSelectedRequest] = useState({});
    const [modalDetail, setModalDetail] = useState(false);

    const [columnName, setColumnName] = useState(null);
    const [orderBy, setOrderBy] = useState(0);

    const {
        data: siteRequest,
        isLoading: siteRequestLoading,
        isError: siteRequestError,
        isSuccess: siteRequestSuccess,
        isFetching: siteRequestFetching,
    } = useGetRequestsByAccountQuery(
        {
            account_guid: userGuid,
            search: search.trim(),
            page: page,
            limit: pageSize,
            order_by: orderBy,
            column_name: columnName,
        },
        { refetchOnMountOrArgChange: true, skip: !userGuid }
    );

    useEffect(() => {
        if (siteRequestSuccess && siteRequest) {
            setTotalPages(siteRequest.pagination.total_pages);
        }
    }, [siteRequestSuccess, siteRequest]);

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
                header: "Subject",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.subject,
                isSort: true,
                columnName: "subject",
            },
            {
                id: uuid(),
                header: "Domain",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.site_url,
                isSort: true,
                columnName: "site_url",
            },
            {
                id: uuid(),
                header: "Status",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => <RequestStatusColor status={row.status} />,
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
                    return row.status === 0 ? (
                        <ButtonDropdown
                            functionByActions={[
                                {
                                    action: "Edit",
                                    onFunction: () => {
                                        setSelectedRequest(row);
                                        setEditModal(true);
                                    },
                                },
                                // {
                                //     action: "Delete",
                                //     onFunction: () => {
                                //         setSelectedRequestGuid(row.guid);
                                //         setDeleteModal(true);
                                //     },
                                // },
                                {
                                    action: "See Detail",
                                    onFunction: () => {
                                        setSelectedRequest(row);
                                        setModalDetail(true);
                                    },
                                },
                            ]}
                        />
                    ) : (
                        <ButtonAction
                            onClick={() => {
                                setSelectedRequest(row);
                                setModalDetail(true);
                            }}
                            text={"See Detail"}
                            colorClass={"bg-blue-500"}
                            hoverClass={"bg-blue-400"}
                        />
                    );
                },
            },
        ];
    }, [siteRequest]);

    const [deleteRequest, { isLoading: deleteRequestLoading }] =
        useDeleteRequestMutation();

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
            {siteRequestLoading && <Spinner />}
            {siteRequestError && (
                <div className='py-5 text-center text-xl font-semibold text-gray-700'>
                    Data Not Found
                </div>
            )}
            {siteRequestSuccess && (
                <>
                    <DataTable
                        title={"Site Request"}
                        rowCount={siteRequest.pagination.total_records}
                        data={siteRequest.data}
                        columns={columns}
                        showGlobalFilter
                        showPageSize
                        showPagination
                        showAddButton
                        onClickAdd={() => setAddModal(true)}
                        pageIndex={siteRequest.pagination.current_page}
                        pageCount={totalPages}
                        pageChange={(pageIndex) =>
                            handlePageChange(pageIndex + 1)
                        }
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                        searchHandler={handleSearchChange}
                        searchQuery={search}
                        placeholder={"Search site request..."}
                        sortHandler={handleSort}
                        columnNameHandler={handleColumnName}
                        isFetching={siteRequestFetching}
                    />
                    <FormModalAddRequest
                        open={addModal}
                        setOpen={setAddModal}
                        userGuid={userGuid}
                    />
                    <FormModalDetailRequest
                        open={modalDetail}
                        setOpen={setModalDetail}
                        siteRequest={selectedRequest}
                    />
                    <FormModalEditRequest
                        open={editModal}
                        setOpen={setEditModal}
                        siteRequest={selectedRequest}
                    />
                    {/* <ModalConfirmDelete
                        title={"Delete Site Request"}
                        message={"Are you sure want to delete this request?"}
                        openModalConfirmDelete={deleteModal}
                        setOpenModalConfirmDelete={setDeleteModal}
                        isLoading={deleteRequestLoading}
                        onDeleteHandler={async () => {
                            await deleteRequest(selectedRequestGuid)
                                .unwrap()
                                .then(() => {
                                    toastSuccess({
                                        message: `Successfully deleted site request`,
                                    });
                                })
                                .catch(() => {
                                    toastError({
                                        message:
                                            "Failed to delete site request",
                                    });
                                });
                            setDeleteModal(false);
                        }}
                    /> */}
                </>
            )}
        </>
    );
}
