import React from 'react'
import { AuthLayout } from '../components/auth/AuthLayout'
import { RegisterForm } from '../components/auth/RegisterForm'

export const Register = () => {
  return (
    <AuthLayout>
      <RegisterForm/>
    </AuthLayout>
  )
}
