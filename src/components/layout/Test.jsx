const [deleteSite, { isLoading: siteDeleteLoading }] = useDeleteSiteMutation();

<ModalConfirmDelete
    title={"Delete Site"}
    message={"Are you sure want to delete this site?"}
    openModalConfirmDelete={deleteModal}
    setOpenModalConfirmDelete={setDeleteModal}
    isLoading={siteDeleteLoading}
    onDeleteHandler={async () => {
        await deleteSite(selectedSiteGuid)
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