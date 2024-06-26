import { useEffect, useMemo, useState } from "react";
import { useGetLogActivityQuery } from "../../services/logActivityApiSlice";
import { useGetRoleQuery } from "../../services/roleApi.Slice";
import { useGetApplicationQuery } from "../../services/applicationApiSlice";
import Spinner from "../../components/elements/Spinner/Spinner";
import DataTable from "../../components/layouts/DataTable";
import uuid from "react-uuid";
import ButtonDetail from "../../components/elements/Button/ButtonDetail";
import InputCheckbox from "../../components/elements/Input/InputCheckbox";
import ModalDetailAddLog from "./ModalDetailAddLog";
import ModalDetailEditLog from "./ModalDetailEditLog";

export default function LogActivityTable() {
    let content;
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPage, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [date, setDate] = useState({});
    const [selectedRoleId, setSelectedRoleId] = useState("");
    const [isEmployee, setIsEmployee] = useState(true);

    // Open Modal
    const [selectedData, setSelectedData] = useState({});
    const [detailType, setDetailType] = useState("");
    const [oldData, setOldData] = useState([]);
    const [newData, setNewData] = useState([]);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

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

    useEffect(() => {
        if (logSuccess && logActivities) {
            setTotalPages(logActivities.pagination.totalPages);
        }
    }, [logSuccess, logActivities]);

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
                isCenter: true,
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.employee.email || "",
            },
            {
                id: uuid(),
                header: "Nik",
                isCenter: true,
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.employee.nik || "",
            },
        ];

        const dynamicColumns = isEmployee
            ? [
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
                      accessorFn: (row) =>
                          formatDateTime(row.createdDate) || "",
                  },
              ]
            : [
                  {
                      id: uuid(),
                      header: "Action",
                      isCenter: true,
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
                      isCenter: true,
                      cell: (row) => row.renderValue(),
                      accessorFn: (row) =>
                          formatDateTime(row.createdDate) || "",
                  },
                  {
                      id: uuid(),
                      header: "Detail",
                      cell: (row) => row.renderValue(),
                      accessorFn: (row) => (
                          <div className='w-full flex items-center justify-center'>
                              <ButtonDetail
                                  type={"button"}
                                  onClick={() => {
                                    console.log(row)
                                      if (
                                          row.action
                                              .toLowerCase()
                                              .includes("edit")
                                      ) {
                                          setOpenEditModal(true);
                                      } else if (
                                          row.action
                                              .toLowerCase()
                                              .includes("add")
                                      ) {
                                          setOpenAddModal(true);
                                      }
                                      setOldData(
                                          row.oldValue
                                              ? [JSON.parse(row.oldValue)]
                                              : []
                                      );
                                      setNewData([JSON.parse(row.newValue)]);
                                      setDetailType(
                                          row.type.charAt(0) +
                                              row.type.slice(1).toLowerCase()
                                      );
                                      setSelectedData(row);
                                  }}
                              />
                          </div>
                      ),
                  },
              ];

        return [...staticColumns, ...dynamicColumns];
    }, [logActivities, selectedRoleId, isEmployee]);

    // Application
    const {
        data: applications,
        isSuccess: applicationSuccess,
        isError: applicationError,
        isLoading: applicationLoading,
    } = useGetApplicationQuery({
        page: 1,
        limit: 100,
    });

    const colsApp = useMemo(
        () => [
            {
                id: uuid(),
                header: "",
                isCenter: true,
                cell: (row) => row.row.index + 1,
                accessorFn: (row, i) => i + 1,
            },
            {
                id: uuid(),
                header: "App Name",
                isCenter: true,
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.nameApp,
            },
            {
                id: uuid(),
                header: "URL",
                isCenter: true,
                cell: (row) => row.renderValue(),
                accessorFn: (row) => (
                    <a
                        href={row.urlApp}
                        target='_blank'
                        className='underline text-blue-700'
                    >
                        {row.urlApp}
                    </a>
                ),
            },
            {
                id: uuid(),
                header: "LOGO",
                isCenter: true,
                cell: (row) => row.renderValue(),
                accessorFn: (row) => (
                    <a
                        href={row.image}
                        target='_blank'
                        className='underline text-blue-700'
                    >
                        {row.image_name}
                    </a>
                ),
            },
            {
                id: uuid(),
                header: "STATUS",
                isCenter: true,
                cell: (row) => row.renderValue(),
                accessorFn: (row) => (row.isActive ? "ACTIVE" : "INACTIVE"),
            },
        ],
        [logActivities]
    );

    const colsUser = useMemo(() => {
        const staticColumns = [
            {
                id: uuid(),
                header: "",
                isCenter: true,
                cell: (row) => row.row.index + 1,
                accessorFn: (row, i) => i + 1,
            },
            {
                id: uuid(),
                header: "Name",
                isBlack: true,
                isCenter: true,
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.name || "",
            },
            {
                id: uuid(),
                header: "Email",
                isCenter: true,
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.email || "",
            },
            {
                id: uuid(),
                header: "NIK",
                isCenter: true,
                cell: (row) => row.renderValue(),
                accessorFn: (row) => row.nik || "",
            },
            {
                id: uuid(),
                header: "Role",
                isCenter: true,
                cell: (row) => row.renderValue(),
                accessorFn: (row) =>
                    row.role.charAt(5).toUpperCase() +
                        row.role.slice(6).toLowerCase() || "",
            },
        ];

        const dynamicColumnObjects = applications
            ? applications.data.map((app) => ({
                  id: uuid(),
                  header: app.name,
                  isCenter: true,
                  cell: (row) => row.renderValue(),
                  accessorFn: (row) => (
                      <InputCheckbox
                          value={app.name}
                          app={row.authorizedApplications}
                      />
                  ),
              }))
            : [];

        const staticColumnsStatus = [
            {
                id: uuid(),
                header: "Status",
                isCenter: true,
                cell: (row) => row.renderValue(),
                accessorFn: (row) => (row.isActive ? "ACTIVE" : "INACTIVE"),
            },
        ];

        return [
            ...staticColumns,
            ...dynamicColumnObjects,
            ...staticColumnsStatus,
        ];
    }, [logActivities, applications]);

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
            if (selectedRole[1].toLowerCase().includes("employee")) {
                setIsEmployee(true);
            } else {
                setIsEmployee(false);
            }
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
        const { data, pagination } = logActivities;
        const dataCount = pagination.totalRecords;
        content = (
            <>
                <DataTable
                    rowCount={dataCount}
                    data={data}
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

                <ModalDetailAddLog
                    open={openAddModal}
                    setOpen={setOpenAddModal}
                    titleForm={detailType}
                    columns={
                        detailType.toLowerCase().includes("application")
                            ? colsApp
                            : colsUser
                    }
                    data={newData}
                />

                <ModalDetailEditLog
                    open={openEditModal}
                    setOpen={setOpenEditModal}
                    titleForm={detailType}
                    columns={
                        detailType.toLowerCase().includes("application")
                            ? colsApp
                            : colsUser
                    }
                    oldData={oldData}
                    newData={newData}
                />
            </>
        );
    }
    return content;
}
