import { Lead } from './lead';
import mysql from 'mysql2/promise';



export class DatabaseRepository {



  public async insert(lead: Lead) {
    const connection = await this.getConnection;
    connection()
    .then(c=>{
       c.execute(`INSERT INTO leads values (NULL, '${lead.company}', '${lead.name}','${lead.email}','${lead.phone}')`); 
       c.end() 
    })    
    .catch(err=>{
      console.log(`There was a problem with inserting records to database. Error: ${err}`);
      throw new Error(`There was a problem with inserting records to database. Error: ${err}`);
    })       
  }

  public async getLeads() {
    
    const connection = await this.getConnection;  

    return connection().then(c=>{
      const result = c.query("SELECT Institution, Name, Email, Phone FROM leads");
      c.end();
      return result;
    })
    .catch(err=>console.log(`There was a problem with connection to database. Error: ${err}`))       
    .then((result:any)=>{
      const leads: [Lead] = result[0].map((r:any)=>{
        return <Lead>{
        company: r.Institution,
        name: r.Name,
        email: r.Email,
        phone: r.Phone
      }})
      return leads;
    })
    .catch(err=>{
      console.log(`There was a problem with getting result from database. Error: ${err}`);
      throw new Error(`There was a problem with getting result from database. Error: ${err}`);
    })  
  }

  async getConnection() {
    const connection = await mysql.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME
    });
  
    return connection;
  }
}
