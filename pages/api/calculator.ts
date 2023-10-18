import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
    console.log('fetching travel1');
      if (req.body.type === "fetchGroceries") {
        return await fetchGroceries(req, res);
      } else if (req.body.type === "fetchTravel") {
        console.log('fetching travel2');
        
        return await fetchTravel(req, res);
      }
    } else {
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.log("Error is ", error);
    res.status(500).json({ message: "error fetching" });
  }
}

async function fetchGroceries(req: NextApiRequest, res: NextApiResponse) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const proteins = req.body.proteins;
    const fats = req.body.fats;
    const carbs = req.body.carbs;
    const response = await axios.get(
      `https://7x28rruqw7.execute-api.sa-east-1.amazonaws.com/dev/grocery?proteins=${proteins}&fats=${fats}&carbs=${carbs}`,
      {
        headers: headers,
      }
    );
    if (response) {
      res.status(200).json({ message: "Info fetched!", data: response.data });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching groceries" });
  }
}
async function fetchTravel(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('fetching travel3');
    const headers = {
      "Content-Type": "application/json",
    };
    const distance = req.body.distance;
    const nights = req.body.nights;

    const response = await axios.get(
      `https://7x28rruqw7.execute-api.sa-east-1.amazonaws.com/dev/travel?distance=${distance}&nights=${nights}`,
      {
        headers: headers,
      }
    );
    console.log('fetching travel4');
    if (response) {
      res.status(200).json({ message: "Info fetched!", data: response.data });
      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching travel info" });
  }
}
