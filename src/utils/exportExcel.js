import * as XLSX from "xlsx";

export const exportExcel = (data, scrapeName, scrapeDate) => {
    const ws = XLSX.utils.json_to_sheet(data);

    const range = XLSX.utils.decode_range(ws["!ref"]);
    for (let col = range.s.c; col <= range.e.c; col++) {
        const headerCell =
            ws[
            XLSX.utils.encode_cell({ r: 0, c: col })
            ];
        if (headerCell && headerCell.v) {
            headerCell.v = headerCell.v
                .split(" ")
                .map(
                    (word) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1)
                )
                .join(" ");
        }
    }

    if (!ws['!cols']) {
        ws['!cols'] = [];
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(
        wb,
        `${scrapeName.trim() !== ""
            ? scrapeName
            : "Scraped Data"
        } - ${scrapeDate}.xlsx`
    );
}