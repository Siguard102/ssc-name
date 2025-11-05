import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Login() {
  const [mobile, setMobile] = useState('')
  const [otp, setOtp] = useState('')
  const [sent, setSent] = useState(false)
  const router = useRouter()

  const sendOtp = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000'}/api/auth/send-otp`, { mobile })
    setSent(true)
  }
  const verify = async () => {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000'}/api/auth/verify-otp`, { mobile, otp })
    localStorage.setItem('token', res.data.token)
    router.push('/dashboard')
  }

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-[#071025] p-6 rounded shadow">
      <h3 className="text-xl mb-4">Login / Signup</h3>
      <div className="mb-3">
        <label className="block text-sm">Mobile number</label>
        <input value={mobile} onChange={e => setMobile(e.target.value)} className="w-full border p-2 rounded mt-1" placeholder="+97798XXXXXXXX" />
      </div>
      {!sent ? (
        <button onClick={sendOtp} className="w-full py-2 bg-blue-600 text-white rounded">Send OTP</button>
      ) : (
        <>
          <div className="mb-3 mt-3">
            <label className="block text-sm">Enter OTP</label>
            <input value={otp} onChange={e => setOtp(e.target.value)} className="w-full border p-2 rounded mt-1" />
          </div>
          <button onClick={verify} className="w-full py-2 bg-green-600 text-white rounded">Verify & Login</button>
        </>
      )}
    </div>
  )
}