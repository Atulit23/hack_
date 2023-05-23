import React from 'react'

export default function Admin() {
  return (
    <div onClick={() => {localStorage.setItem('loggedIn', 'false')}}>Admin</div>
  )
}
