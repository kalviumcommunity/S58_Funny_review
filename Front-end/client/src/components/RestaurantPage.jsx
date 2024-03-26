import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RestaurantPage = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [review, setReview] = useState("");

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = () => {
    axios
      .post(`http://localhost:7777/restaurant/${id}/review`, {review})
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setReview("");
  };

  useEffect(() => {
    axios
      .get(`http://localhost:7777/restaurant/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    data && (
      <>
        <p>Name: {data.Name}</p>
        <p>Ratings: {data.Ratings}</p>
        <p>Location: {data.Location}</p>
        <div>
          <p>Reviews: </p>
          <ul>
            {data.Review.map((review, index) => (
                <li key={index}>{review}</li>
            ))}
          </ul>
        </div>
        <input
          type="text"
          name="review"
          id="review"
          onChange={(e) => {
            handleReviewChange(e);
          }}
          value={review}
        />
        <button type="submit" onClick={handleSubmit}>
          Submit Review
        </button>
      </>
    )
  );
};

export default RestaurantPage;
