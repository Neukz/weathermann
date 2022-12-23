import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Moment from 'react-moment';
import { useAppSelector } from '../../hooks/reduxTypedHooks';
import { selectUnits } from '../../store';
import { weatherUnits } from '../../constants/units';

const Forecast = () => {
	const forecast = useAppSelector(state => state.weather.data?.forecast);
	const { units } = useAppSelector(selectUnits);

	return (
		<Accordion defaultActiveKey="0">
			{forecast &&
				Object.keys(forecast).map((day, index) => (
					<Accordion.Item key={index} eventKey={index.toString()}>
						<Accordion.Header>
							<Moment utc date={day} format="ddd, MMM Do" />
						</Accordion.Header>
						<Accordion.Body className="py-1">
							<Table size="sm">
								<thead className="text-muted text-center">
									<tr>
										<th></th>
										<th className="fw-normal">Temp.</th>
										<th className="fw-normal">Feels Like</th>
									</tr>
								</thead>

								<tbody>
									{forecast[day].map((timeOfDay, index) => (
										<tr key={index} className="text-center align-middle">
											<th scope="row" className="fw-normal text-start p-0">
												<Image
													src={`https://openweathermap.org/img/wn/${timeOfDay.data.weather[0].icon}.png`}
													alt=""
												/>
												<span className="text-capitalize">
													{timeOfDay.name}
												</span>
											</th>

											<td>
												{timeOfDay.data.main.temp.toFixed(0)}
												{weatherUnits.temp[units]}
											</td>

											<td>
												{timeOfDay.data.main.feels_like.toFixed(0)}
												{weatherUnits.temp[units]}
											</td>
										</tr>
									))}
								</tbody>
							</Table>
						</Accordion.Body>
					</Accordion.Item>
				))}
		</Accordion>
	);
};

export default Forecast;
