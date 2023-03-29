import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export function Header() {
  return(
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Task#5</Navbar.Brand>
        </Container>
      </Navbar>
  )
}

  