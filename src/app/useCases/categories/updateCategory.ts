import { Request, Response } from "express";
import { Category } from "../../models/Category";

export async function updateCategory(req: Request, res: Response) {
  try {
    const { name, icon } = req.body;

    if (!name) {
      res.status(200).json({ message: "Name is required!" });
    } else if (!icon) {
      res.status(200).json({ message: "Icon is required!" });
    }

    await Category.updateOne({ name, icon });

    res.status(200).json({ message: "Successfully updated" });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}
