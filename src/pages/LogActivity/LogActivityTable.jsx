import { useEffect, useMemo, useState } from "react";
import { useGetLogActivityQuery } from "../../services/logActivityApiSlice";
import { useGetRoleQuery } from "../../services/roleApi.Slice";
import { useGetApplicationQuery } from "../../services/applicationApiSlice";
import { Button } from "../../components";
// import {Daterangetype} from "react-tailwindcss-datepicker";
import Spinner from "../../components/elements/Spinner/Spinner";
import DataTable from "../../components/layouts/DataTable";
import uuid from "react-uuid";
import ButtonDetail from "../../components/elements/Button/ButtonDetail";
import InputCheckbox from "../../components/elements/Input/InputCheckbox";
import ModalDataManageUser from "./LogDetail/ModalDataManageUser";
import ModalDataManageApp from "./LogDetail/ModalDataManageAPp";
import ModalDataAddApp from "./LogDetail/ModalDataAddApp";

export default function LogActivityTable() {
    let content;
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPage, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [date, setDate] = useState({});
    const [selectedRoleId, setSelectedRoleId] = useState("");
    const [isEmployee, setIsEmployee] = useState(true);
    const [openEditAppModal, setOpenEditAppModal] = useState(false);
    const [openAddModal, setOpenAddAppModal] = useState(false);
    const [openEditUserModal, setOpenEditUserModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});

    // Filter App
    const [appOpt, setAppOpt] = useState([]);
    const [appIdOpt, setAppIdOpt] = useState([]);

    // Filter Role
    const [roleOpt, setRoleOpt] = useState([]);

    const {
        data: logActivities,
        isLoading: logLoading,
        // control,
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

        const handleDetailModal = (action) => {
            // Logic to open modal based on row.action
            if (action === "EDIT_APPLICATION") {
                setOpenEditAppModal(true);
            } else if (action === "ADD_APPLICATION") {
                setOpenAddAppModal(true);
            } else if (action === "EDIT_USER") {
                setOpenEditUserModal(true);
            }
        };

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
                      accessorFn: (row) => {
                          return row.action
                              .split("_")
                              .map(
                                  (word) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1)
                              )
                              .join(" ");
                      },
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
                      cell: (row) => row.renderValue(),
                      accessorFn: (row) => (
                          <div className='w-full flex items-center justify-center'>
                              <ButtonDetail
                                  type={"button"}
                                  className={"w-24"}
                                  onClick={() => {
                                      handleDetailModal(row.action);
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
        }
    }, [roles]);

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
    } = useGetApplicationQuery({
        page: 1,
        limit: 100,
    });

    const colsapp = useMemo(() => {
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
                    const newValueObj = row.newValue
                        ? JSON.parse(row.newValue)
                        : {};
                    return newValueObj.nameApp || "";
                },
            },
            {
                id: uuid(),
                header: "URL",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => {
                    const newValueObj = row.newValue
                        ? JSON.parse(row.newValue)
                        : {};
                    return newValueObj.urlApp || "";
                },
            },
            {
                id: uuid(),
                header: "LOGO",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => {
                    const newValueObj = row.newValue
                        ? JSON.parse(row.newValue)
                        : {};
                    return newValueObj.image_name || "";
                },
            },
            {
                id: uuid(),
                header: "STATUS",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => {
                    const newValueObj = row.newValue
                        ? JSON.parse(row.newValue)
                        : {};
                    return newValueObj.isActive ? "Active" : "Inactive";
                },
            },
        ];

        return [...dataChanged];
    }, [logActivities]);

    const colsuser = useMemo(() => {
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
                accessorFn: (row) => row.name || "",
            },
            {
                id: uuid(),
                header: "Email",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.email || "",
            },
            {
                id: uuid(),
                header: "NIK",
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.nik || "",
            },
            {
                id: uuid(),
                header: "Role",
                cell: (row) => row.renderValue(),
                accessorFn: (row) =>
                    row.roleName.charAt(5).toUpperCase() +
                        row.roleName.slice(6).toLowerCase() || "",
            },
        ];

        const dynamicColumnObjects = applications
            ? applications.data.map((app) => ({
                  id: uuid(),
                  header: app.name,
                  cell: (row) => row.renderValue(),
                  accessorFn: (row) => (
                      <InputCheckbox
                          value={app.name}
                          app={row.authorizedApplications.map(
                              (application) => application.name
                          )}
                      />
                  ),
              }))
            : [];

        return [...staticColumns, ...dynamicColumnObjects];
    }, [applications]);

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
                    showFilter
                    showFilterDate
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
                    filterDate={date}
                    setFilterDate={handleDateFilter}
                />

                <ModalDataAddApp
                    open={openAddModal}
                    setOpen={setOpenAddAppModal}
                    titleForm={selectedUser?.action}
                    selectedUser={selectedUser}
                    columns={colsapp}
                />

                <ModalDataManageApp
                    open={openEditAppModal}
                    setOpen={setOpenEditAppModal}
                    titleForm={selectedUser?.action || "Log Action"}
                    selectedUser={selectedUser}
                    columns={colsapp}
                />

                <ModalDataManageUser
                    open={openEditUserModal}
                    setOpen={setOpenEditUserModal}
                    titleForm={selectedUser?.action || "Log Action"}
                    selectedUser={selectedUser}
                    columns={colsuser}
                />
            </>
        );
    }
    return content;
}
