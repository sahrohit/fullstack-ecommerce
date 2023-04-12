import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import Alert from "@components/ui/Alert";
import { encodeURL } from "@components/utils/encodeURL";
import { useCategoriesQuery } from "@generated/graphql";

const CategoryPage = () => {
	const { data, loading, error } = useCategoriesQuery();

	if (loading) {
		return <FullPageLoadingSpinner />;
	}

	if (error) {
		return (
			<Alert
				message="An Error Occured"
				title="Couldn't load Current User"
				status="error"
			/>
		);
	}

	return (
		<div>
			{data?.categories.map((category) => (
				<CategoryCard key={category.id} id={category.id} name={category.name} />
			))}
		</div>
	);
};

export default CategoryPage;

interface CatergoryCardProps {
	id: string | number;
	name: string;
}

const CategoryCard = ({ id, name }: CatergoryCardProps) => {
	return (
		<div>
			{/* {name} {"===========>"} {encodeURL(name)} */}
			UPDATE product_category SET identifier = (&apos;{encodeURL(name)}
			&apos;) WHERE id = {id};
		</div>
	);
};
