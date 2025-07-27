import SessionsOverviewChart from "./SessionsOverviewChart";

export default function DashboardCards() {
  return (
    <section>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-lg font-semibold">মোট লেখা</h3>
          <p className="text-3xl font-bold mt-2 text-blue-600">২৫০</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-lg font-semibold">একটিভ ইউজার</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">১৫০</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <h3 className="text-lg font-semibold">মন্তব্য</h3>
          <p className="text-3xl font-bold mt-2 text-purple-600">৩২০</p>
        </div>
      </div>
      <SessionsOverviewChart/>
    </section>
  );
}





