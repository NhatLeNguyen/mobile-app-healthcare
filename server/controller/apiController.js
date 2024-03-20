import pool from "../configs/connectDB.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

let savePracticeHistory = async (req, res) => {
  try {
    console.log(req.body);
    let {
      id,
      start_time,
      end_time,
      date,
      steps,
      distances,
      praticetime,
      caloris,
      posList,
    } = req.body;
    await pool.execute(
      "insert into practicehistory(user_id, start_time, end_time, date, steps, distances, practice_time, caloris, posList) values(?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        id,
        start_time,
        end_time,
        date,
        steps,
        distances,
        praticetime,
        caloris,
        posList,
      ]
    );
    return res.status(200).send("Success");
  } catch (err) {
    console.log(err);
    return res.status(400).send("Fail");
  }
};

let getDailyPracticeDetail = async (req, res) => {
  try{
    console.log(req.query);
    let {id ,date} = req.query;
    let data = await pool.execute('select * from practicehistory where user_id = ? and date = ?', [id, date])
    console.log(data[0]);
    return res.status(200).send({data: data[0]})
  }catch (err){
    console.log(err);
    return res.status(400).send("Fail")
  }
}

export default {
  savePracticeHistory,
  getDailyPracticeDetail
};
