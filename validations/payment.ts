import { ICardDetails } from "@/types/order";

export const validateUpi = async (upi: string) => {
	if (upi.length < 3) return Promise.reject("UPI is too short");
	if (upi.length > 100) return Promise.reject("UPI is too long");
	if (!upi.includes("@")) return Promise.reject("UPI is invalid");
	if (upi.split("@").length > 2) return Promise.reject("UPI is invalid");
	if (upi.split("@")[1].length < 3) return Promise.reject("UPI is invalid");
	if (upi.split("@")[1].length > 100) return Promise.reject("UPI is invalid");

	if (
		![
			"apl",
			"abfspay",
			"abfspay",
			"axisb",
			"idfcbank",
			"icici",
			"okaxis",
			"yesg",
			"jupiteraxis",
			"goaxb",
			"icici",
			"ikwik",
			"naviaxis",
			"NIYOICICI",
			"ybl",
			"pingpay",
			"shriramhdfcbank",
			"sliceaxis",
			"tapicici",
			"timecosmos",
			"yesbank",
			"idfcbank",
			"waicici",
			"icici",
			"yesbank",
			"zoicici",
		].includes(upi.split("@")[1])
	)
		return Promise.reject("UPI is invalid");
	return Promise.resolve();
};

export const validateCard = async (cardDetails: ICardDetails) => {
	if (cardDetails.cardNumber.length < 16)
		return Promise.reject("Card number is too short");
	if (cardDetails.cardNumber.length > 16)
		return Promise.reject("Card number is too long");
	if (cardDetails.cvv.length < 3) return Promise.reject("CVV is too short");
	if (cardDetails.cvv.length > 3) return Promise.reject("CVV is too long");
	return Promise.resolve();
};
