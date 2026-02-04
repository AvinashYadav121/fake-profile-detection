
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function SocialAuthButtons({
  setError,
  setLoading,
  navigate,
  from,
}) {
  const handleSocialLogin = async (provider) => {
    setError("");
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);

      await setDoc(
        doc(db, "users", result.user.uid),
        {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
          provider: provider.providerId,
          lastLogin: new Date(),
        },
        { merge: true }
      );

      navigate(from, { replace: true });
    } catch (err) {
      setError("Social login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={() => handleSocialLogin(new GoogleAuthProvider())}
        className="w-full border py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-100"
      >
        <img src="https://static.vecteezy.com/system/resources/thumbnails/072/678/176/small/google-logo-icon-free-png.png" alt="Google" className="w-8 h-8" /> Continue with Google
      </button>

      <button
        onClick={() => handleSocialLogin(new FacebookAuthProvider())}
        className="w-full border py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-100"
      >
        <img src="https://thumbs.dreamstime.com/b/facebook-official-logo-name-design-390961740.jpg" alt="Facebook" className="w-5 h-5" /> Continue with Facebook
      </button>
    </div>
  );
}

