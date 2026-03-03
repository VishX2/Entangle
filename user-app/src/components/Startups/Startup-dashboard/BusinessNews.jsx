export default function BusinessNews({ news }) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">
        Business & Market News
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl hover:-translate-y-1 transition duration-200 cursor-pointer"
          >
            {item.urlToImage && (
              <div className="overflow-hidden">
                <img
                  src={item.urlToImage}
                  className="h-48 w-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
            )}

            <div className="p-4">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-2">
                {item.source.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
