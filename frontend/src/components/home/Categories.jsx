import { Link } from "react-router-dom";

import categories from "../../data/categories";
import SectionHeader from "../common/SectionHeader";

const Categories = () => {
  return (
    <section className="max-w-7xl mx-auto px-8 py-24">

      <SectionHeader
        title="Browse Categories"
        subtitle="Explore every artistic style available on Palette."
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

        {categories.map((category) => (

          <Link
            key={category.value}
            to={
              category.value === "All"
                ? "/marketplace"
                : `/marketplace?category=${category.value}`
            }
          >

            <div
              className="rounded-2xl border border-gray-200 p-8 hover:bg-cyan-400 hover:text-white cursor-pointer transition-all duration-300 text-center text-lg font-semibold h-full"
            >

              {category.label}

            </div>

          </Link>

        ))}

      </div>

    </section>
  );
};

export default Categories;