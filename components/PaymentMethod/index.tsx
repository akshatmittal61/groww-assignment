import React, { useState } from "react";
import { stylesConfig } from "@/utils/functions";
import styles from "./styles.module.scss";
import { Button } from "@/library";
import Input from "@/library/Input";
import { validateCard, validateUpi } from "@/validations/payment";
import { ICardDetails } from "@/types/order";

interface IPaymentMethodProps {
	onSuccessfulPayment: () => void;
}

interface IPaymentMethodContainerProps extends IPaymentMethodProps {
	method: string;
}

const PaymentMethodUPI: React.FC<IPaymentMethodProps> = ({
	onSuccessfulPayment,
}) => {
	const [upiId, setUpiId] = useState("");
	const [loading, setLoading] = useState(false);
	const classes = stylesConfig(styles, "payment-method-upi");

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			setLoading(true);
			await validateUpi(upiId);
			onSuccessfulPayment();
		} catch (error) {
			console.error(error);
			alert(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className={classes("")} onSubmit={handleSubmit}>
			<Input
				label="Enter your UPI ID"
				className={classes("-input")}
				placeholder="abc@xyz"
				type="text"
				value={upiId}
				onChange={(e: any) => setUpiId(e.target.value)}
				required
			/>
			<Button
				type="submit"
				className={classes("-button")}
				loading={loading}
			>
				Proceed to Payment
			</Button>
		</form>
	);
};

const PaymentMethodCard: React.FC<IPaymentMethodProps> = ({
	onSuccessfulPayment,
}) => {
	const [loading, setLoading] = useState(false);
	const [cardDetails, setCardDetails] = useState<ICardDetails>({
		cardNumber: "",
		cardHolder: "",
		expiryDate: "",
		cvv: "",
	});
	const classes = stylesConfig(styles, "payment-method-card");

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			setLoading(true);
			await validateCard(cardDetails);
			onSuccessfulPayment();
		} catch (error) {
			console.error(error);
			alert(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<form className={classes("")} onSubmit={handleSubmit}>
			<Input
				label="Card Number"
				className={classes("-input")}
				placeholder="1234 5678 9012 3456"
				type="text"
				required
				value={cardDetails.cardNumber}
				onChange={(e: any) =>
					setCardDetails({
						...cardDetails,
						cardNumber: e.target.value,
					})
				}
			/>
			<Input
				label="Card Holder"
				className={classes("-input")}
				placeholder="John Doe"
				type="text"
				required
				value={cardDetails.cardHolder}
				onChange={(e: any) =>
					setCardDetails({
						...cardDetails,
						cardHolder: e.target.value,
					})
				}
			/>
			<Input
				label="Expiry Date"
				className={classes("-input")}
				placeholder="MM/YY"
				type="text"
				required
				value={cardDetails.expiryDate}
				onChange={(e: any) =>
					setCardDetails({
						...cardDetails,
						expiryDate: e.target.value,
					})
				}
			/>
			<Input
				label="CVV"
				className={classes("-input")}
				placeholder="123"
				type="text"
				required
				value={cardDetails.cvv}
				onChange={(e: any) =>
					setCardDetails({ ...cardDetails, cvv: e.target.value })
				}
			/>
			<Button
				type="submit"
				className={classes("-button")}
				loading={loading}
			>
				Proceed to Payment
			</Button>
		</form>
	);
};

const PaymentMethod: React.FC<IPaymentMethodContainerProps> = ({
	method,
	onSuccessfulPayment,
}) => {
	const classes = stylesConfig(styles, "payment-method");
	if (method === "CARDS")
		return <PaymentMethodCard onSuccessfulPayment={onSuccessfulPayment} />;
	else if (method === "UPI")
		return <PaymentMethodUPI onSuccessfulPayment={onSuccessfulPayment} />;
	else return <div className={classes("")}>Payment Method not supported</div>;
};

export default PaymentMethod;
