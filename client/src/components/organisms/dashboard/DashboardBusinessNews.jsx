const TITLES = {
  investor: 'Business & Market News',
  startup: 'Business & Market News',
  entrepreneur: 'News for Founders',
};

export default function DashboardBusinessNews({ news, type = 'investor' }) {
  const title = TITLES[type] || TITLES.investor;
  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
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
                  alt=""
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-2">{item.source?.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
