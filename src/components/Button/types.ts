import { ButtonVariant } from 'react-bootstrap/types';

export type ButtonProps = {
	children: string;
	variant?: ButtonVariant;
	disabled?: boolean;
	onClick: React.MouseEventHandler<HTMLButtonElement>;
};
