import React, { useState } from 'react'
import axios from 'axios'
import { Form, Input, Button, FormGroup, Container, Row, Col } from 'reactstrap'

const App = () => {
  const [emailVal, setEmailVal] = useState('')
  const [secretVal, setSecretVal] = useState('')
  const [id, setId] = useState('')
  const [repoURL, setRepoURL] = useState('')
  const [modified, setModified] = useState('')
  const [showResponse, setShowResponse] = useState(false)

  function getUserDetails (e) {
    e.preventDefault()

    axios.get(
      `https://tweakplan.com/JavaScriptDemoSubmission-1.0/candidates?email=${emailVal}&secret=${secretVal}`
    ).then((result) => {
      setId(result.data.id)
      setRepoURL(result.data.repoURL)
      setModified(result.data.modified)
      setShowResponse(true)
      return null
    }).catch((err) => {
      console.log(err)
    })

    // const response = sendUser(form)
  }
  function submitNewURL (e) {
    e.preventDefault()
    axios.patch(
      `https://tweakplan.com/JavaScriptDemoSubmission-1.0/candidates/${id}`,
      { secret: secretVal, repoURL: repoURL }
    ).then((result) => {
      setId(result.data.id)
      setRepoURL(result.data.repoURL)
      setModified(result.data.modified)
      setShowResponse(true)
      return null
    }).catch((err) => {
      console.log(err)
    })
  }
  function handleChange (e) {
    setEmailVal(e.target.value)
    setSecretVal(e.target.value)
  }

  function handleRepoUrlChange (e) {
    setRepoURL(e.target.value)
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form>
              <h1>Cristopher Germuts</h1>
              <FormGroup className="mb-2">
                <Input type= "text" name="email" onChange={handleChange} placeholder="Enter here" className="form-control" />
              </FormGroup>
              <FormGroup className="mb-2">
                <Input type= "text" name="secret" onChange={handleChange} placeholder="Enter here" className="form-control" />
              </FormGroup>
              <Button onClick={getUserDetails}>Click to get your user details</Button>
            </Form>
          </Col>
        </Row>
      </Container>

      {showResponse
        ? <div>
          {
            id
              ? <div>
                <div>Your Id: {id}</div>
                <div>Your github URL: {repoURL}</div>
                <div>Modified: {modified}</div>
                <form>
                  <div>
                    <input type= "text" name="repoURL" onChange={handleRepoUrlChange} placeholder="Enter here" ></input>
                  </div>
                  <button onClick={submitNewURL}>Click to update your github URL</button>
                </form>
              </div>
              : <div>Invalid user</div>
          }

        </div>
        : ''
      }
    </>
  )
}

export default App
