import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

const Register = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50">

      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-lg">

        <h1 className="text-4xl font-black text-center">
          Join Palette
        </h1>

        <p className="text-center text-gray-500 mt-3">
          Create your creator or collector account.
        </p>

        <div className="space-y-5 mt-10">

          <Input
            placeholder="Full Name"
          />

          <Input
            type="email"
            placeholder="Email"
          />

          <Input
            type="password"
            placeholder="Password"
          />

          <select className="w-full border rounded-xl px-5 py-3">

            <option>Collector</option>

            <option>Artist</option>

          </select>

          <Button className="w-full">
            Create Account
          </Button>

        </div>

      </div>

    </section>
  );
};

export default Register;