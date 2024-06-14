import { useEffect, useMemo, useState } from "react";
import { useGetLogActivityQuery } from "../../services/logActivityApiSlice";
import { useGetRoleQuery } from "../../services/roleApi.Slice";
import { useGetApplicationQuery } from "../../services/applicationApiSlice";
import Spinner from "../../components/elements/Spinner/Spinner";
import DataTable from "../../components/layouts/DataTable";
import uuid from "react-uuid";
import ModalDataAdd from "./LogDetail/ModalDataAdd";
import ButtonDetail from "../../components/elements/Button/ButtonDetail";

export default function LogActivityTable() {
    let content;
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPage, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [date, setDate] = useState({});
    const [selectedRoleId, setSelectedRoleId] = useState("");
    const [isEmployee, setIsEmployee] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); 

    // Filter App
    const [appOpt, setAppOpt] = useState([]);
    const [appIdOpt, setAppIdOpt] = useState([]);

    // Filter Role
    const [roleOpt, setRoleOpt] = useState([]);

    const {
        data: logActivities,
        isLoading: logLoading,
        isSuccess: logSuccess,
        isError: logError,
    } = useGetLogActivityQuery(
        {
            search: search,
            page: page,
            limit: pageSize,
            startDate: date.startDate ? date.startDate : "",
            endDate: date.endDate ? date.endDate : "",
            role: selectedRoleId,
            apps: appIdOpt,
        },
        { refetchOnMountOrArgChange: true }
    );

    const cols = useMemo(() => {
        const staticColumns = [
            {
                id: uuid(),
                header: "",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.no || "",
            },
            {
                id: uuid(),
                header: "Name",
                isBlack: true,
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.employee.fullName || "",
            },
            {
                id: uuid(),
                header: "Email",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.employee.email || "",
            },
            {
                id: uuid(),
                header: "Nik",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.employee.nik || "",
            },
        ];

        const dynamicColumns = isEmployee
            ? [
                  {
                      id: uuid(),
                      header: "Application",
                      cell: (row) => row.renderValue(),
                      accessorFn: (row) => row.action || "",
                  },
                  {
                      id: uuid(),
                      header: "Start Date",
                      cell: (row) => row.renderValue(),
                      accessorFn: (row) =>
                          formatDateTime(row.createdDate) || "",
                  },
                  {
                      id: uuid(),
                      header: "End Date",
                      cell: (row) => row.renderValue(),
                      accessorFn: (row) =>
                          formatDateTime(row.createdDate) || "",
                  },  
              ]
            : [
                  {
                      id: uuid(),
                      header: "Action",
                      cell: (row) => row.renderValue(),
                      accessorFn: (row) => row.action || "",
                  },
                  {
                      id: uuid(),
                      header: "Date Modified",
                      cell: (row) => row.renderValue(),
                      accessorFn: (row) => row.createdDate || "",
                  },
                  {
                    id: uuid(),
                    header: "Detail",
                    cell: (row) => (
                        <div className='w-full'>
                            <ButtonDetail
                                type={"button"}
                                className={"w-24"}
                                onClick={() => {
                                    setOpenModal(true);
                                    setSelectedUser(row);
                                }}
                            />
                        </div>
                    ),
                },
                  
              ];

        return [...staticColumns, ...dynamicColumns];
    }, [logActivities, selectedRoleId, isEmployee]);

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

    // Filter Role
    const {
        data: roles,
        isLoading: roleLoading,
        isSuccess: roleSuccess,
        isError: roleError,
    } = useGetRoleQuery();

    useEffect(() => {
        if (roleSuccess && roles && roles.data) {
            const employeeRole = roles.data.filter((role) =>
                role.roleName.toLowerCase().includes("employee")
            );
            if (employeeRole) {
                setRoleOpt(
                    employeeRole.map((role) => [
                        role.id,
                        role.roleName.charAt(5).toUpperCase() +
                            role.roleName.slice(6).toLowerCase(),
                    ])
                );
                setSelectedRoleId(employeeRole[0].id);
            }
            // const adminRole = roles.data.filter((role) =>
            //     role.roleName.toLowerCase().includes("admin")
            // );
            // if (adminRole) {
            //     setRoleOpt(
            //         adminRole.map((role) => [
            //             role.id,
            //             role.roleName.charAt(5).toUpperCase() +
            //                 role.roleName.slice(6).toLowerCase(),
            //         ])
            //     );
            //     setSelectedRoleId(adminRole[0].id);
            // }
        }
    }, [roles]);

    const handleRowClick = (user) => {
        setSelectedUser(user); 
        setOpenModal(true); 
    };

    const handleRoleSelect = (selectedRole) => {
        if (roleOpt[0][0] !== selectedRole[0]) {
            setRoleOpt([selectedRole]);
            setIsEmployee(!isEmployee);
        }
    };

    let filteredRoleOptions = [];
    if (roleSuccess && roles && roles.data) {
        filteredRoleOptions = roles.data.map((role) => ({
            id: role.id,
            name:
                role.roleName.charAt(5).toUpperCase() +
                role.roleName.slice(6).toLowerCase(),
        }));
    }

    useEffect(() => {
        if (roleOpt.length === 0) {
            setSelectedRoleId("");
        } else {
            setSelectedRoleId(roleOpt[0][0]);
        }
    }, [roleOpt]);

    // Filter App
    const {
        data: applications,
        isSuccess: applicationSuccess,
        isError: applicationError,
        isLoading: applicationLoading,
    } = useGetApplicationQuery(
        { 
            page: 1, 
            limit: 100, 
        }
    );
    
    const colsadd = useMemo(() => {
        const dataChanged = [
            {
                id: uuid(),
                header: "",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.no || "",
            },
            {
                id: uuid(),
                header: "AppName",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => {
                    console.log("row", row);
                    console.log("row.new_value:", row.new_value);
                    const newValueObj = row.new_value ? JSON.parse(row.new_value) : {};
                    console.log("newValueObj:", newValueObj);
                    return newValueObj.nameApp || "";
                },
            },
            {
                id: uuid(),
                header: "URL",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => {
                    const newValueObj = row.new_value ? JSON.parse(row.new_value) : {};
                    return newValueObj.urlApp || "";
                },
            },
            {
                id: uuid(),
                header: "LOGO",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => {
                    const newValueObj = row.new_value ? JSON.parse(row.new_value) : {};
                    return newValueObj.image_name || "";
                },
            },
            {
                id: uuid(),
                header: "STATUS",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => {
                    const newValueObj = row.new_value ? JSON.parse(row.new_value) : {};
                    return newValueObj.isActive ? "Active" : "Inactive";
                },
            },
        ];
    
        return [...dataChanged];
    }, [logActivities]);
    
    


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

    const handleSearchChange = (value) => {
        setSearch((prev) => {
            if (value !== prev) setPage(1);
            return value.toString();
        });
    };

    const handlePageChange = (newPageNumber) => {
        setPage(newPageNumber);
    };

    if (logLoading || roleLoading || applicationLoading) content = <Spinner />;

    if (logError) {
        content = (
            <div className='py-5 text-center text-xl font-semibold text-brm-font-black'>
                Data Not Found
            </div>
        );
    }

    if (roleSuccess && logSuccess && applicationSuccess) {
        const pagination = logActivities.pagination;
        content = (
            <>
                <DataTable
                    rowCount={pagination.totalRecords}
                    data={logActivities.data}
                    columns={cols}
                    showPageSize
                    showGlobalFilter
                    showPagination
                    searchQuery={search}
                    searchHandler={handleSearchChange}
                    placeholder={"Search by name or email..."}
                    pageIndex={pagination.currentPage}
                    pageCount={totalPage}
                    pageSize={pageSize}
                    pageChange={(pageIndex) => handlePageChange(pageIndex + 1)}
                    setPageSize={setPageSize}
                    showFilterRole
                    filterRole={roleOpt}
                    setFilterRole={(role) => handleRoleSelect(role)}
                    filterRoleOptions={filteredRoleOptions}
                    showFilterApp={isEmployee}
                    setFilterApp={(app) => handleAppSelect(app)}
                    filterApp={appOpt}
                    filterAppOptions={filterAppOptions}
                    handleDeleteFilteredApp={(app) =>
                        handleDeleteFilteredApp(app)
                    }
                    showFilterDate
                    filterDate={date}
                    setFilterDate={handleDateFilter}
                />
                <ModalDataAdd
                    open={openModal}
                    setOpen={setOpenModal}
                    titleForm={selectedUser ? selectedUser.action : 'logaction'}
                    selectedUser={selectedUser}
                />

                {/* New DataTable for Applications */}
                <DataTable
                    rowCount={pagination.totalRecords}
                    onRowClick={handleRowClick}
                    data={logActivities.data}
                    columns={colsadd}
                    filterApp={roleOpt}
                    pageindex={page}
                    pageCount={totalPage}
                    pageSize={pageSize}
                    pageChange={(pageindex) => handlePageChange(pageindex + 1)}
                    
                />
            </>
        );
    }
    return content;
}
