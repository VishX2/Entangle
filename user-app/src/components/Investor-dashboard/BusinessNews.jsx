export function BusinessNews({ news }) {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">
        Business & Market News
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {news.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl overflow-hidden shadow"
          >
            {item.urlToImage && (
              <img
                src={item.urlToImage}
                className="h-48 w-full object-cover"
              />
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
