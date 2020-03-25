import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../graphql/queries'

const UpdateAuthor = () => {
  const [name, setName] = useState('')
  const [birthyear, setBirthyear] = useState('')
  const [changeBirthyear, result] = useMutation(EDIT_AUTHOR)

  useEffect(() => {
    if (result.data && !result.data.editAuthor) {
      console.log('error', result.data)
    }
  }, [result.data])

  const submit = async event => {
    event.preventDefault()
    changeBirthyear({ variables: { name, setBornTo: birthyear } })
    setName('')
    setBirthyear('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>

      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>

        <div>
          born
        <input
            value={birthyear}
            onChange={({ target }) => setBirthyear(Number(target.value))}
          />
        </div>

        <button type='submit'>update author</button>

      </form>
    </div>
  )
}

export default UpdateAuthor