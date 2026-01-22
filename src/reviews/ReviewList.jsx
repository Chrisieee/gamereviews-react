import Review from "./Review.jsx";
import {useReviews} from "../context/ReviewContext.jsx";
import {useEffect} from "react";

function ReviewList() {
    const {reviews, fetchReviews} = useReviews();

    useEffect(() => {
        fetchReviews()
    }, []);

    return (
        <section className={"flex flex-col justify-center text-center gap-4 w-3/4 mx-auto my-2"}>
            {reviews ? (
                <div className={"px-5 gap-2 grid grid-cols-3"}>
                    {
                        reviews.map((review) => <Review item={review} key={review.id}/>)
                    }
                </div>
            ) : (
                <p className={"text-2xl font-bold"}>Notities zijn aan het laden...</p>
            )}
        </section>
    )
}

export default ReviewList