import { useEffect, useMemo, useState } from "react";
import DataTable from "../../../components/layouts/DataTable";
import uuid from "react-uuid";
import { useGetRoleQuery } from "../../../services/roleApi.Slice";
import { useGetApplicationQuery } from "../../../services/applicationApiSlice";
import { ButtonIcon } from "../../../components/index.js";
import { TrashIcon } from "@heroicons/react/24/solid";

export default function TemporaryAddUserTable({ userData, onDelete }) {
    let content;
    const [roleOpt, setRoleOpt] = useState([]);
    const [appOpt, setAppOpt] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredUserData, setFilteredUserData] = useState([]);

    const {
        data: applications,
        isLoading: applicationIsLoading,
        isError: applicationIsError,
    } = useGetApplicationQuery({ page: 1, limit: 100 });

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
                    row.role.charAt(5).toUpperCase() +
                        row.role.slice(6).toLowerCase() || "",
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

        const actionColumn = {
            id: uuid(),
            header: "",
            cell: (row) => row.renderValue(),
            accessorFn: (row) => (
                <ButtonIcon
                    children={<TrashIcon className='w-6 h-6 text-red-600' />}
                    type={"button"}
                    onClick={() => onDelete(row.id)}
                />
            ),
        };

        return [...staticColumns, ...dynamicColumnObjects, actionColumn];
    }, [applications]);

    useEffect(() => {
        setFilteredUserData(userData);
    }, [userData]);

    useEffect(() => {
        setFilteredUserData(
            userData.filter((user) =>
                (user.firstName + " " + user.lastName)
                    .toLowerCase()
                    .includes(search.toLowerCase())
            )
        );
    }, [userData, search]);

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

    useEffect(() => {
        setFilteredUserData(
            userData.filter((user) =>
                appOpt.every((app) =>
                    user.authorizedApplications.some(
                        (authApp) => authApp.id === app[0]
                    )
                )
            )
        );
    }, [appOpt, userData]);

    let filterAppOptions = [];

    if (!applicationIsLoading && !applicationIsError && applications.data) {
        filterAppOptions = applications.data.map((app) => ({
            id: app.id,
            name: app.name,
        }));
    }

    useEffect(() => {
        setFilteredUserData(
            userData.filter((user) =>
                user.roleName.includes(
                    roleOpt.length === 1
                        ? roleOpt[0][0]
                        : roleOpt.length === 0
                        ? ""
                        : null
                )
            )
        );
    }, [roleOpt, userData]);

    const handleDeleteFilteredRole = (selectedRoleId) => {
        setRoleOpt(roleOpt.filter((role) => role[0] !== selectedRoleId));
    };

    const handleRoleSelect = (selectedRole) => {
        if (roleOpt.find((role) => role[0] === selectedRole[0])) {
            handleDeleteFilteredRole(selectedRole[0]);
        } else {
            setRoleOpt([...roleOpt, selectedRole]);
        }
    };

    const handleSearchChange = (value) => {
        setSearch(value.toString());
    };

    const {
        data: roles,
        isLoading: rolesIsLoading,
        isError: rolesIsError,
    } = useGetRoleQuery();

    let filterRoleOptions = [];

    if (!rolesIsLoading && !rolesIsError && roles.data) {
        filterRoleOptions = roles.data.map((role) => ({
            id: role.roleName,
            name:
                role.roleName.charAt(5).toUpperCase() +
                role.roleName.slice(6).toLowerCase(),
        }));
    }

    content = (
        <>
            <DataTable
                title={"Temporary Table"}
                showTitle={true}
                data={filteredUserData}
                columns={cols}
                showGlobalFilter
                showFilterRole={true}
                filterRole={roleOpt}
                setFilterRole={handleRoleSelect}
                filterRoleOptions={filterRoleOptions}
                placeholder={"Search employee name..."}
                searchQuery={search}
                searchHandler={handleSearchChange}
                showFilterApp={true}
                setFilterApp={(app) => handleAppSelect(app)}
                filterApp={appOpt}
                filterAppOptions={filterAppOptions}
                handleDeleteFilteredApp={(app) => handleDeleteFilteredApp(app)}
                handleDeleteFilteredRole={(role) =>
                    handleDeleteFilteredRole(role)
                }
            />
        </>
    );
    return content;
}
