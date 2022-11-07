import BSNavbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { links } from '../../constants/links';

const Navbar = () => {
	return (
		<BSNavbar bg="primary" variant="dark">
			<Container>
				<BSNavbar.Brand href="/">Weathermann</BSNavbar.Brand>
				<BSNavbar.Toggle aria-controls="basic-navbar-nav" />
				<BSNavbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={Link} to="/about">
							About
						</Nav.Link>
						<Nav.Link href={links.projectRepo} target="_blank">
							<i className="bi-github" />
						</Nav.Link>
					</Nav>
				</BSNavbar.Collapse>
			</Container>
		</BSNavbar>
	);
};

export default Navbar;
