﻿const fs = require("fs");
const path = require('path');

module.exports = async function (context, req) {
    console.log(req)

    const staticFolder = __dirname;
    const reqFile = req.query.file || "alu.html";
    const file = path.join(staticFolder, reqFile);

    console.log(`static folder: ${staticFolder}`);
    console.log(`file: ${file}`);

    if (path.relative(staticFolder, path.dirname(file)) != "") {
        return {
            status: 403,
            body: "Forbidden",
            headers: {
                "Content-Type": "text/html"
            }
        }
    }

    try {
        const page = fs.readFileSync(file, "utf8")
        return {
            status: 200,
            body: page,
            headers: {
                "Content-Type": "text/html"
            }
        }
    } catch (error) {
        if (error.code == 'ENOENT') {
            return {
                status: 404,
                body: "File Not Found",
                headers: {
                    "Content-Type": "text/html"
                }
            }
        } else {
            return {
                status: 500,
                body: "Internal Server Error",
                headers: {
                    "Content-Type": "text/html"
                }
            }
        }
    }
};