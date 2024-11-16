import { useEffect, useMemo, useState } from "react";
import {
    useDeleteCategoryMutation,
    useGetCategoriesQuery,
} from "../../../services/category/categoryApiSlice";
import Spinner from "../Public/Spinner";
import DataTable from "../Public/Table/DataTable";
import uuid from "react-uuid";
import ButtonAction from "../Public/Button/ButtonAction";
import FormModalEditCategory from "./FormModalEditCategory";
import FormModalAddCategory from "./FormModalAddCategory";
import ModalConfirmDelete from "../Public/Confirmation/ModalConfirmDelete";
import { toastError, toastSuccess } from "../Public/Toast";

export default function TableCategory() {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(50);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");

    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState({});
    const [selectedCategoryGuid, setSelectedCategoryGuid] = useState("");

    const [columnName, setColumnName] = useState(null);
    const [orderBy, setOrderBy] = useState(0);

    const {
        data: categories,
        isLoading: categoryLoading,
        isError: categoryError,
        isSuccess: categorySuccess,
        isFetching: categoryFetching,
    } = useGetCategoriesQuery(
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
        if (categorySuccess && categories) {
            setTotalPages(categories.pagination.total_pages);
        }
    }, [categorySuccess, categories]);

    const [deleteCategory, { isLoading: deleteCategoryLoading }] =
        useDeleteCategoryMutation();

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
                accessorFn: (row) => row.category_name || "",
                isSort: true,
                columnName: "category_name"
            },
            {
                id: "action",
                header: "ACTION",
                cell: (row) => row.renderValue(),
                isCenter: true,
                accessorFn: (row) => (
                    <div className='flex justify-center gap-2'>
                        <ButtonAction
                            onClick={() => {
                                setEditModal(true);
                                setSelectedCategory(row);
                            }}
                            text={"EDIT"}
                            colorClass={"bg-blue-500"}
                            hoverClass={"bg-blue-400"}
                        />
                        <ButtonAction
                            onClick={() => {
                                setSelectedCategoryGuid(row.guid);
                                setDeleteModal(true);
                            }}
                            text={"DELETE"}
                            colorClass={"bg-red-500"}
                            hoverClass={"bg-red-400"}
                        />
                    </div>
                ),
            },
        ];
    }, [categories]);

    const handleSort = () => {
        setOrderBy((prev) => (prev + 1) % 3);
    }

    const handleColumnName = (name) => {
        setColumnName(name)
    }

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
            {categoryLoading && <Spinner />}
            {categoryError && (
                <div className='py-5 text-center text-xl font-semibold text-gray-700'>
                    Data Not Found
                </div>
            )}
            {categorySuccess && (
                <>
                    <DataTable
                        title={"Category"}
                        rowCount={categories.pagination.total_records}
                        data={categories.data}
                        columns={columns}
                        showAddButton
                        onClickAdd={() => setAddModal(true)}
                        showGlobalFilter
                        showPageSize
                        showPagination
                        pageIndex={categories.pagination.current_page}
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
                        placeholder={"Search category name..."}
                        isFetching={categoryFetching}
                    />
                    <FormModalEditCategory
                        open={editModal}
                        setOpen={setEditModal}
                        category={selectedCategory}
                    />
                    <FormModalAddCategory
                        open={addModal}
                        setOpen={setAddModal}
                    />
                    <ModalConfirmDelete
                        title={"Delete Category"}
                        message={"Are you sure want to delete this category?"}
                        openModalConfirmDelete={deleteModal}
                        setOpenModalConfirmDelete={setDeleteModal}
                        isLoading={deleteCategoryLoading}
                        onDeleteHandler={async () => {
                            await deleteCategory(selectedCategoryGuid)
                                .unwrap()
                                .then(() => {
                                    toastSuccess({
                                        message: `Successfully deleted category`,
                                    });
                                })
                                .catch(() => {
                                    toastError({
                                        message: "Failed to delete category",
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
