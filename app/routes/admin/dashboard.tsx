import { Header, StatsCard, TripCard } from "components";
import { allTrips, dashboardStats } from "~/constants";

const Dashboard = () => {
  const user = { name: "Sudipta" };
  console.log(allTrips);
  return (
    <div className="dashboard wrapper">
      <Header
        title={`Welicome ${user.name ?? "Guest"} 👋`}
        description={
          "Track activity, trends and popular destination in real time"
        }
      />

      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <StatsCard
            headerTitle="Total Users"
            total={dashboardStats.totalUsers}
            currentMonthCount={dashboardStats.userJoined.currentMonth}
            lastMonthCount={dashboardStats.userJoined.lastMonth}
          />

          <StatsCard
            headerTitle="Total Trips"
            total={dashboardStats.totalTrips}
            currentMonthCount={dashboardStats.tripsCreated.currentMonth}
            lastMonthCount={dashboardStats.tripsCreated.lastMonth}
          />

          <StatsCard
            headerTitle="Active Users"
            total={dashboardStats.userRole.total}
            currentMonthCount={dashboardStats.userRole.currentMonth}
            lastMonthCount={dashboardStats.userRole.lastMonth}
          />
        </div>
      </section>

      <section className="container">
        <h1 className="text-xl font-semibold text-dark-100">Created Trips</h1>
        <div className="trip-grid">
          {allTrips.map((trip) => (
            <TripCard
              key={trip.id}
              id={String(trip.id)}
              name={trip.name}
              tags={trip.tags}
              price={trip.estimatedPrice}
              imageUrls={trip.imageUrls[0]}
              location={trip.itinerary?.[0]?.location ?? ""}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
