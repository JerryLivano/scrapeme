import { useEffect, useMemo, useState } from "react";
import {
    useDeleteSiteMutation,
    useGetSitesQuery,
    useUpdateActiveSiteMutation,
} from "../../../services/site/siteApiSlice";
import uuid from "react-uuid";
import { Switch } from "@mui/material";
import Spinner from "../Public/Spinner";
import DataTable from "../Public/Table/DataTable";
import ButtonDropdown from "../Public/Button/ButtonDropdown";
import ModalConfirmDelete from "../Public/Confirmation/ModalConfirmDelete";
import { toastError, toastSuccess } from "../Public/Toast";
import FormModalSiteDetail from "./FormModalSiteDetail";

export default function TableSite() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");

    const [selectedSite, setSelectedSite] = useState("");
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState({});
    const [detailModal, setDetailModal] = useState(false);

    const [columnName, setColumnName] = useState(null);
    const [orderBy, setOrderBy] = useState(0);

    const {
        data: sites,
        isLoading: siteLoading,
        isError: siteError,
        isSuccess: siteSuccess,
        isFetching: siteFetching,
    } = useGetSitesQuery(
        {
            search: search.trim(),
            page: page,
            limit: pageSize,
            order_by: orderBy,
            column_name: columnName,
        },
        { refetchOnMountOrArgChange: true }
    );

    useEffect(() => {
        if (siteSuccess && sites) {
            setTotalPages(sites.pagination.total_pages);
        }
    }, [siteSuccess, sites]);

    const [updateActiveSite, { isLoading: siteActiveLoading }] =
        useUpdateActiveSiteMutation();

    const updateActiveSubmit = async (guid, status) => {
        const request = {
            guid: guid,
            is_active: status,
        };
        await updateActiveSite(request).unwrap();
    };

    const [deleteSite, { isLoading: siteDeleteLoading }] = useDeleteSiteMutation();

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
                accessorFn: (row) => row.site_name || "",
                isSort: true,
                columnName: "site_name",
            },
            {
                id: uuid(),
                header: "Domain",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.site_url || "",
                isSort: true,
                columnName: "site_url",
            },
            {
                id: uuid(),
                header: "Active Status",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => {
                    return (
                        <div className='flex justify-center'>
                            <Switch
                                checked={row.is_active}
                                onChange={() => {
                                    updateActiveSubmit(
                                        row.guid,
                                        !row.is_active
                                    );
                                }}
                                inputProps={{ "aria-label": "controlled" }}
                            />
                        </div>
                    );
                },
                isCenter: true,
            },
            {
                id: uuid(),
                header: "Date Created",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.created_date.slice(0, -12) || "",
            },
            {
                id: uuid(),
                header: "",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => (
                    <ButtonDropdown
                        functionByActions={[
                            {
                                action: "See Detail",
                                onFunction: () => {
                                    setDetailModal(true);
                                    setSelectedDetail(row);
                                },
                            },
                            {
                                action: "Edit",
                                onFunction: () => {},
                            },
                            {
                                action: "Delete",
                                onFunction: () => {
                                    setDeleteModal(true);
                                    setSelectedSite(row.guid);
                                },
                            },
                            {
                                action: "Manage Template",
                                onFunction: () => {},
                            },
                        ]}
                    />
                ),
            },
        ];
    }, [sites]);

    const handleSort = () => {
        setOrderBy((prev) => (prev + 1) % 3);
    };

    const handleColumnName = (name) => {
        setColumnName(name);
    };

    // Table Utils
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
            {siteLoading && <Spinner />}
            {siteError && (
                <div className='py-5 text-center text-xl font-semibold text-gray-700'>
                    Data Not Found
                </div>
            )}
            {siteSuccess && (
                <>
                    <DataTable
                        title={"Site"}
                        rowCount={sites.pagination.total_records}
                        data={sites.data}
                        columns={columns}
                        showAddButton
                        onClickAdd={() => {}}
                        showGlobalFilter
                        showPageSize
                        showPagination
                        pageIndex={sites.pagination.current_page}
                        pageCount={totalPages}
                        pageChange={(pageIndex) =>
                            handlePageChange(pageIndex + 1)
                        }
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                        searchHandler={handleSearchChange}
                        searchQuery={search}
                        sortHandler={handleSort}
                        columnNameHandler={handleColumnName}
                        placeholder={"Search by name or domain..."}
                        isFetching={siteFetching || siteActiveLoading}
                    />
                    <FormModalSiteDetail 
                        open={detailModal}
                        setOpen={setDetailModal}
                        site={selectedDetail}
                    />
                    <ModalConfirmDelete
                        title={"Delete Site"}
                        message={"Are you sure want to delete this site?"}
                        openModalConfirmDelete={deleteModal}
                        setOpenModalConfirmDelete={setDeleteModal}
                        isLoading={siteDeleteLoading}
                        onDeleteHandler={async () => {
                            await deleteSite(selectedSite)
                                .unwrap()
                                .then(() => {
                                    toastSuccess({
                                        message: `Successfully deleted site`,
                                    });
                                })
                                .catch(() => {
                                    toastError({
                                        message: "Failed to delete site",
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
