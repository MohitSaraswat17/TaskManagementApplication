import React from 'react'
import { Navigate } from 'react-router-dom'
import { Container, Stack,Image } from 'react-bootstrap'

const Profile = ({user,isAuthenticated}) => {
  if(!isAuthenticated){
    return <Navigate to={"/login"}/>
  }

  return (
    <Container className="my-4">
    <h1 className="mb-3 text-center">PROFILE</h1>
    {user && (
      <Stack style={{ width: "fit-content", margin: "0 auto" }} gap={3}>
        <Image
          src={user.avatar && user.avatar.url}
          alt="avatar"
          roundedCircle
          style={{
            width: "250px",
            height: "250px",
            marginBottom: "20px",
            alignSelf: "center",
          }}
        />
        <Stack gap={2}>
          <Stack direction="horizontal" gap={3}>
            <p className="fw-bold" style={{ minWidth: "120px" }}>NAME:</p>
            <p>{user.name}</p>
          </Stack>
          <Stack direction="horizontal" gap={3}>
            <p className="fw-bold" style={{ minWidth: "120px" }}>EMAIL:</p>
            <p>{user.email}</p>
          </Stack>
          <Stack direction="horizontal" gap={3}>
            <p className="fw-bold" style={{ minWidth: "120px" }}>PHONE:</p>
            <p>{user.phone}</p>
          </Stack>
        </Stack>
      </Stack>
    )}
  </Container>
  )
}

export default Profile