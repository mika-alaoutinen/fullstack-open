import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Blogs = styled.div`
  background: RebeccaPurple;
  border: 1px solid;
  margin: 1em 0;
  padding: 0.5em;
`

const Button = styled.button`
  background: MediumPurple;
  color: Ivory;
  font-size: 1em;
  padding: 0.25em 0.5em;
  border: 2px solid Indigo;
  border-radius: 3px;
`

const Input = styled.input`
  background: #f4d7f4;
  border: 2px solid Indigo;
  border-radius: 5px;
  margin-left: 1em;
  padding: 0.5em 0.5em;
`

const Li = styled.li`
  list-style-type: square;
  padding: 0.5em;
`

const Nav = styled.nav`
  background: Orchid;
  padding: 1em;
`

const StyledLink = styled(Link)`
  color: Ivory;
  padding-right: 0.5em;
  text-decoration: none;
`

const Td = styled.td`
  background: Pink;
  padding: 1em 2em;
`

const Th = styled.th`
  background: Orchid;
  padding: 0.5em 2em;
`

export {
  Blogs, Button, Input, Li, Nav, StyledLink, Td, Th
}