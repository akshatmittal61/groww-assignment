import regex from "@/constants/regex";
import { IDeliveryDetails } from "@/types/user";

export const validateDeliveryDetails = async (details: IDeliveryDetails) => {
	/* if (!details.name) errors.name = "Name is required";
	if (!details.email) errors.email = "Email is required";
	if (!regex.email.test(details.email)) errors.email = "Email is invalid";
	if (!details.phone) errors.phone = "Phone is required";
	if (!regex.phone.test(details.phone)) errors.phone = "Phone is invalid";
	if (!details.address) errors.address = "Address is required";
	if (!details.pincode) errors.pincode = "Pincode is required";
	if (!details.city) errors.city = "City is required";
	if (!details.state) errors.state = "State is required";
	if (!details.country) errors.country = "Country is required"; */
	if (!details.name) return Promise.reject("Name is required");
	if (!details.email) return Promise.reject("Email is required");
	if (!regex.email.test(details.email))
		return Promise.reject("Email is invalid");
	if (!details.phone) return Promise.reject("Phone is required");
	if (!regex.phone.test(details.phone))
		return Promise.reject("Phone is invalid");
	if (!details.address) return Promise.reject("Address is required");
	if (!details.pincode) return Promise.reject("Pincode is required");
	if (!regex.pincode.test(details.pincode))
		return Promise.reject("Pincode is invalid");
	if (!details.city) return Promise.reject("City is required");
	if (!details.state) return Promise.reject("State is required");
	if (!details.country) return Promise.reject("Country is required");
	return Promise.resolve();
};
