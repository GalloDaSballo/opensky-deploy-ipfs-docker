import express from "express";
import cors from "cors";
import compiledAndDeploy from "./compileAndDeploy";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json()); // Parse JSON bodies

app.get("/", (req, res) => {
  res.send({
    message: "Please make a POST request with address a body parameter",
  });
});

app.post("/", async (req, res) => {
  const { address } = req.body;
  if (!address) {
    return res
      .status(400)
      .json({ error: "Please add an address in the request post" });
  }
  const result = await compiledAndDeploy(address);
  const ipfsHash = /Qm\w{44}/.exec(result);
  res.send({ hash: ipfsHash });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
