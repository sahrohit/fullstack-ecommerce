const colorFromStatus = (status: string) => {
	switch (status) {
		case "PENDING":
			return "red";

		case "INITIATED":
			return "yellow";

		case "COMPLETED":
			return "green";

		case "PLACED":
			return "blue.500";

		case "SHIPPED":
			return "blue.500";

		case "OUTFORDELIVERY":
			return "green";

		case "DELIVERED":
			return "green";

		case "REFUNDED":
			return "green";

		case "REJECTED":
			return "red";

		case "FAILED":
			return "red";

		case "EXPIRED":
			return "red";

		case "SUBMITTED":
			return "blue";

		case "OPEN":
			return "yellow";

		case "IN_PROGRESS":
			return "yellow";

		case "ON_HOLD":
			return "yellow";

		case "CLOSED":
			return "green";

		case "RESOLVED_BY_CUSTOMER":
			return "green";

		case "PENDING_CUSTOMER_RESPONSE":
			return "yellow";

		default:
			return "gray";
	}
};

export default colorFromStatus;

// "SUBMITTED",
// "OPEN",
// "IN_PROGRESS",
// "ON_HOLD",
// "CLOSED",
// "REJECTED",
// "RESOLVED_BY_CUSTOMER",
// "PENDING_CUSTOMER_RESPONSE",
