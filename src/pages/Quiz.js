// import { useState } from "react";

// const questions = [
//   {
//     question: "You receive a message saying your account is not secure. What should you do?",
//     options: [
//       "Share your OTP to secure the account",
//       "Click the link and login immediately",
//       "Ignore and report the message",
//       "Reply asking for more details"
//     ],
//     answer: 2,
//     explanation:
//       "Scammers create urgency. Never share OTPs or click unknown links. Report and verify from official sources."
//   },
//   {
//     question: "Which is a sign of a fake profile?",
//     options: [
//       "Old account with consistent activity",
//       "High followers with no posts",
//       "Verified business badge",
//       "Clear bio and links"
//     ],
//     answer: 1,
//     explanation:
//       "Fake profiles often have abnormal follower-to-post ratios and low engagement."
//   },
//   {
//     question: "What information should NEVER be shared online?",
//     options: [
//       "Username",
//       "Profile photo",
//       "OTP / Password",
//       "Public posts"
//     ],
//     answer: 2,
//     explanation:
//       "OTP and passwords give direct account access and should never be shared."
//   }
// ];

// export default function Quiz() {
//   const [current, setCurrent] = useState(0);
//   const [selected, setSelected] = useState(null);
//   const [score, setScore] = useState(0);
//   const [showResult, setShowResult] = useState(false);

//   const handleNext = () => {
//     if (selected === questions[current].answer) {
//       setScore(score + 1);
//     }
//     setSelected(null);

//     if (current + 1 < questions.length) {
//       setCurrent(current + 1);
//     } else {
//       setShowResult(true);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-6">Scam Awareness Quiz</h2>

//       {!showResult ? (
//         <div className="bg-yellow-50 p-6 rounded shadow">
//           <h3 className="text-xl font-semibold mb-4">
//             {questions[current].question}
//           </h3>

//           <div className="space-y-3">
//             {questions[current].options.map((opt, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => setSelected(idx)}
//                 className={`block w-full text-left p-3 rounded border 
//                   ${selected === idx ? "bg-blue-200 border-blue-500" : "bg-white"}`}
//               >
//                 {opt}
//               </button>
//             ))}
//           </div>

//           <button
//             onClick={handleNext}
//             disabled={selected === null}
//             className="mt-6 bg-blue-800 text-white px-6 py-2 rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       ) : (
//         <div className="bg-green-50 p-6 rounded shadow">
//           <h3 className="text-2xl font-bold mb-4">Quiz Completed</h3>
//           <p className="text-lg">
//             Your Score: <b>{score} / {questions.length}</b>
//           </p>
//           <p className="mt-4">
//             Higher awareness reduces the risk of falling for scams.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }


import { useState } from "react";

