import type { Request, Response, NextFunction } from 'express'
import { person } from '../models/Person'
import HttpException from '../exception'

export const AttendanceHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { fullName, email, phoneNumber, major } = req.body
  const existingPerson = await person.exists({ email })
  if (existingPerson != null) {
    next(new HttpException(400, 'A user has already submitted this email. Please choose another')); return
  }
  await person.create({ fullName, email, phoneNumber, major })
  res.json({ message: 'The form has been submitted. Thanks!' })
}
