import { useState } from "react";
import { useGetLogActivityQuery } from "../../services/logActivityApiSlice";

export default function LogActivityTable({}) {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalPage, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [date, setDate] = useState({});
    const [selectedRole, setSelectedRole] = useState([]);

    const {
        data: logActivities,
        isLoading: logLoading,
        isSuccess: logSuccess,
        isError: logError
    } = useGetLogActivityQuery({search: search, page: page, limit: pageSize, startDate: date.startDate ?? "", endDate: date.endDate ?? "", role})
}
