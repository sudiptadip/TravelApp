import { Header } from "components";

const Trips = () => {
  return (
    <main className="all-users wrapper">
      <Header
        title={`Trips`}
        description={"View and Edit AI generated travels plans"}
        ctaText="Create a Trip"
        ctaUrl="/trips/create"
      />
      Hello
    </main>
  );
};

export default Trips;
