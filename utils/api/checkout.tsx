import { IProduct } from "@/types/order";
import http from "../http";

export const getOrderDetails = async (): Promise<{
	products: IProduct[];
	paymentMethods: string[];
}> => {
	try {
		const res = await http.get("/order-details");
		return Promise.resolve(res.data);
	} catch (error) {
		console.error(error);
		return Promise.reject(error);
	}
};
