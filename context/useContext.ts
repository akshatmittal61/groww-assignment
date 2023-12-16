import { IProduct } from "@/types/order";
import { IDeliveryDetails } from "@/types/user";
import { useState } from "react";

const useContextData = () => {
	const [theme, setTheme] = useState<"light" | "dark">("light");

	const [products, setProducts] = useState<IProduct[]>([]);
	const [deliveryDetails, setDeliveryDetails] = useState<IDeliveryDetails>({
		name: "",
		email: "",
		phone: "",
		address: "",
		pincode: "",
		city: "",
		state: "",
		country: "",
	});
	const [isPaymentSucceeded, setIsPaymentSucceeded] = useState(false);

	const handleProducts = (products: IProduct[]) => {
		setProducts(() => products);
	};

	const handleDeliveryDetails = (details: IDeliveryDetails) => {
		setDeliveryDetails(() => details);
	};

	const handlePaymentSucceeded = (status: boolean) => {
		setIsPaymentSucceeded(() => status);
	};

	return {
		theme,
		setTheme,
		products,
		setProducts: handleProducts,
		deliveryDetails,
		setDeliveryDetails: handleDeliveryDetails,
		isPaymentSucceeded,
		setIsPaymentSucceeded: handlePaymentSucceeded,
	};
};

export default useContextData;
