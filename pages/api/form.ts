import { DatabaseRepository } from './../../utils/database-repository';
import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';
import sendEmail from '../../utils/mailing-service';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try{
    const body = req.body
    var repository = new DatabaseRepository();
    await repository.insert(body)
    await sendEmail(body);  
    res.status(200).json({ data: "Data has been saved" });
  }
  catch(err){
    console.log(`There was a problem with inserting to datbase or email send.`);
    res.status(400).json({ data: "There was a problem with inserting to datbase or email send." });
  }
  
}
