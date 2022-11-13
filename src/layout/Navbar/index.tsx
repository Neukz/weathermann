import BSNavbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useUnits } from '../../hooks/useUnits';
import { links } from '../../constants/links';
import { weatherUnits } from '../../constants/units';

const Navbar = () => {
	const [units, toggleUnits] = useUnits();

	return (
		<BSNavbar bg="primary" variant="dark" expand="md">
			<Container>
				<BSNavbar.Brand href="/">Weathermann</BSNavbar.Brand>
				<BSNavbar.Toggle aria-controls="basic-navbar-nav" />
				<BSNavbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={Link} to="/about">
							About
						</Nav.Link>
						<NavDropdown title="Options" id="basic-nav-dropdown">
							<Container>
								<Form.Switch
									checked={units === 'imperial'}
									onChange={toggleUnits}
									label={<span>{weatherUnits.temp[units]}</span>}
								/>
							</Container>
							<NavDropdown.Divider />
							<NavDropdown.Item href={links.projectRepo} target="_blank">
								<i className="bi-github" /> Source
							</NavDropdown.Item>
						</NavDropdown>
					</Nav>
				</BSNavbar.Collapse>
			</Container>
		</BSNavbar>
	);
};

export default Navbar;
