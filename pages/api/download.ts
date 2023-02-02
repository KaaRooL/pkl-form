import  auth  from "express-basic-auth";
import fs from "fs";
import { readFile } from 'fs/promises';

import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';
import initMiddleware from "../../utils/auth-middleware";
import { Lead } from "../../utils/lead";

const FILENAME = 'leads.json';

async function fileReader() {

  try {
    const fileContents = await readFile('./data/leads.json', { encoding: 'utf8' });
    return fileContents;

  } catch (err) {
    console.error(err);
  }
}

let user = process.env.USER_NAME || "";
let password = process.env.PASSWORD || "";

const basicAuth = auth({
  users: { [user]: password },
  challenge: true
});

const authMiddleware = initMiddleware(basicAuth);

async function generateCsv() {
  const content = await fileReader() ?? '';
  const header = "Nazwa placówki,Imię i nazwisko,Telefon,Email";

  const rows: [Lead] = JSON.parse(content);
  let csvFormatArray = rows.map(r => `${r.company},${r.name},${r.phone},${r.email}`);

  csvFormatArray.unshift(header);
  const csvFormat = csvFormatArray.join("\r\n");
  var BOM = "\uFEFF";
  var csvData = BOM + csvFormat;
  var blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
  
  const csvContent = Buffer.from( await blob.arrayBuffer() );
  return csvContent;
}




const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (user && password) {

    await authMiddleware(req, res).then(async a => {
      if (!FILENAME) {
        return res.status(404).send("Plik nie znaleziony");
      }

      const filePath = path.join(process.cwd(), `./data/${FILENAME}`);

      try {
        fs.accessSync(filePath, fs.constants.R_OK);
      } catch (err) {
        return res.status(404).send("Plik nie znaleziony");
      }

      let csvContent = await generateCsv();



      res.setHeader(
        "content-disposition",
        `attachment; filename=leads.csv`,
      );

      res.setHeader(
        "content-type", "text/csv; charset=UTF-8",
      );


      res.send(csvContent);
    }).catch(() => {
      console.log("Errororor");
      res.setHeader('WWW-Authenticate', 'Basic') 
      res.status(401).send('Authentication required.')
    })
  }
};

export default handler;


