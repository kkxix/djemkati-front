exports.getLines = async (client, Page_ID) => {
    var lines = []
    var linesFromDb = await client.query(`
        select id, image, number_in_page, number_in_manuscript, page_id, shape from Sobti_line where page_id = ${Page_ID}
    `)
    if (linesFromDb.rows.length === 0){
        return null;
    }
    linesFromDb.forEach(line => {
        lines.push({
            ID: line.id,
            Image: line.image,
            Number_In_Page: line.number_in_page,
            Number_In_Manuscript: line.number_in_manuscript,
            Page_ID: line.page_id,
            Shape: line.page_id
        })
    })

    return lines;
}