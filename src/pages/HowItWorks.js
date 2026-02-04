function HowItWorks() {
  return (
    <div style={{ padding: "40px", lineHeight: "1.6" }}>
      <h2>How Fake Profile Detection Works</h2>

      <p>
        This project uses Machine Learning techniques to automatically detect
        fake social media profiles based on account behavior and metadata.
      </p>

      <hr />

      <h3>🔹 Step 1: Data Collection</h3>
      <p>
        Two datasets containing real and fake social media profiles were used.
        Each dataset includes features such as followers count, username
        patterns, account privacy, and activity metrics.
      </p>

      <h3>🔹 Step 2: Feature Engineering</h3>
      <ul>
        <li>Numerical features extracted from profiles</li>
        <li>Binary features for privacy, external links, business accounts</li>
        <li>Ratio-based features for usernames and names</li>
      </ul>

      <h3>🔹 Step 3: Model Training</h3>
      <p>
        Three Machine Learning algorithms were trained independently:
      </p>
      <ul>
        <li>Random Forest</li>
        <li>LightGBM</li>
        <li>XGBoost</li>
      </ul>

      <p>
        Models were evaluated using accuracy metrics, and XGBoost achieved the
        best performance.
      </p>

      <h3>🔹 Step 4: Model Deployment</h3>
      <p>
        Trained models were saved as `.pkl` files and deployed using a FastAPI
        backend. The API receives profile features and returns predictions.
      </p>

      <h3>🔹 Step 5: Frontend Interaction</h3>
      <p>
        The React frontend collects user input, sends it to the backend, and
        displays prediction results along with algorithm comparisons.
      </p>

      <h3>🔹 Step 6: Decision Output</h3>
      <p>
        The system outputs whether the profile is <b>Fake</b> or <b>Real</b> and
        shows confidence through accuracy comparison charts.
      </p>
    </div>
  );
}

export default HowItWorks;
