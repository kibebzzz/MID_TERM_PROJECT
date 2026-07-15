import { Link } from "react-router-dom";
import PageWrapper from "../../components/common/PageWrapper";
import Button from "../../components/ui/Button";

const NotFound = () => {
  return (
    <PageWrapper>

      <section className="min-h-screen flex flex-col justify-center items-center text-center px-8">

        <h1 className="text-9xl font-black text-cyan-500">
          404
        </h1>

        <h2 className="text-4xl font-bold mt-6">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-4 max-w-lg">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Link to="/" className="mt-10">
          <Button>
            Return Home
          </Button>
        </Link>

      </section>

    </PageWrapper>
  );
};

export default NotFound;