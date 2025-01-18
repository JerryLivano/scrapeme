import * as XLSX from "xlsx";

export const mergeExportExcel = (dataList) => {
    const colsName = ["name", "type", "location", "price", "bedroom", "bathroom", "building", "surface"];
    const mergedData = [];

    const formatData = dataList.map((data) =>
        data.map((item) => {
            const formattedItem = {};
            colsName.forEach((col) => {
                const matchingKey = Object.keys(item).find((key) => key.toLowerCase().includes(col.toLowerCase()));
                formattedItem[col] = matchingKey ? item[matchingKey] : "-";
            });
            return formattedItem;
        })
    );

    formatData.forEach((formattedList) => {
        mergedData.push(...formattedList);
    });

    const ws = XLSX.utils.json_to_sheet(mergedData);

    const range = XLSX.utils.decode_range(ws["!ref"]);
    for (let col = range.s.c; col <= range.e.c; col++) {
        const headerCell = ws[XLSX.utils.encode_cell({ r: 0, c: col })];
        if (headerCell && headerCell.v) {
            headerCell.v = headerCell.v
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
        }
    }

    if (!ws["!cols"]) {
        ws["!cols"] = colsName.map(() => ({ wch: 15 }));
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const date = new Date();
    XLSX.writeFile(wb, `Merged Data - ${date.toISOString().substring(0, 10)}.xlsx`);
};
