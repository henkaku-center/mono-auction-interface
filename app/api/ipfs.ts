import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "GET") {
      res
        .status(405)
        .json({ status: "error", error: `'${req.method}' method not allowed` });
      return;
    }

    if (!req.query.uri) {
      res.status(400).json({ status: "error", error: "No URI provided" });
      return;
    }

    const { data } = await axios.get(req.query.uri.toString(), {
      headers: {
        Accept: "text/plain",
      },
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ status: "failed", error });
  }
};

export default handler;
