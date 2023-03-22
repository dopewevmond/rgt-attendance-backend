import { object, string } from 'yup'

export const attendanceValidationSchema = object({
  body: object({
    fullName: string().trim().required('Full name is required'),
    email: string().trim().email('Invalid email address').required('Email is required'),
    phoneNumber: string().trim('cannot accept an empty string').matches(/^[0-9]{10}$/, 'Phone number should consists of ten digits in the format 054XXXXXXX').required('Phone number is required'),
    major: string().trim().required('Major is required')
  })
})
