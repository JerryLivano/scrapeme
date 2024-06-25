import React, { useEffect, useMemo, useState } from "react";
import { extractId, getAuthToken } from "../../utils/authUtilities";
import {
    useChangePasswordMutation,
    useGetPermissionBasedUserQuery,
} from "../../services/userApiSlice";
import Spinner from "../../components/elements/Spinner/Spinner";
import ButtonText from "../../components/elements/Button/ButtonText";
import { useForm } from "react-hook-form";
import {
    toastError,
    toastSuccess,
} from "../../components/elements/Alert/Toast";
import SingleLineInputProfile from "../../components/elements/Input/SIngleLineInputProfile";
import { useGetPermissionBasedLogQuery } from "../../services/logActivityApiSlice";
import DataTable from "../../components/layouts/DataTable";
import uuid from "react-uuid";
import { useGetApplicationQuery } from "../../services/applicationApiSlice";

const ProfileData = ({ userId }) => {

    const [passwordError, setPasswordError] = useState(false);
    const [errorLabel, setErrorLabel] = useState("");

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPages] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [date, setDate] = useState({});

    // Filter App
    const [appOpt, setAppOpt] = useState([]);
    const [appIdOpt, setAppIdOpt] = useState([]);

    const {
        data: userData,
        isSuccess: userSuccess,
        isLoading: userLoading,
        isError: userError,
    } = useGetPermissionBasedUserQuery(userId);

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors: formErrors },
    } = useForm({
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    const [changePassword, { isLoading: changePasswordLoading }] =
        useChangePasswordMutation();

    const onChangePassword = async (data) => {
        const request = {
            newPassword: data.newPassword,
            confirmPassword: data.confirmPassword,
        };
        try {
            await changePassword(request).unwrap();
            toastSuccess({ message: "Password has been updated" });
            setPasswordError(false);
            reset();
        } catch (e) {
            setPasswordError(true);
            if (e.status === 400) {
                setErrorLabel(e.data.message);
            } else {
                setErrorLabel("Internal server error");
            }
        }
    };

    // Data Table
    const {
        data: logsData,
        isSuccess: logsSuccess,
        isError: logsError,
        isLoading: logsLoading,
    } = useGetPermissionBasedLogQuery(
        {
            apps: appIdOpt,
            startDate: date.startDate ? date.startDate : "",
            endDate: date.endDate ? date.endDate : "",
            page: page,
            limit: pageSize,
        },
        { refetchOnMountOrArgChange: true }
    );

    useEffect(() => {
        if (logsSuccess && logsData.data) {
            setTotalPages(logsData.pagination.totalPages);
        }
    }, [logsSuccess, logsData]);

    // Table Column
    const cols = useMemo(
        () => [
            {
                id: uuid(),
                header: "",
                isCenter: true,
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.no,
            },
            {
                id: uuid(),
                header: "Application",
                isCenter: true,
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.action || "",
            },
            {
                id: uuid(),
                header: "Date",
                isCenter: true,
                cell: (row) => row.renderValue(),
                accessorFn: (row) => formatDateTime(row.createdDate) || "",
            },
        ],
        [logsData, userData]
    );

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const options = {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        };
        return date.toLocaleString("en-GB", options).replace(",", "");
    };

    // Filter App
    const {
        data: applications,
        isSuccess: applicationSuccess,
        isError: applicationError,
        isLoading: applicationLoading,
    } = useGetApplicationQuery({
        page: 1,
        limit: 100,
    });

    const handleDeleteFilteredApp = (selectedAppId) => {
        setAppOpt(appOpt.filter((app) => app[0] !== selectedAppId));
    };

    const handleAppSelect = (selectedApp) => {
        if (appOpt.find((app) => app[0] === selectedApp[0])) {
            handleDeleteFilteredApp(selectedApp[0]);
        } else {
            setAppOpt([...appOpt, selectedApp]);
        }
    };

    let filterAppOptions = [];
    if (applicationSuccess && applications && applications.data) {
        filterAppOptions = applications.data.map((app) => ({
            id: app.id,
            name: app.name,
        }));
    }

    useEffect(() => {
        setAppIdOpt(appOpt.map((app) => app[0]));
    }, [appOpt]);

    // Filter Date
    const handleDateFilter = (value) => {
        setDate(value);
        setPage(1);
    };

    const handlePageChange = (newPageNumber) => {
        setPage(newPageNumber);
    };

    return (
        <>
            {userLoading && logsLoading && applicationLoading && <Spinner />}
            {userError && logsError && applicationError && (
                <div className='justify-center text-xl font-semibold'>
                    Error Fetching User Data
                </div>
            )}
            {userSuccess && logsSuccess && applicationSuccess && (
                <div className='mt-16 w-full'>
                    {/* Name */}
                    <div className='w-full py-4 px-2 border-t-2 border-gray-200'>
                        <div className='flex h-full w-full items-center justify-between'>
                            <div className='w-[260px] font-semibold'>
                                <label htmlFor='name'>Full Name</label>
                            </div>
                            <div className='w-full' id='name'>
                                {userData.data.name}
                            </div>
                        </div>
                    </div>

                    {/* NIK */}
                    <div className='w-full py-4 px-2 border-t-2 border-gray-200'>
                        <div className='flex h-full w-full items-center justify-between'>
                            <div className='w-[260px] font-semibold'>
                                <label htmlFor='nik'>NIK</label>
                            </div>
                            <div className='w-full' id='nik'>
                                {userData.data.nik}
                            </div>
                        </div>
                    </div>

                    {/* Email */}
                    <div className='w-full py-4 px-2 border-t-2 border-gray-200'>
                        <div className='flex h-full w-full items-center justify-between'>
                            <div className='w-[260px] font-semibold'>
                                <label htmlFor='email'>Email</label>
                            </div>
                            <div className='w-full' id='email'>
                                {userData.data.email}
                            </div>
                        </div>
                    </div>

                    {/* Password */}
                    <div className='w-full py-4 px-2 border-t-2 border-gray-200'>
                        <div className='flex h-full w-full items-center justify-between'>
                            <div className='w-[260px] font-semibold'>
                                <label htmlFor='password'>
                                    Change Password
                                </label>
                            </div>
                            <div className='flex w-full' id='password'>
                                <form
                                    className='w-full'
                                    onSubmit={handleSubmit(onChangePassword)}
                                >
                                    <div className='flex w-full items-center justify-between'>
                                        <div className='flex w-full items-center'>
                                            <div className='flex flex-col gap-y-4 mr-4 w-4/5'>
                                                <div className='flex flex-row w-full items-center'>
                                                    <div className='w-1/4'>
                                                        New Password
                                                    </div>
                                                    <div className='w-full'>
                                                        <SingleLineInputProfile
                                                            isPassword
                                                            inputLabel={false}
                                                            {...register(
                                                                "newPassword"
                                                            )}
                                                            error={
                                                                formErrors
                                                                    .newPassword
                                                                    ?.message
                                                            }
                                                            notFound={
                                                                passwordError
                                                            }
                                                            errorMessage={
                                                                errorLabel
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className='flex flex-row w-full items-center'>
                                                    <div className='w-1/4'>
                                                        Confirm Password
                                                    </div>
                                                    <div className='w-full'>
                                                        <SingleLineInputProfile
                                                            isPassword
                                                            inputLabel={false}
                                                            {...register(
                                                                "confirmPassword"
                                                            )}
                                                            error={
                                                                formErrors
                                                                    .confirmPassword
                                                                    ?.message
                                                            }
                                                            notFound={
                                                                passwordError
                                                            }
                                                            errorMessage={
                                                                errorLabel
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='pr-10'>
                                            <ButtonText
                                                text={"Save"}
                                                type={"submit"}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* History */}
                    <div className='w-full py-4 px-2 border-t-2 border-gray-200'>
                        <div className='flex h-full w-full items-start justify-between'>
                            <div className='w-[260px] font-semibold'>
                                <label htmlFor='log'>Log Activity</label>
                            </div>
                            <div className='w-full' id='log'>
                                <DataTable
                                    rowCount={logsData.pagination.totalRecords}
                                    data={logsData.data}
                                    columns={cols}
                                    showPageSize
                                    pageSize={pageSize}
                                    showPagination
                                    pageIndex={logsData.pagination.currentPage}
                                    pageCount={totalPage}
                                    pageChange={(pageIndex) =>
                                        handlePageChange(pageIndex + 1)
                                    }
                                    setPageSize={setPageSize}
                                    showFilterApp
                                    setFilterApp={(app) => handleAppSelect(app)}
                                    filterApp={appOpt}
                                    filterAppOptions={filterAppOptions}
                                    showFilterDate
                                    filterDate={date}
                                    setFilterDate={handleDateFilter}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProfileData;
