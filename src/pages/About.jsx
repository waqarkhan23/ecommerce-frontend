import Layout from "../layout/Layout";

const About = () => {
  return (
    <Layout title="About - Wiki Store">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-indigo-600">
          About Wiki Store
        </h1>
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            src="/about-banner.jpg"
            alt="Wiki Store Team"
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <p className="text-lg mb-4 text-gray-700">
              Welcome to Wiki Store, your tech paradise since 2023. We're
              passionate about bringing the latest and greatest gadgets right to
              your doorstep.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-indigo-600">
              Our Mission
            </h2>
            <p className="text-lg mb-4 text-gray-700">
              To empower our customers with cutting-edge technology that
              enhances their daily lives. We believe in innovation, quality, and
              exceptional customer service.
            </p>
            <h2 className="text-2xl font-semibold mt-6 mb-4 text-indigo-600">
              Why Choose Us?
            </h2>
            <ul className="list-disc list-inside mb-4 text-gray-700">
              <li className="mb-2">
                Curated selection of top-tier tech products
              </li>
              <li className="mb-2">Expert advice from our tech-savvy team</li>
              <li className="mb-2">Competitive prices and exclusive deals</li>
              <li className="mb-2">Fast, secure shipping and easy returns</li>
            </ul>
            <p className="text-lg mt-6 text-gray-700 font-semibold">
              Join the Wiki Store community and stay ahead in the world of
              technology!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
