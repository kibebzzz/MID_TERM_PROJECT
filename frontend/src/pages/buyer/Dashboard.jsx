import PageWrapper from "../../components/common/PageWrapper";

const Dashboard = () => {
  return (
    <PageWrapper>

      <section className="max-w-7xl mx-auto px-8 py-20">

        <h1 className="text-5xl font-black">
          Buyer Dashboard
        </h1>

        <p className="text-gray-500 mt-4">
          Welcome back! Here's an overview of your activity.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

          <div className="bg-white rounded-3xl shadow p-6">
            <h3 className="text-gray-500">
              Wishlist
            </h3>

            <p className="text-4xl font-black mt-3">
              0
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow p-6">
            <h3 className="text-gray-500">
              Cart Items
            </h3>

            <p className="text-4xl font-black mt-3">
              0
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow p-6">
            <h3 className="text-gray-500">
              Orders
            </h3>

            <p className="text-4xl font-black mt-3">
              0
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow p-6">
            <h3 className="text-gray-500">
              Favourite Artists
            </h3>

            <p className="text-4xl font-black mt-3">
              0
            </p>
          </div>

        </div>

      </section>

    </PageWrapper>
  );
};

export default Dashboard;