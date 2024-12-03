import { useEffect, useMemo, useState } from "react";
import {
    useAcceptRequestMutation,
    useDoneRequestMutation,
    useGetRequestsQuery,
} from "../../../services/siteRequest/siteRequestApiSlice";
import uuid from "react-uuid";
import RequestStatusColor from "../Public/RequestStatusColor";
import ButtonDropdown from "../Public/Button/ButtonDropdown";
import Spinner from "../Public/Spinner";
import DataTable from "../Public/Table/DataTable";
import ModalConfirmAccept from "../Public/Confirmation/ModalConfirmAccept";
import { toastError, toastSuccess } from "../Public/Toast";
import ButtonAction from "../Public/Button/ButtonAction";
import FormModalDetailRequest from "./FormModalDetailRequest";
import ModalConfirmDecline from "../Public/Confirmation/ModalConfirmDecline";
import ModalConfirmDone from "../Public/Confirmation/ModalConfirmDone";

export default function TableRequestAdmin() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");

    const [modalAccept, setModalAccept] = useState(false);
    const [modalDecline, setModalDecline] = useState(false);
    const [modalDone, setModalDone] = useState(false);
    const [selectedRequestGuid, setSelectedRequestGuid] = useState("");
    const [selectedRequest, setSelectedRequest] = useState({});
    const [modalDetail, setModalDetail] = useState(false);

    const [columnName, setColumnName] = useState(null);
    const [orderBy, setOrderBy] = useState(0);
    const [filterStatus, setFilterStatus] = useState(-2);

    const {
        data: siteRequest,
        isLoading: siteRequestLoading,
        isError: siteRequestError,
        isSuccess: siteRequestSuccess,
        isFetching: siteRequestFetching,
    } = useGetRequestsQuery(
        {
            search: search.trim(),
            page: page,
            limit: pageSize,
            order_by: orderBy,
            column_name: columnName,
            status: filterStatus
        },
        { refetchOnMountOrArgChange: true }
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
                                    action: "Accept",
                                    onFunction: () => {
                                        setSelectedRequestGuid(row.guid);
                                        setModalAccept(true);
                                    },
                                },
                                {
                                    action: "Decline",
                                    onFunction: () => {
                                        setSelectedRequestGuid(row.guid);
                                        setModalDecline(true);
                                    },
                                },
                                {
                                    action: "See Detail",
                                    onFunction: () => {
                                        setSelectedRequest(row);
                                        setModalDetail(true);
                                    },
                                },
                            ]}
                        />
                    ) : row.status === 1 ? (
                        <ButtonDropdown
                            functionByActions={[
                                {
                                    action: "Mark As Done",
                                    onFunction: () => {
                                        setSelectedRequestGuid(row.guid);
                                        setModalDone(true);
                                    },
                                },
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

    const [acceptSite, { isLoading: acceptLoading }] =
        useAcceptRequestMutation();

    const [doneSite, { isLoading: doneLoading }] = useDoneRequestMutation();

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
            {siteRequestLoading && doneLoading && <Spinner />}
            {siteRequestError && (
                <div className='py-5 text-center text-xl font-semibold text-gray-700'>
                    Data Not Found
                </div>
            )}
            {siteRequestSuccess && !doneLoading && (
                <>
                    <DataTable
                        title={"Site Request"}
                        rowCount={siteRequest.pagination.total_records}
                        data={siteRequest.data}
                        columns={columns}
                        showGlobalFilter
                        showPageSize
                        showPagination
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
                        showFilterStatus
                        filterStatus={filterStatus}
                        filterStatusOptions={[
                            { value: -2, label: "All" },
                            { value: 0, label: "Pending" },
                            { value: 2, label: "Done" },
                            { value: 1, label: "Accepted" },
                            { value: -1, label: "Declined" },
                        ]}
                        setFilterStatus={(e) => {
                            setFilterStatus(e.target.value);
                            setPage(1);
                        }}
                        columnNameHandler={handleColumnName}
                        isFetching={siteRequestFetching}
                    />
                    <ModalConfirmAccept
                        title={"Accept Request"}
                        message={"Are you sure want to accept this request?"}
                        openModalConfirmAccept={modalAccept}
                        setOpenModalConfirmAccept={setModalAccept}
                        isLoading={acceptLoading}
                        onAcceptHandler={async () => {
                            await acceptSite(selectedRequestGuid)
                                .unwrap()
                                .then(() => {
                                    setModalAccept(false);
                                    toastSuccess({
                                        message:
                                            "Successfully accepted request",
                                    });
                                })
                                .catch(() => {
                                    toastError({
                                        message: "Failed accepting request",
                                    });
                                });
                        }}
                    />
                    <ModalConfirmDone
                        title={"Mark As Done"}
                        message={"Are you sure want to mark as done this request?"}
                        openModalConfirmDone={modalDone}
                        setOpenModalConfirmDone={setModalDone}
                        isLoading={acceptLoading}
                        onDoneHandler={async () => {
                            await doneSite(selectedRequestGuid)
                                .unwrap()
                                .then(() => {
                                    setModalDone(false);
                                    toastSuccess({
                                        message:
                                            "Successfully marked as done this request",
                                    });
                                })
                                .catch(() => {
                                    toastError({
                                        message: "Failed to mark as done",
                                    });
                                });
                        }}
                    />
                    <ModalConfirmDecline
                        title={"Decline Request"}
                        requestGuid={selectedRequestGuid}
                        message={"Are you sure want to decline this request?"}
                        openModalConfirmDecline={modalDecline}
                        setOpenModalConfirmDecline={setModalDecline}
                    />
                    <FormModalDetailRequest
                        open={modalDetail}
                        setOpen={setModalDetail}
                        siteRequest={selectedRequest}
                    />
                </>
            )}
        </>
    );
}
