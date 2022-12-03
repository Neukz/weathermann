import BSButton from 'react-bootstrap/Button';
import { ButtonProps } from './types';

const Button = ({ children, variant, disabled, onClick }: ButtonProps) => {
	return (
		<BSButton
			size="lg"
			className="d-block mx-auto mt-3 px-5"
			variant={variant}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</BSButton>
	);
};

export default Button;
