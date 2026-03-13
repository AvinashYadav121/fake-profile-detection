
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function AdminDashboard() {

  const [data, setData] = useState([]);

  const [fakeCount, setFakeCount] = useState(0);
  const [realCount, setRealCount] = useState(0);

  const [correctFeedback, setCorrectFeedback] = useState(0);
  const [wrongFeedback, setWrongFeedback] = useState(0);

  useEffect(() => {

    const fetchData = async () => {

      const res = await fetch("http://localhost:8000/admin/dashboard");
      const rows = await res.json();

      setData(rows);

      let fake = 0;
      let real = 0;

      let correct = 0;
      let wrong = 0;

      rows.forEach(r => {

        const prediction = r.prediction?.toLowerCase();
        const feedback = r.feedback?.toLowerCase();

        if (prediction === "fake") fake++;
        if (prediction === "real") real++;

        if (feedback === "correct") correct++;
        if (feedback === "wrong") wrong++;

      });

      setFakeCount(fake);
      setRealCount(real);

      setCorrectFeedback(correct);
      setWrongFeedback(wrong);

    };

    fetchData();

  }, []);


  const fakeRealData = [
    { name: "Fake", value: fakeCount },
    { name: "Real", value: realCount }
  ];

  const feedbackData = [
    { name: "Correct", value: correctFeedback },
    { name: "Wrong", value: wrongFeedback }
  ];


  const exportCSV = () => {

    const headers = [
      "username",
      "followers",
      "following",
      "posts",
      "ratio",
      "prediction",
      "feedback"
    ];

    const rows = data.map(d => [
      d.username,
      d.followers,
      d.following,
      d.posts,
      d.ratio,
      d.prediction,
      d.feedback
    ]);

    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "training_dataset.csv";
    a.click();

  };


  return (

    <div className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>


      {/* Stats */}

      <div className="grid grid-cols-4 gap-4 mb-10">

        <div className="bg-white shadow p-4 rounded">
          <h3>Total Checks</h3>
          <p className="text-2xl font-bold">{data.length}</p>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h3>Fake Accounts</h3>
          <p className="text-2xl font-bold text-red-500">{fakeCount}</p>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h3>Real Accounts</h3>
          <p className="text-2xl font-bold text-green-500">{realCount}</p>
        </div>

        <div className="bg-white shadow p-4 rounded">
          <h3>Feedback Count</h3>
          <p className="text-2xl font-bold">
            {correctFeedback + wrongFeedback}
          </p>
        </div>

      </div>


      {/* Charts */}

      <div className="grid grid-cols-2 gap-10 mb-10">

        <div className="bg-white p-6 shadow rounded">

          <h3 className="mb-4 font-semibold">
            Fake vs Real Accounts
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>

              <Pie data={fakeRealData} dataKey="value" outerRadius={100}>
                <Cell fill="#ef4444"/>
                <Cell fill="#22c55e"/>
              </Pie>

              <Tooltip/>

            </PieChart>
          </ResponsiveContainer>

        </div>


        <div className="bg-white p-6 shadow rounded">

          <h3 className="mb-4 font-semibold">
            User Feedback
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>

              <Pie data={feedbackData} dataKey="value" outerRadius={100}>
                <Cell fill="#3b82f6"/>
                <Cell fill="#f59e0b"/>
              </Pie>

              <Tooltip/>

            </PieChart>
          </ResponsiveContainer>

        </div>

      </div>


      {/* Recent Profiles */}

      <div className="bg-white p-6 shadow rounded mb-10">

        <h3 className="font-semibold mb-4">
          Recent Checked Profiles
        </h3>

        <table className="w-full text-left">

          <thead>
            <tr>
              <th>Username</th>
              <th>Followers</th>
              <th>Following</th>
              <th>Posts</th>
              <th>Prediction</th>
            </tr>
          </thead>

          <tbody>

            {data.slice().reverse().slice(0,5).map((row,index) => (

              <tr key={index} className="border-t">

                <td>{row.username}</td>
                <td>{row.followers}</td>
                <td>{row.following}</td>
                <td>{row.posts}</td>
                <td>{row.prediction}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>


      {/* Export Dataset */}

      <button
        onClick={exportCSV}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Export Training Dataset
      </button>

    </div>
  );
}

