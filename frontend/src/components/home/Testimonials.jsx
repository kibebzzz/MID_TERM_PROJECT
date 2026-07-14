import testimonials from "../../data/testimonials";
import SectionHeader from "../common/SectionHeader";

const Testimonials = () => {
  return (
    <section className="bg-gray-50 py-24">

      <div className="max-w-7xl mx-auto px-8">

        <SectionHeader
  center
  title="What Our Community Says"
  subtitle="Hear directly from artists and collectors using Palette."
/>

        <div className="grid md:grid-cols-2 gap-10">

          {testimonials.map((testimonial) => (

            <div
              key={testimonial.id}
              className="bg-white rounded-2xl shadow-md p-8"
            >

              <p className="text-gray-600 italic">
                "{testimonial.message}"
              </p>

              <h3 className="font-semibold mt-6">
                {testimonial.name}
              </h3>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Testimonials;