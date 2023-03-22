import mongoose from 'mongoose'
const { Schema, model } = mongoose

const personSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  major: { type: String, required: true }
})

export const person = model('Person', personSchema)
