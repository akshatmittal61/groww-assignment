import { IProduct } from "@/types/order";
import { IDeliveryDetails } from "@/types/user";
import { createContext } from "react";

const GlobalContext = createContext({
	theme: "light" as "light" | "dark",
	setTheme: (_: "light" | "dark") => {},
	products: [] as IProduct[],
	setProducts: (_: IProduct[]) => {},
	deliveryDetails: {} as IDeliveryDetails,
	setDeliveryDetails: (_: IDeliveryDetails) => { },
	isPaymentSucceeded: false,
	setIsPaymentSucceeded: (_: boolean) => { },
});

export default GlobalContext;
