import { ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../firebase";

// download image from URL
const downloadImage = async (url) => {
  const response = await fetch(url);
  const blob = await response.blob();
  return blob;
};

export const saveFeedbackData = async (result, userLabel) => {
  try {

    // 1️⃣ download profile image
    const imageBlob = await downloadImage(result.profile_pic);

    // 2️⃣ upload image to Firebase Storage
    const imageRef = ref(
      storage,
      `profile_images/unknown/${result.username}.jpg`
    );

    await uploadBytes(imageRef, imageBlob);

    // 3️⃣ save metadata in Firestore
    await addDoc(collection(db, "feedback_data"), {
      username: result.username,
      followers: result.followers,
      posts: result.posts,
      image_path: `profile_images/unknown/${result.username}.jpg`,

      model_prediction: result.result,
      model_score: result.final_score,

      user_feedback: userLabel,

      timestamp: new Date()
    });

    console.log("Feedback saved");

  } catch (err) {
    console.error("Error saving feedback:", err);
  }
};