const questions = [
  {
    type: "single",
    question:
      "What are some common signs that you are dealing with a scammer?",
    options: [
      "You're asked to make a payment in an unusual way",
      "You see an investment endorsed by a celebrity",
      "You're pressured to act quickly",
      "You're asked to send money to help someone",
      "You're asked to set up a new account for payment",
      "All of the above"
    ],
    answer: [5],
    correctText:
      "Correct – all of these tactics are used by scammers!",
    wrongText:
      "Not quite – all of these are common scam tactics.",
    explanation:
      "Scammers create believable stories and pressure you to act quickly using fear, urgency or rewards.",
    example:
      "Scammers use new technology, services, and major events to make scams feel real."
  },

  {
    type: "single",
    question:
      "Which of the following can you rely on, to be sure you aren't dealing with a phishing scam?",
    options: [
      "Email looks like it's from a real organisation",
      "Message is well-written",
      "Website looks professional",
      "Appears in the same message thread",
      "None of the above"
    ],
    answer: [4],
    correctText:
      "Correct – none of these can be relied on!",
    wrongText:
      "Incorrect – the correct answer is 'None of the above'.",
    explanation:
      "Scammers copy logos, names, ABNs and even message threads. Many scams look identical to real messages.",
    example:
      "Example: A fake ATO message used real logos and urgent deadlines."
  },

  {
    type: "single",
    question:
      "You receive a call or message claiming your account or device isn't secure. What should you do?",
    options: [
      "Share your PIN or passwords",
      "Download software immediately",
      "End the call and contact the organisation using official details",
      "Transfer your money to keep it safe",
      "Leave your card to be collected"
    ],
    answer: [2],
    correctText:
      "Correct – contact the organisation yourself.",
    wrongText:
      "Incorrect – always verify independently.",
    explanation:
      "Scammers pressure you to act quickly and may already know personal details.",
    example:
      "Scam messages can appear in real message threads with banks."
  },

  {
    type: "single",
    question:
      "Which of the following is a common tactic used by scammers to get money quickly?",
    options: [
      "Offering limited-time discounts",
      "Threatening legal action or arrest",
      "Offering prizes for urgent action",
      "Saying someone needs help",
      "All of the above"
    ],
    answer: [4],
    correctText:
      "Correct – all of these tactics are used by scammers!",
    wrongText:
      "Not quite – scammers use all of these tactics.",
    explanation:
      "Scammers rely on urgency, fear, and emotional pressure.",
    example:
      "Threats of arrest or limited offers are common scam signals."
  },

  {
    type: "single",
    question:
      "What’s the first thing you should do if you think you've had money or information stolen?",
    options: [
      "Wait and see what happens",
      "Change your phone number",
      "Contact your bank immediately",
      "Try to resolve it with the scammer"
    ],
    answer: [2],
    correctText:
      "Correct – contact your bank immediately!",
    wrongText:
      "Incorrect – acting quickly can reduce losses.",
    explanation:
      "Banks can stop transactions and protect your accounts if contacted early.",
    example:
      "Reporting also helps authorities track scam trends."
  },

  {
    type: "single",
    question:
      "Scammers may intercept invoices or change payment details. What should you do?",
    options: [
      "Pay immediately",
      "Contact the business using details you already have",
      "Ignore payment changes",
      "Trust emails from the same address",
      "Call the number in the invoice"
    ],
    answer: [1],
    correctText:
      "Correct – verify using trusted contact details.",
    wrongText:
      "Incorrect – scammers can change email addresses and phone numbers.",
    explanation:
      "Invoice scams often target property buyers and businesses.",
    example:
      "Never use contact details provided in the invoice itself."
  },

  {
    type: "single",
    question:
      "What is the best way to protect yourself from online shopping scams?",
    options: [
      "Only pay using credit card or PayPal",
      "Check logos and ABN",
      "Trust reviews",
      "Only shop on .com.au websites",
      "Pay via bank transfer or PayID"
    ],
    answer: [0],
    correctText:
      "Correct – credit cards and PayPal offer protection.",
    wrongText:
      "Incorrect – many scams look like genuine stores.",
    explanation:
      "Other payment methods don’t offer refunds if you're scammed.",
    example:
      "Fake websites often use ads and fake reviews."
  },

  {
    type: "single",
    question:
      "What does Scamwatch recommend people do to stay safe from scams?",
    options: [
      "Delay. Delete. Forget.",
      "Wait. Watch. Listen.",
      "Ask. Respond. Report.",
      "Stop. Check. Protect.",
      "None of the above"
    ],
    answer: [3],
    correctText:
      "Correct – Stop. Check. Protect!",
    wrongText:
      "Incorrect – the correct answer is Stop. Check. Protect.",
    explanation:
      "Taking time to think and verify can prevent scams.",
    example:
      "Contact your bank and report scams immediately."
  }
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [phase, setPhase] = useState("question");
  const [score, setScore] = useState(0);

  const q = questions[current];
  const isCorrect = q.answer.includes(selected);

  const handleOK = () => {
    if (isCorrect) setScore(score + 1);
    setPhase("feedback");
  };

  const handleContinue = () => {
    setSelected(null);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setPhase("question");
    } else {
      setPhase("end");
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-amber-100 rounded-xl p-8 shadow-lg">

        <p className="text-sm text-gray-600 mb-4">
          Question {current + 1} of {questions.length}
        </p>

        {phase === "question" && (
          <>
            <h2 className="text-2xl font-bold mb-6">{q.question}</h2>

            <div className="space-y-3">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelected(idx)}
                  className={`w-full text-left p-4 rounded-lg border ${
                    selected === idx
                      ? "bg-blue-50 border-blue-700"
                      : "bg-white border-gray-300"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <button
              disabled={selected === null}
              onClick={handleOK}
              className="mt-6 bg-blue-800 text-white px-6 py-2 rounded disabled:opacity-50"
            >
              OK
            </button>
          </>
        )}

        {phase === "feedback" && (
          <>
            <h3
              className={`text-xl font-bold mb-4 ${
                isCorrect ? "text-green-700" : "text-red-700"
              }`}
            >
              {isCorrect ? q.correctText : q.wrongText}
            </h3>

            <p className="mb-4">{q.explanation}</p>

            <div className="bg-yellow-200 p-4 rounded mb-4">
              <b>Example:</b>
              <p className="text-sm mt-1">{q.example}</p>
            </div>

            <div className="bg-blue-50 p-4 rounded font-medium">
              🛡️ Stop. Check. Protect.
            </div>

            <button
              onClick={handleContinue}
              className="mt-6 bg-blue-800 text-white px-6 py-2 rounded"
            >
              Continue
            </button>
          </>
        )}

        {phase === "end" && (
          <>
            <h2 className="text-3xl font-bold mb-4">
              Quiz Completed
            </h2>
            <p className="text-lg mb-4">
              Your Score: <b>{score} / {questions.length}</b>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
