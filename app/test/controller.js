const db = require("../../db")

module.exports={
    index: async(req, res) => {
        try {
            const data = await db.query("select * from mahasiswa")
            res.status(200).json({
                data: data.rows
            })
        } catch (err) {
            console.log(err)
        }
    }
}