import React from "react";
import DataTable from "../../components/layouts/DataTable";
import FormModal from "../../components/fragments/Form/FormModal";

const ModalDetailAddLog = ({ open, setOpen, titleForm, columns, data }) => {
    return (
        <FormModal
            open={open}
            setOpen={setOpen}
            titleForm={`${titleForm} Data Added`}
        >
            <div className='mt-4 max-w-[900px]'>
                <DataTable data={data || []} columns={columns} />
            </div>
        </FormModal>
    );
};

export default ModalDetailAddLog;
