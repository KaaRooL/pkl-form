import { DatabaseRepository } from './../../utils/database-repository';
import auth from "express-basic-auth";
import { NextApiRequest, NextApiResponse } from 'next';
import initMiddleware from "../../utils/auth-middleware";
import { Lead } from '../../utils/lead';


let user = process.env.USER_NAME || "";
let password = process.env.PASSWORD || "";

const basicAuth = auth({
  users: { [user]: password },
  challenge: true
});

const authMiddleware = initMiddleware(basicAuth);

async function generateCsv(): Promise<Buffer> {
  return await getLeads().then(async leads => {
    if(leads.length <= 0){
      throw new Error("No leads in database. Provide data or check for other errors.");      
    }
    const header = "Nazwa placówki,Imię i nazwisko,Telefon,Email";
    let csvFormatArray = leads.map((r:Lead) => `${r.company},${r.name},${r.phone},${r.email}`);
    csvFormatArray.unshift(header);
    const csvFormat = csvFormatArray.join("\r\n");
    var BOM = "\uFEFF";
    var csvData = BOM + csvFormat;
    var blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });

    const csvContent = Buffer.from(await blob.arrayBuffer());
    return csvContent;
  })
}

async function getLeads() {
  const repository = new DatabaseRepository();
  return await repository.getLeads();
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (user && password) {

    await authMiddleware(req, res)
    .catch(() => {
      res.setHeader('WWW-Authenticate', 'Basic')
      res.status(401).send('Authentication required.')
    })
    .then(async _=> await generateCsv())
    .catch(err => {
      res.status(400).send('Data fetching failed.')
      console.log(`There was a problem with CSV Generation. Error: ${err}`);
    })
    .then(csvContent => {
      createResponse(res, csvContent);
    })
    .catch(err => {
      res.status(400).send('Data fetching failed.')
      console.log(`There was a problem with Response Creation. Error: ${err}`);
    })
  }
};

export default handler;


function createResponse(res: NextApiResponse<any>, csvContent: void|Buffer) {
  const date = new Date().toLocaleDateString();

  res.setHeader(
    "content-disposition",
    `attachment; filename=szkoly_kampania_${date}.csv`
  );

  res.setHeader(
    "content-type", "text/csv; charset=UTF-8"
  );

  res.send(csvContent);
}

