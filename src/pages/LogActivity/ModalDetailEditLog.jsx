import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import DataTable from "../../components/layouts/DataTable";
import { XMarkIcon } from "@heroicons/react/24/solid";
import FormModal from "../../components/fragments/Form/FormModal";

const ModalDetailEditLog = ({
    open,
    setOpen,
    titleForm,
    columns,
    oldData,
    newData,
}) => {
    return (
        <FormModal
            open={open}
            setOpen={setOpen}
            titleForm={`${titleForm} Data Changed`}
        >
            <div className='mt-4 max-w-[900px]'>
                <div className='font-normal text-start'>Old Data</div>
                <DataTable data={oldData || []} columns={columns} />
            </div>
            <div className='mt-8 max-w-[900px]'>
                <div className='font-normal text-start'>Recent Data</div>
                <DataTable data={newData || []} columns={columns} />
            </div>
        </FormModal>
    );
};

export default ModalDetailEditLog;
