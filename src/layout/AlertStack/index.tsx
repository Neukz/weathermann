import Alert from 'react-bootstrap/Alert';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxTypedHooks';
import {
	selectAlert,
	clearAlert,
	selectWeather,
	clearError
} from '../../store';

// Alerts are related to both weather.error and alert state itself
const AlertStack = () => {
	const { alert } = useAppSelector(selectAlert);
	const { error } = useAppSelector(selectWeather);
	const dispatch = useAppDispatch();

	return (
		<>
			<Alert
				className="w-75 mx-auto mt-3"
				variant="warning"
				dismissible
				show={alert !== null}
				onClose={() => dispatch(clearAlert())}
			>
				{alert}
			</Alert>

			<Alert
				className="w-75 mx-auto mt-3"
				variant="danger"
				dismissible
				show={error !== null}
				onClose={() => dispatch(clearError())}
			>
				{error}
			</Alert>
		</>
	);
};

export default AlertStack;
