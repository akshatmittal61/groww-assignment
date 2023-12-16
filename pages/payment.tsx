import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Typography } from "@/library";
import { getOrderDetails } from "@/utils/api/checkout";
import { getTotalPrice, stylesConfig } from "@/utils/functions";
import styles from "@/styles/Home.module.scss";
import PaymentMethod from "@/components/PaymentMethod";
import Image from "next/image";
import useStore from "@/hooks/store";
import Input from "@/library/Input";
import { validateDeliveryDetails } from "@/validations/user";

const classes = stylesConfig(styles, "home");

const HomePage: React.FC = () => {
	const router = useRouter();
	const {
		products,
		deliveryDetails,
		setDeliveryDetails,
		isPaymentSucceeded,
		setIsPaymentSucceeded,
	} = useStore();
	const [loading, setLoading] = useState(true);
	const [activeMethod, setActiveMethod] = useState<string | null>(null);
	const [paymentMethods, setPaymentMethods] = useState<string[]>([]);

	const getPaymentMethods = async () => {
		try {
			setLoading(true);
			const res = await getOrderDetails();
			setPaymentMethods(res.paymentMethods);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setDeliveryDetails({
			...deliveryDetails,
			[name]: value,
		});
	};

	const proceedToCheckout = async () => {
		try {
			await validateDeliveryDetails(deliveryDetails);
			if (paymentMethods.length === 0) {
				throw Error("Payment methods not found");
			}
			if (!isPaymentSucceeded) {
				throw Error("Payment not successful");
			}
			router.push("/checkout");
		} catch (error) {
			console.error(error);
			alert(error);
		}
	};

	useEffect(() => {
		getPaymentMethods();
	}, []);

	return (
		<main className={classes("", "--payments-page")}>
			<Typography
				size="head-2"
				weight="bold"
				className={classes("-title")}
			>
				Checkout
			</Typography>
			{loading ? (
				<span className={classes("-loader")} />
			) : paymentMethods.length === 0 ? (
				<Typography
					size="md"
					weight="medium"
					className={classes("-empty")}
				>
					No payment methods found
				</Typography>
			) : (
				<div className={classes("-body")}>
					<section className={classes("-order-details")}>
						<Typography size="xxl" weight="medium">
							Delivery Details
						</Typography>
						<form
							className={classes("-form")}
							onSubmit={(e) => {
								e.preventDefault();
								proceedToCheckout();
							}}
						>
							<Input
								label="Name"
								className={classes("-input")}
								placeholder="John Doe"
								type="text"
								name="name"
								value={deliveryDetails.name}
								onChange={handleChange}
								required
							/>
							<div className={classes("-form-group")}>
								<Input
									label="Email"
									className={classes("-input")}
									placeholder="name@example.com"
									type="email"
									name="email"
									value={deliveryDetails.email}
									onChange={handleChange}
									required
								/>
								<Input
									label="Phone"
									className={classes("-input")}
									placeholder="9876543210"
									type="tel"
									name="phone"
									value={deliveryDetails.phone}
									onChange={handleChange}
									required
								/>
							</div>
							<Input
								label="Address"
								className={classes("-input")}
								placeholder="123, Main Street"
								type="text"
								name="address"
								value={deliveryDetails.address}
								onChange={handleChange}
								required
							/>
							<div className={classes("-form-group")}>
								<Input
									label="City"
									className={classes("-input")}
									placeholder="Mumbai"
									type="text"
									name="city"
									value={deliveryDetails.city}
									onChange={handleChange}
									required
								/>
								<Input
									label="State"
									className={classes("-input")}
									placeholder="Maharashtra"
									type="text"
									name="state"
									value={deliveryDetails.state}
									onChange={handleChange}
									required
								/>
							</div>
							<div className={classes("-form-group")}>
								<Input
									label="Pincode"
									className={classes("-input")}
									placeholder="400001"
									type="text"
									name="pincode"
									value={deliveryDetails.pincode}
									onChange={handleChange}
									required
								/>
								<Input
									label="Country"
									className={classes("-input")}
									placeholder="India"
									type="text"
									name="country"
									value={deliveryDetails.country}
									onChange={handleChange}
									required
								/>
								<button className="dispn" type="submit">
									Submit
								</button>
							</div>
						</form>
					</section>
					<section className={classes("-order-summary")}>
						<Typography size="xxl" weight="medium">
							Payment Methods
						</Typography>
						<div className={classes("-options")}>
							{paymentMethods.map((method, index) => (
								<div
									key={`payment-method-option-${index}`}
									className={classes("-option", {
										"-option--active":
											activeMethod === method,
									})}
									onClick={() => setActiveMethod(method)}
								>
									<Image
										src={`/vectors/${method}.svg`}
										alt={method}
										width={50}
										height={50}
									/>
									<Typography size="md" weight="medium">
										{method}
									</Typography>
								</div>
							))}
						</div>
						{activeMethod ? (
							<PaymentMethod
								method={activeMethod}
								onSuccessfulPayment={() => {
									setIsPaymentSucceeded(true);
									proceedToCheckout();
								}}
							/>
						) : (
							<Typography size="md" weight="medium">
								Select a payment method
							</Typography>
						)}
						<Typography
							size="xxl"
							weight="medium"
							className={classes("-order-summary-title")}
						>
							Order Summary
						</Typography>
						<div className={classes("-summary")}>
							<div className={classes("-summary-item")}>
								<Typography size="lg" weight="medium">
									Total Items:{" "}
								</Typography>
								<Typography size="lg" weight="medium">
									{products.reduce(
										(total, product) =>
											total + product.quantity,
										0
									)}
								</Typography>
							</div>
							<div className={classes("-summary-item")}>
								<Typography size="lg" weight="medium">
									Subtotal
								</Typography>
								<Typography size="lg" weight="medium">
									₹{getTotalPrice(products)}
								</Typography>
							</div>
							<div className={classes("-summary-item")}>
								<Typography size="lg" weight="medium">
									Shipping
								</Typography>
								<Typography size="lg" weight="medium">
									₹0.00
								</Typography>
							</div>
							<div className={classes("-summary-item")}>
								<Typography size="lg" weight="medium">
									Total
								</Typography>
								<Typography size="lg" weight="medium">
									₹{getTotalPrice(products)}
								</Typography>
							</div>
						</div>
					</section>
				</div>
			)}
		</main>
	);
};

export default HomePage;
